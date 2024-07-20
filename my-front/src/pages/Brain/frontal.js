import React, { useState, useEffect } from 'react';

// 모든 단어와 색상 조합을 생성합니다.
const colors = ['green', 'red', 'brown', 'purple', 'orange', 'gray'];
const texts = ['녹색', '빨강', '갈색', '보라', '주황'];

const words = texts.flatMap(text =>
  colors.map(color => ({ text, color }))
).filter(word => word.text !== word.color);

// 16개의 기호 이미지 파일들을 가져옵니다.
const symbols = Array.from({ length: 16 }, (_, index) => require(`../../assets/symbol_${index + 1}.png`));

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
  const correctAnswers = results.reduce((acc, result) => acc + (result.isCorrect ? 1 : 0), 0);
  const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions * 100).toFixed(2) : 0;

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
      if (totalTime <= 16 && accuracy >= 80) {
        return "정상 범위";
      } else if (totalTime <= 24 && accuracy >= 60) {
        return "경도 인지 장애 (Mild Cognitive Impairment)";
      } else if (totalTime <= 32 && accuracy >= 40) {
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
      <h1>Frontal Lobe Page</h1>
      <p>전두엽</p>
      {!testStarted && !testComplete && (
        <>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <button onClick={() => handleTestTypeSelection('stroop')}>집행기능 검사</button>
          <button onClick={() => handleTestTypeSelection('visual')}>작업기억 검사</button>
          </div>
        </>
      )}
      {testType === 'stroop' && !testStarted && !testComplete && (
        <>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <button onClick={() => setTestStarted(true)}>Start the Stroop-Test</button>
          </div>
          <div className="example-buttons">
            <p>예시 정답 버튼:</p>
            <button className="button" style={{ backgroundColor: 'green', color: 'white', fontWeight: 'bold' }}>녹색</button>
            <button className="button" style={{ backgroundColor: 'red', color: 'white', fontWeight: 'bold' }}>빨강</button>
            <button className="button" style={{ backgroundColor: 'brown', color: 'white', fontWeight: 'bold' }}>갈색</button>
            <button className="button" style={{ backgroundColor: 'purple', color: 'white', fontWeight: 'bold' }}>보라</button>
            <button className="button" style={{ backgroundColor: 'orange', color: 'white', fontWeight: 'bold' }}>주황</button>
            <button className="button" style={{ backgroundColor: 'gray', color: 'white', fontWeight: 'bold' }}>회색</button>
          </div>
        </>
      )}
      {testType === 'stroop' && testStarted && (
        <>
          <div>
            <p>총 시간: {Math.floor(totalTime / 60)}분 {totalTime % 60}초</p>
            <p>총 문제: {totalQuestions}개</p>
            <p>정답률: {accuracy}%</p>
          </div>
          <div className="word" style={{ color: currentWord.color, fontSize: '24px', margin: '20px', fontWeight: 'bold' }}>
            {currentWord.text}
          </div>
          <div className="buttons">
            <button className="button" onClick={() => checkAnswer('green')} style={{ fontWeight: 'bold' }}>녹색</button>
            <button className="button" onClick={() => checkAnswer('red')} style={{ fontWeight: 'bold' }}>빨강</button>
            <button className="button" onClick={() => checkAnswer('brown')} style={{ fontWeight: 'bold' }}>갈색</button>
            <button className="button" onClick={() => checkAnswer('purple')} style={{ fontWeight: 'bold' }}>보라</button>
            <button className="button" onClick={() => checkAnswer('orange')} style={{ fontWeight: 'bold' }}>주황</button>
            <button className="button" onClick={() => checkAnswer('gray')} style={{ fontWeight: 'bold' }}>회색</button>
          </div>
          <button onClick={stopTest}>Stop the Stroop-Test</button>
        </>
      )}
      {testType === 'visual' && !testStarted && !testComplete &&(
         <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <button onClick={startVisualTest}>Start the Visual Learning Test</button>
        </div>
      )}
      {testType === 'visual' && testStarted &&  (
        <div>
          <h2>Visual Learning Test</h2>
          {showInitialSymbols ? (
            <div>
              {currentWord.map((symbol, index) => (
                <img key={index} src={symbol} alt={`symbol_${index + 1}`} style={{ width: '50px', height: '50px', margin: '5px' }} />
              ))}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginTop: '20px' }}>
              {symbols.map((symbol, index) => (
                <img
                  key={index}
                  src={symbol}
                  alt={`symbol_${index + 1}`}
                  style={{ width: '50px', height: '50px', margin: '5px', border: selectedSymbols.includes(symbol) ? '2px solid blue' : 'none' }}
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
    <p>총 걸린 시간: {Math.floor(totalTime / 60)}분 {totalTime % 60}초</p>
    <p>정답률: {accuracy}%</p>
    <p>진단 결과: {getDiagnosis()}</p>
    {testType === 'stroop' && (
      <div>
        <h3>스트룹 테스트 평가 기준</h3>
        <ul>
          <li><strong>정상 범위:</strong> 총 걸린 시간 90초 이내, 정답률 90% 이상</li>
          <li><strong>주의력 결핍 및 과잉행동 장애 (ADHD):</strong> 총 걸린 시간 90초 ~ 135초, 정답률 70% ~ 89%</li>
          <li><strong>전두엽 손상 (Frontal Lobe Damage):</strong> 총 걸린 시간 135초 ~ 180초, 정답률 50% ~ 69%</li>
          <li><strong>치매 (Dementia):</strong> 총 걸린 시간 180초 이상, 정답률 50% 미만</li>
        </ul>
      </div>
    )}
    {testType === 'visual' && (
      <div>
        <h3>시각 학습 테스트 평가 기준</h3>
        <ul>
          <li><strong>정상 범위:</strong> 총 걸린 시간 16초 이내, 정답률 80% 이상</li>
          <li><strong>경도 인지 장애 (Mild Cognitive Impairment):</strong> 총 걸린 시간 16초 ~ 24초, 정답률 60% ~ 79%</li>
          <li><strong>중등도 인지 장애 (Moderate Cognitive Impairment):</strong> 총 걸린 시간 24초 ~ 32초, 정답률 40% ~ 59%</li>
          <li><strong>심각한 인지 장애 (Severe Cognitive Impairment):</strong> 총 걸린 시간 32초 이상, 정답률 40% 미만</li>
        </ul>
      </div>
    )}
    <button onClick={() => { setTestComplete(false); setTotalTime(0); setResults([]); setSelectedSymbols([]); setCorrectSymbols([]); }}>Restart the Test</button>
  </div>
)}
    </div>
  );
}

export default Frontal;
