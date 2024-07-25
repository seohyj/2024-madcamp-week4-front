import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Hippo = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  //const kakaoId = '1001'; // 더미 데이터로 설정된 kakaoId
  const kakaoId = 'kakao_id';

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/user-mylog/${kakaoId}/quiz`);
        console.log('API Response:', response.data); // 응답 데이터 로깅
        setQuestions(response.data);
        setResults(new Array(response.data.length).fill(null)); // 정답을 저장하기 위한 배열 초기화
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
      }
    };

    fetchQuiz();
  }, [kakaoId]);

  const handleAnswer = (index, answer) => {
    const correct = answer === questions[index].correctAnswer;
    setResults(results.map((result, i) => (i === index ? correct : result)));
  };

  if (error) return <div>Error: {error}</div>;
  if (!questions.length) return <div>Loading...</div>;

  return (
    <QuizContainer>
      <QuizTitle>해마 기억 테스트</QuizTitle>
      {questions.map((questionObj, index) => (
        <QuizItem key={index}>
          <QuizQuestion>{questionObj.question}</QuizQuestion>
          <QuizOptions>
            <QuizButton onClick={() => handleAnswer(index, 1)}>True</QuizButton>
            <QuizButton onClick={() => handleAnswer(index, 0)}>False</QuizButton>
          </QuizOptions>
          {results[index] !== null && (
            <QuizResult correct={results[index]}>
              {results[index] ? '정답입니다!' : '틀렸습니다.'}
            </QuizResult>
          )}
        </QuizItem>
      ))}
    </QuizContainer>
  );
};

export default Hippo;

// Styled components
const QuizContainer = styled.div`
  width: 50%;
  margin: auto;
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const QuizTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const QuizItem = styled.div`
  margin-bottom: 20px;
`;

const QuizQuestion = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
`;

const QuizOptions = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
`;

const QuizButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
`;

const QuizResult = styled.p`
  font-size: 16px;
  color: ${props => (props.correct ? 'green' : 'red')};
`;
