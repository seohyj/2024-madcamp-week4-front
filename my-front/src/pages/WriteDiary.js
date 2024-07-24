import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import backgroundImage from '../assets/UI_images/MyLog.png';
import backgroundbuttonImage from '../assets/UI_images/Gradient.png';
import Header from '../components/Header';

function WriteDiary() {
  const [title, setTitle] = useState('');
  const [context, setContext] = useState('');
  const [date, setDate] = useState(new Date());
  const [isExisting, setIsExisting] = useState(false);
  const [kakaoId, setKakaoId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedKakaoId = localStorage.getItem('kakaoId');
    if (!storedKakaoId) {
      //navigate('/login');
    } else {
      setKakaoId(storedKakaoId);
    }
  }, [navigate]);

  useEffect(() => {
    if (date) {
      fetchDiary();
    }
  }, [date]);

  const fetchDiary = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/user-mylog/${kakaoId}/${date.toISOString().split('T')[0]}`);
      if (response.data) {
        setTitle(response.data.title);
        setContext(response.data.context);
        setIsExisting(true);
      } else {
        setTitle('');
        setContext('');
        setIsExisting(false);
      }
    } catch (error) {
      console.error('일기 불러오기 실패:', error);
      setTitle('');
      setContext('');
      setIsExisting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isExisting
        ? `http://localhost:3001/user-mylog/${kakaoId}/${date.toISOString().split('T')[0]}`
        : `http://localhost:3001/user-mylog`;
      const method = isExisting ? 'put' : 'post';

      const response = await axios({
        method,
        url,
        data: {
          kakao_id: kakaoId,
          date: date.toISOString().split('T')[0],
          title,
          context,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('일기 저장 성공:', response.data);
      alert('일기가 저장되었습니다!');
      if (!isExisting) setIsExisting(true);
    } catch (error) {
      console.error('일기 저장 실패:', error);
    }
  };

  return (
    <Container>
      <Header handleLogout={() => { localStorage.removeItem('kakaoId'); navigate('/login'); }} />
      <DiaryContainer>
        <DateText>{date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}</DateText>
        <ContentWrapper>
          <CalendarWrapper>
            <StyledCalendar onChange={setDate} value={date} />
          </CalendarWrapper>
          <Form onSubmit={handleSubmit}>
            <Label>제목</Label>
            <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <Label>내용</Label>
            <TextArea value={context} onChange={(e) => setContext(e.target.value)} required placeholder="오늘의 일기를 작성하세요..." />
            <Button type="submit">{isExisting ? '수정' : '저장'}</Button>
          </Form>
        </ContentWrapper>
      </DiaryContainer>
    </Container>
  );
}

export default WriteDiary;

// Styled Components
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

const DiaryContainer = styled.div`
  width: 90vw;
  height: 75vh;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 30px;
  padding-bottom: 30px;
  background: rgba(250, 250, 240, 0.3);
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const DateText = styled.div`
  color: black;
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const ContentWrapper = styled.div`
  width: 87vw;
  height: 65vh;
  display: flex;
  justify-content: space-between;
  gap: 40px;
  align-items: center;
`;

const CalendarWrapper = styled.div`
  display: flex;
  margin: 0px;
  padding-left: 50px;
  padding-right: 50px;
`;

const StyledCalendar = styled(Calendar)`
  .react-calendar__navigation button {
    color: #000000 !important;
    border-radius: 15px;
  }
  
  .react-calendar__month-view__weekdays__weekday {
    color: #000000 !important;
    border-radius: 15px;
  }

  .react-calendar__month-view__days__day {
    color: #000000 !important;
    border-radius: 15px;
  }

  .react-calendar__tile--active {
    background: rgba(7, 230, 8, 0.3) !important;
    color: white !important;
    border-radius: 15px;
  }

  .react-calendar__month-view__days__day--weekend {
    color: #ff0000 !important;
    border-radius: 15px;
  }

  .react-calendar__tile--now {
    background: rgba(255, 168, 182, 0.5) !important;
    border-radius: 15px;
  }

  .react-calendar__tile--neighboringMonth {
    visibility: hidden !important;
  }
  font-family: Roboto, sans-serif;
  font-size: 23px;
  font-weight: 600;
  width: 30vw;
  height: 50vh;
  border-radius: 12px;
  position: center;
  justify-self: center;
  border-color: transparent;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  //background: rgba(255, 255, 255, 0.7);
  background: linear-gradient(rgba(230, 230, 230, 0.5), rgba(230, 230, 230, 0.5)), url(${backgroundbuttonImage}) no-repeat center center;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const Form = styled.form`
  flex: 1;
  margin: 0px;
  margin-top: 20px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: fit-content;
  height: fit-content;
  align-items: center;
  justify-content: flex-start;
`;

const Label = styled.label`
  width: 90%;
  flex-direction: row;
  justify-content: flex-start;
  font-size: 19px;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif;
  color: black;
  font-weight: 700;
  text-align: left;
  padding-left: 20px;
  padding-right: 0px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const Input = styled.input`
  width: 89%;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  margin: 0px;
  font-family: 'Montserrat', sans-serif;
  color: black;
  font-size: 17px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 89%;
  height: 350px;
  padding: 10px;
  text-indent: 8px;
  font-family: 'Montserrat', sans-serif;
  font-size: 17px;
  font-weight: 700;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  margin-top: 15px;
  padding: 10px 30px;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  background-color: #333333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #d63c1a;
  }
`;