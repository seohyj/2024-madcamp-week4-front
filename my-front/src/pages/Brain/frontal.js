import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import backgroundImage from '../../assets/UI_images/LoginPage.png'
import Header from '../../components/Header';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// 모든 단어와 색상 조합을 생성합니다.
const colors = ['green', 'red', 'brown', 'purple', 'orange', 'gray'];
const texts = ['녹색', '빨강', '갈색', '보라', '주황'];

const words = texts.flatMap(text =>
  colors.map(color => ({ text, color }))
).filter(word => word.text !== word.color);

// 16개의 기호 이미지 파일들을 가져옵니다.
const symbols = Array.from({ length: 16 }, (_, index) => require(`../../assets/symbols/symbol_${index + 1}.png`));

function Frontal() {
  const [currentWord, setCurrentWord] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [results, setResults] = useState([]);
  const [testStarted, setTestStarted] = useState(false);
  const [testComplete, setTestComplete] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [testType, setTestType] = useState(null); // "stroop" 또는 "visual"
  const [showInitialSymbols, setShowInitialSymbols] = useState(true);
  const [selectedSymbols, setSelectedSymbols] = useState([]);
  const [correctSymbols, setCorrectSymbols] = useState([]);

  useEffect(() => {
    if (testStarted && testType === 'stroop') {
      startStroopTest();
      const id = setInterval(() => {
        setTotalTime((prevTime) => prevTime + 1);
      }, 1000);
      setIntervalId(id);
    }
    return () => clearInterval(intervalId);
  }, [testStarted]);

  const startStroopTest = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setCurrentWord(words[randomIndex]);
    setStartTime(new Date().getTime());
  };

  const stopTest = () => {
    setTestStarted(false);
    setTestComplete(true);
    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  const checkAnswer = (answer) => {
    const endTime = new Date().getTime();
    const reactionTime = endTime - startTime;
    const isCorrect = currentWord.color === answer;
    setResults([...results, { isCorrect, reactionTime }]);
    if (results.length + 1 >= 15) {
      stopTest();
    } else {
      startStroopTest();
    }
  };

  const startVisualTest = () => {
    const selectedSymbols = [];
    while (selectedSymbols.length < 8) {
      const randomIndex = Math.floor(Math.random() * symbols.length);
      if (!selectedSymbols.includes(symbols[randomIndex])) {
        selectedSymbols.push(symbols[randomIndex]);
      }
    }
    setCorrectSymbols(selectedSymbols); // 초기 기호 배열을 설정
    setCurrentWord(selectedSymbols);
    setStartTime(new Date().getTime());
    setTestStarted(true);
    setShowInitialSymbols(true);

    // 8초 후에 초기 기호를 숨기고 전체 기호를 표시합니다.    
    setTimeout(() => {
      setShowInitialSymbols(false);
    }, 8000);
  };

  const handleSymbolClick = (symbol) => {
    if (!showInitialSymbols && selectedSymbols.length < 8) {
      setSelectedSymbols(prevSelected => [...prevSelected, symbol]);
    }
  };

  const stopVisualTest = () => {
    setTestStarted(false);
    setTestComplete(true);
    if (intervalId) {
      clearInterval(intervalId);
    }
    const endTime = new Date().getTime();
    const totalTimeTaken = (endTime - startTime) / 1000; // in seconds
    setTotalTime(totalTimeTaken);

    const correctAnswers = selectedSymbols.filter(symbol => correctSymbols.includes(symbol)).length;
    setResults([{ isCorrect: correctAnswers, totalTime: totalTimeTaken }]);
  };

  useEffect(() => {
    let timerId;
    if (!showInitialSymbols && testStarted && testType === 'visual') {
      timerId = setTimeout(stopVisualTest, 16000); // 16초 후 테스트 종료
      setIntervalId(timerId);
    }
    return () => clearTimeout(timerId);
  }, [showInitialSymbols, testStarted, testType]);

  const totalQuestions = results.length;
  const correctAnswers = testType === 'stroop'
  ? results.reduce((acc, result) => acc + (result.isCorrect ? 1 : 0), 0)
  : results[0]?.isCorrect || 0; // Visual Learning Test에서 정답 개수를 가져옴
const accuracy = totalQuestions > 0 ? (correctAnswers / (testType === 'stroop' ? totalQuestions : 8) * 100).toFixed(2) : 0;
  // const correctAnswers = results.reduce((acc, result) => acc + (result.isCorrect ? 1 : 0), 0);
  // const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions * 100).toFixed(2) : 0;

  const getDiagnosis = () => {
    if (testType === 'stroop') {
      if (totalTime <= 90 && accuracy >= 90) {
        return "정상 범위";
      } else if (totalTime <= 135 && accuracy >= 70) {
        return "주의력 결핍 및 과잉행동 장애 (ADHD)";
      } else if (totalTime <= 180 && accuracy >= 50) {
        return "전두엽 손상 (Frontal Lobe Damage)";
      } else {
        return "치매 (Dementia)";
      }
    } else if (testType === 'visual') {
      if (accuracy >= 80) {
        return "정상 범위";
      } else if (accuracy >= 60) {
        return "경도 인지 장애 (Mild Cognitive Impairment)";
      } else if (accuracy >= 40) {
        return "중등도 인지 장애 (Moderate Cognitive Impairment)";
      } else {
        return "심각한 인지 장애 (Severe Cognitive Impairment)";
      }
    }
  };

  const handleTestTypeSelection = (type) => {
    setTestType(type);
    setTestStarted(false);
    setTestComplete(false);
    setResults([]);
    setTotalTime(0);
    setSelectedSymbols([]);
    setCorrectSymbols([]);
  };

  return (
    <div>
      <Container>
        <Header />
              <TextContainer>Frontal Lobe Page</TextContainer>
              <TextContainer>전두엽</TextContainer>
              {!testStarted && !testComplete && (
                <>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                  <Button onClick={() => handleTestTypeSelection('stroop')}>집행기능 검사</Button>
                  <Button onClick={() => handleTestTypeSelection('visual')}>작업기억 검사</Button>
                  </div>
                </>
              )}
              {testType === 'stroop' && !testStarted && !testComplete && (
                <>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                  <Button onClick={() => setTestStarted(true)}>Start the Stroop-Test</Button>
                  </div>
                  <div className="example-Buttons">
                    <p>예시 정답 버튼:</p>
                    <Button className="Button" style={{ backgroundColor: 'green', color: 'white', fontWeight: 'bold' }}>녹색</Button>
                    <Button className="Button" style={{ backgroundColor: 'red', color: 'white', fontWeight: 'bold' }}>빨강</Button>
                    <Button className="Button" style={{ backgroundColor: 'brown', color: 'white', fontWeight: 'bold' }}>갈색</Button>
                    <Button className="Button" style={{ backgroundColor: 'purple', color: 'white', fontWeight: 'bold' }}>보라</Button>
                    <Button className="Button" style={{ backgroundColor: 'orange', color: 'white', fontWeight: 'bold' }}>주황</Button>
                    <Button className="Button" style={{ backgroundColor: 'gray', color: 'white', fontWeight: 'bold' }}>회색</Button>
                  </div>
                </>
              )}
              {testType === 'stroop' && testStarted && (
                <>
                  <div>
                    <p><strong>총 걸린 시간</strong>:  {Math.floor(totalTime / 60)}분 {totalTime % 60}초</p>
                    <p><strong>총 문제</strong>:   {totalQuestions}개</p>
                    <p><strong>정답률</strong>:    {accuracy}%</p>
                  </div>
                  <div className="word" style={{ color: currentWord.color, fontSize: '24px', margin: '20px', fontWeight: 'bold' }}>
                    {currentWord.text}
                  </div>
                  <div className="Buttons">
                    <Button className="Button" onClick={() => checkAnswer('green')} style={{ fontWeight: 'bold' }}>녹색</Button>
                    <Button className="Button" onClick={() => checkAnswer('red')} style={{ fontWeight: 'bold' }}>빨강</Button>
                    <Button className="Button" onClick={() => checkAnswer('brown')} style={{ fontWeight: 'bold' }}>갈색</Button>
                    <Button className="Button" onClick={() => checkAnswer('purple')} style={{ fontWeight: 'bold' }}>보라</Button>
                    <Button className="Button" onClick={() => checkAnswer('orange')} style={{ fontWeight: 'bold' }}>주황</Button>
                    <Button className="Button" onClick={() => checkAnswer('gray')} style={{ fontWeight: 'bold' }}>회색</Button>
                  </div>
                  <StopButton onClick={stopTest}>Stop the Stroop-Test</StopButton>
                </>
              )}
              {testType === 'visual' && !testStarted && !testComplete &&(
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <Button onClick={startVisualTest}>Start the Visual Learning Test</Button>
                </div>
              )}
              {testType === 'visual' && testStarted &&  (
                <div>
                  <h2>Visual Learning Test</h2>
                  {showInitialSymbols ? (
                    <div>
                      {currentWord.map((symbol, index) => (
                        <img key={index} src={symbol} alt={`symbol_${index + 1}`} style={{ width: '150px', height: '150px', margin: '5px' }} />
                      ))}
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginTop: '20px' }}>
                      {symbols.map((symbol, index) => (
                        <img
                          key={index}
                          src={symbol}
                          alt={`symbol_${index + 1}`}
                          style={{ width: '130px', height: '130px', margin: '5px', border: selectedSymbols.includes(symbol) ? '2px solid blue' : 'none' }}
                          onClick={() => handleSymbolClick(symbol)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
              {testComplete && (
          <div>
            <h2>Test Complete</h2>
            <p><strong>총 걸린 시간</strong>:      {Math.floor(totalTime / 60)}분 {totalTime % 60}초</p>
            <p><strong>정답률</strong>:       {accuracy}%</p>
            <p><strong>진단 결과</strong>:      {getDiagnosis()}</p>
            {testType === 'stroop' && (
              <div>
                <h3>Stroop Test</h3>
                <h3>평가 기준</h3>
                <ResultContainer>
                  <DescContainer>정상 범위: 총 걸린 시간 90초 이내, 정답률 90% 이상</DescContainer>
                  <DescContainer>주의력 결핍 및 과잉행동 장애 (ADHD): 총 걸린 시간 90초 ~ 135초, 정답률 70% ~ 89%</DescContainer>
                  <DescContainer>전두엽 손상 (Frontal Lobe Damage): 총 걸린 시간 135초 ~ 180초, 정답률 50% ~ 69%</DescContainer>
                  <DescContainer>치매 (Dementia): 총 걸린 시간 180초 이상, 정답률 50% 미만</DescContainer>
                </ResultContainer>
              </div>
            )}
            {testType === 'visual' && (
              <div>
                <h3>Visuo - Spatial Memory Test</h3>
                <h3>평가 기준</h3>
                <ResultContainer>
                  <DescContainer>정상 범위: 정답률 80% 이상</DescContainer>
                  <DescContainer>경도 인지 장애 (Mild Cognitive Impairment): 정답률 60% ~ 79%</DescContainer>
                  <DescContainer>중등도 인지 장애 (Moderate Cognitive Impairment): 정답률 40% ~ 59%</DescContainer>
                  <DescContainer>심각한 인지 장애 (Severe Cognitive Impairment): 정답률 40% 미만</DescContainer>
                </ResultContainer>
              </div>
            )}
            <Button onClick={() => { setTestComplete(false); setTotalTime(0); setResults([]); setSelectedSymbols([]); setCorrectSymbols([]); }}>Restart the Test</Button>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Frontal;

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

const TextContainer = styled.div`
  width: fit-content;
  height: 50px;
  padding: 20px;
  color: black;
  font-size: 30px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  position: relative;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  flex: 1;
  padding: 35px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 20px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  margin: 20px;

  &:hover {
    background-color: #333333;  // Hover 시 배경색
    color: white;  // Hover 시 글자색
  }
`;

const StopButton = styled.button`
  width: 850px;
  height: 80px;
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 20px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  margin: 20px;

  &:hover {
    background-color: #333333;  // Hover 시 배경색
    color: white;  // Hover 시 글자색
  }
`;

const ResultContainer = styled.div`
  width: 600px;
  height: fit-content;
  align-items: left;
  justify-content: center;
  display: flex;
  flex-direction: column;
  color: black;
  background-color: rgba(250, 250, 250, 0.5);
  border: none;
  border-radius: 10px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const DescContainer = styled.div`
  width: fit-content;
  text-align: left;
  justify-content: center;
  display: flex;
  flex-direction: column;
  color: black;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  margin: 5px;
  padding-left: 15px;
  padding-top: 8px;
  padding-bottom: 8px;
  gap: 5px;
`;