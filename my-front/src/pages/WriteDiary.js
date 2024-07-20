import React, { useState } from 'react';
import styled from 'styled-components';

const DiaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  max-width: 600px;
  height: 300px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #e8491d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

function WriteDiary() {
  const [diaryEntry, setDiaryEntry] = useState('');

  const handleChange = (event) => {
    setDiaryEntry(event.target.value);
  };

  const handleSubmit = () => {
    // 일기 제출 로직 추가 (예: 서버에 저장)
    console.log('Diary Entry:', diaryEntry);
    alert('일기가 제출되었습니다!');
    setDiaryEntry(''); // 제출 후 입력 필드 초기화
  };

  return (
    <DiaryContainer>
      <Title>일기 작성</Title>
      <TextArea 
        value={diaryEntry} 
        onChange={handleChange} 
        placeholder="오늘의 일기를 작성하세요..." 
      />
      <Button onClick={handleSubmit}>제출</Button>
    </DiaryContainer>
  );
}

export default WriteDiary;
