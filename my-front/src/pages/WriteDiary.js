import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment';

import { Link, useNavigate } from 'react-router-dom';
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
  const [isExisting, setIsExisting] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // 새로 추가된 상태: 수정 모드인지 여부
  const [userId, setUserId] = useState(null); // 실제 사용자 ID를 가져오기
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('kakaoId');// 수정된 부분: localStorage에서 'kakaoId'를 가져옴
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      navigate('/login'); // 사용자 ID가 없는 경우 로그인 페이지로 리디렉션
    }
  }, [navigate]);

  useEffect(() => {
    if (userId && date) {
      fetchDiary();
    }
  }, [userId, date]);

  const fetchDiary = async () => {
    try {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      const response = await axios.get(`http://localhost:3001/user-mylog/${userId}/${formattedDate}`);
      console.log('Fetching diary with URL:', `http://localhost:3001/user-mylog/${userId}/${formattedDate}`);
      console.log('Fetched diary data:', response.data); // 디버깅을 위한 콘솔 출력
      if (response.data) {
        setTitle(response.data.title);
        setContext(response.data.context);
        setIsExisting(true);
        console.log('Setting title:', response.data.title); // 추가 로그
        console.log('Setting context:', response.data.context); // 추가 로그
      } else {
        setTitle('');
        setContext('');
        setIsExisting(false);
      }
    } catch (error) {
      console.error('일기 불러오기 실패:', error.response ? error.response.data : error.message);
      setTitle('');
      setContext('');
      setIsExisting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedDate = moment(date).format('YYYY-MM-DD');
      const url = isExisting 
        ? `http://localhost:3001/user-mylog/${userId}/${formattedDate}`
        : `http://localhost:3001/user-mylog`;
      const method = isExisting ? 'put' : 'post';

      console.log('Sending request:', { method, url, data: {
        kakao_id: userId,
        date: formattedDate,
        title: title,
        context: context,
      }});

      const response = await axios({
        method: method,
        url: url,
        data: {
          kakao_id: userId,
          date: formattedDate, // 날짜 형식을 맞추기 위해 moment 라이브러리 사용
          title: title,
          context: context,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('일기 저장 성공:', response.data);
      alert('일기가 저장되었습니다!');
      if (!isExisting) setIsExisting(true);
      setIsEditing(false); // 수정 모드 종료
    } catch (error) {
      console.error('일기 저장 실패:', error.response ? error.response.data : error.message);
    }
  };

  // 수정된 함수: 폼 제출을 방지
  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditing(true);
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
          <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required disabled={!isEditing && isExisting} />
        </div>
        <div>
          <TextArea 
            value={context} 
            onChange={(e) => setContext(e.target.value)} 
            placeholder="오늘의 일기를 작성하세요..." 
            required
            disabled={!isEditing && isExisting}
          />
        </div>
        {isExisting && !isEditing ? (
          // 수정된 부분: 버튼 타입을 "button"으로 변경하여 폼 제출을 방지
          <Button type="button" onClick={handleEdit}>수정</Button>
        ) : (
          <Button type="submit">{isExisting ? '저장' : '제출'}</Button>
        )}
      </form>
    </DiaryContainer>
  );
}

export default WriteDiary;
