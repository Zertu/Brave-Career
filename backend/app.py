from flask import Flask, request, jsonify
import requests
import re
import os
import google.generativeai as genai
app = Flask(__name__)

# Create a model and generate content
with open("./apikey.txt", 'r') as file:
    os.environ["GEMINI_API_KEY"]=file.read().strip()

# Endpoint to receive URL, scrape content, and return question with options
@app.route('/api/generate-question', methods=['POST'])
def generate_question():
    data = request.get_json()
    url = data.get('url', '')
    print (url)
    # Validate URL format
    if not re.match(r'^https?://.+\..+', url):
        return jsonify({"message": "Invalid URL format."}), 400

    try:
        
        genai.configure(api_key=os.environ["GEMINI_API_KEY"])
        model = genai.GenerativeModel(model_name="gemini-1.5-flash")
        prompt_template = """
        Given the URL {url}, Generate a question based on the URL provided with content based on the main content or topic of the site to help categorize the visitor's intent. The question should be concise and reflect the visitor's likely areas of interest on that site. Example: if apple.com is entered, the question should be generated similar to 'What product category are you interested in?' and provide multiple options such as 'A. Mac, B. iPad, C. iPhone, D. Watch'. The options should be customized to the main products or topics of the target site, allowing the question to accurately reflect the visitor's main interests on the site.
        Output should be a Ob like:
            question: 'What is the price range for product Y?', options: ['A', 'B', 'C']
        **Additional requirements:**
        * Keep the questions concise and easy to understand.
        * The options should be mutually exclusive and collectively exhaustive.
        * Use a maximum of 50 tokens for each question.
        """
        prompt = prompt_template.format(url=url)
        response = model.generate_content(prompt)
        res = response.text.replace("```json",'')
        
        res = res.replace("```",'')
        return jsonify(res)
    except requests.exceptions.RequestException as e:
        return jsonify({"message": "Error fetching the URL content."}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
