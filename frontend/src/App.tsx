import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestion } from './actions/questionActions';

const App = () => {
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();
  
  // 从 Redux Store 中获取生成的问题和选项
  const questionData = useSelector((state) => state.questionData);
  const { question, options, loading, error } = questionData;

  // 提交 URL 时触发的函数
  const handleSubmit = (e) => {
    e.preventDefault();
    if (url) {
      dispatch(fetchQuestion(url));
    }
  };

  return (
    <div className="app-container">
      <h1>内容分类器</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="输入网址 (e.g., https://apple.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit">生成问题</button>
      </form>

      {loading && <p>加载中...</p>}
      {error && <p>发生错误: {error}</p>}
      
      {question && (
        <div className="question-container">
          <h2>问题: {question}</h2>
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
