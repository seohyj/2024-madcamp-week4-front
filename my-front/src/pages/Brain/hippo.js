// 해마
import React, { useEffect, useState } from 'react';
import axios from 'axios'

const Quiz = ( { kakaoId }) => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`/diary/quiz?kakaoId=${kakaoId}`)
    .then(response => {
      setQuestions(response.data);
    })
    .catch(error => {
      if (error.response.status === 400) {
        setError('퀴즈를 생성할 충분한 일기 항목이 없습니다.');
      }
    });
  }, [kakaoId]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {questions.map((question, index) => (
        <div key={index}>
          <p>{question}</p>
          <button>참</button>
          <button>거짓</button>
        </div>
      ))}
    </div>
  );
};

export default Quiz;