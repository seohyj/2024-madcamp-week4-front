import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

const Input = styled.input`
  width: 100%;
  max-width: 600px;
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
    const [title, setTitle] = useState('');
    const [context, setContext] = useState('');
    const [date, setDate] = useState('');
    const userId = 1; // 실제 사용자 ID를 가져와야 합니다
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3001/user-mylog', {
            kakao_id: userId,
            date: date,
            title: title,
            context: context,
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log('일기 작성 성공:', response.data);
          alert('일기가 제출되었습니다!');
          setTitle('');
          setContext('');
          setDate('');
        } catch (error) {
          console.error('일기 작성 실패:', error.response ? error.response.data : error.message);
        }
      };
  
    return (
        <DiaryContainer>
          <Title>일기 작성</Title>
          <form onSubmit={handleSubmit}>
            <div>
              <label>날짜:</label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div>
              <label>제목:</label>
              <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
              <TextArea 
                value={context} 
                onChange={(e) => setContext(e.target.value)} 
                placeholder="오늘의 일기를 작성하세요..." 
                required
              />
            </div>
            <Button type="submit">제출</Button>
          </form>
        </DiaryContainer>
      );
    }
    
    export default WriteDiary;