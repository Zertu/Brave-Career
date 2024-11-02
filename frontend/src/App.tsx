import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestion } from './actions/questionActions';

const App = () => {
  const [url, setUrl] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(true);
  const dispatch = useDispatch();
  
  const questionData = useSelector((state) => state.questionData);
  const { question, options, loading, error } = questionData;

  // URL validation function
  const validateUrl = (inputUrl) => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-zA-Z\\d_]*)?$', // fragment locator
      'i'
    );
    return urlPattern.test(inputUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateUrl(url)) {
      setIsValidUrl(true);
      dispatch(fetchQuestion(url));
    } else {
      setIsValidUrl(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Content Classifier</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a URL (e.g., https://apple.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit">Generate Question</button>
      </form>

      {!isValidUrl && <p style={{ color: 'red' }}>Please enter a valid URL</p>}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      
      {question && (
        <div className="question-container">
          <h2>Question: {question}</h2>
          <ul>
            {options.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
