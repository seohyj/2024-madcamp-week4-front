// 해마
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import backgroundImage from '../../assets/UI_images/LoginPage.png'
import Header from '../../components/Header';
import styled from 'styled-components';

const Hippo = () => {
  /*
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const kakaoId = 'kakao_id'; // 실제 데이터로 변경 필요

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/user-mylog/${kakaoId}/quiz`);
        console.log('API Response:', response.data); // 응답 데이터 로깅
        setQuestions(response.data.data); // 응답 데이터 구조에 맞게 수정
        setResults(new Array(response.data.data.length).fill(null)); // 정답을 저장하기 위한 배열 초기화
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
  */

  return (
    <Container>
      <Header/>
      <QuizContainer>
        <QuizTitle>해마 기억 테스트</QuizTitle>
        
      </QuizContainer>
    </Container>
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
/*
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
*/
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background: linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1)), url(${backgroundImage}) no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;