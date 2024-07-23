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

import backgroundImage from '../assets/UI_images/MyLog.png';
import Header from '../components/Header';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

function MyLog() {
  const [kakaoId, setKakaoId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedKakaoId = localStorage.getItem('kakaoId');
    if (!storedKakaoId) {
      //navigate('/login'); // 로그인되지 않은 경우 로그인 페이지로 리디렉션
    } else {
      setKakaoId(storedKakaoId);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('kakaoId');
    setKakaoId(null);
    navigate('/login');
  };

  const userId = 1; // 실제 사용자 ID를 가져와야 합니다

  const [date, setDate] = useState(new Date());
  const [wakeTime, setWakeTime] = useState(new Date());
  const [bedTime, setBedTime] = useState(new Date());
  const [emotions, setEmotions] = useState({
    Joy: 0,
    Sadness: 0,
    Fear: 0,
    Disgust: 0,
    Anger: 0,
    Surprise: 0
  });

  const onChange = date => {
    setDate(date);
  };

  const formatDate = (date) => {
    const options = { month: 'numeric', day: 'numeric', weekday: 'short' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const radarData = {
    labels: ['Joy', 'Sadness', 'Fear', 'Disgust', 'Anger', 'Surprise'],
    datasets: [
      {
        label: 'Emotions',
        data: Object.values(emotions),
        backgroundColor: 'rgba(34, 202, 236, 0.2)',
        borderColor: 'rgba(34, 202, 236, 1)',
        borderWidth: 1
      }
    ]
  };

  const handleClick = (event, elements) => {
    if (elements.length > 0) {
      const { index, datasetIndex } = elements[0];
      const value = radarData.datasets[datasetIndex].data[index];
      const label = radarData.labels[index];
      const newValue = value + 0.2 > 1 ? 0 : value + 0.2;

      setEmotions(prevState => ({
        ...prevState,
        [label]: newValue
      }));
    }
  };

  const radarOptions = {
    scale: {
      ticks: {
        beginAtZero: true,
        min: 0,
        max: 1,
        stepSize: 0.2
      }
    },
    onClick: (event, elements) => handleClick(event, elements)
  };

  // wake-time 기록
  const handleRecordWakeTime = async() => {
    const currentTume = new Date().toISOString();
    const today = new Date().toISOString().split('T')[0]; //YYYY-MM-DD 형식으로 오늘 날짜 구하기

    try {
      const response = await axios.put(`http://localhost:3001/user-mylog/${userId}/${today}/wake-time`, {
        wake_time: currentTume,
      });
      console.log('기상 시각 기록 성공:', response.data);
    } catch (error) {
      console.error('기상 시각 기록 실패:', error);
    }
  };

  // sleep-time 기록
  const handleRecordSleepTime = async() => {
    const currentTume = new Date().toISOString();
    const today = new Date().toISOString().split('T')[0]; //YYYY-MM-DD 형식으로 오늘 날짜 구하기

    try {
      const response = await axios.put(`http://localhost:3001/user-mylog/${userId}/${today}/sleep-time`, {
        sleep_time: currentTume,
      });
      console.log('수면 시각 기록 성공:', response.data);
    } catch (error) {
      console.error('수면 시각 기록 실패:', error);
    }
  };

  return (
    <Container>
      <Header handleLogout={handleLogout} />
      
      <LogContainer>
        <DateText>{formatDate(date)}</DateText>
        <ContentWrapper>
          <CalendarContainer>
            <StyledCalendar
              onChange={onChange}
              value={date}
            />
          </CalendarContainer>
          <InputContainer>
            <InputBox>
              <InputTitle>오늘의 기상 시각</InputTitle>
              <DatePicker
                selected={wakeTime}
                onChange={(date) => setWakeTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                customInput={<InputField />}
              />
            </InputBox>
            <InputBox>
              <InputTitle>오늘의 취침 시각</InputTitle>
              <DatePicker
                selected={bedTime}
                onChange={(date) => setBedTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                customInput={<InputField />}
              />
            </InputBox>
            <Button onClick={handleRecordWakeTime}>기상시각 기록</Button>
            <Button onClick={handleRecordSleepTime}>취침시각 기록</Button>
            <Button onClick={() => navigate('/writediary')}>일기 쓰기</Button>
            <RadarWrapper>
              <Radar data={radarData} options={radarOptions} />
            </RadarWrapper>
          </InputContainer>
        </ContentWrapper>
      </LogContainer>
    </Container>
  );
}

export default MyLog;

// Styled components

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background: 
    linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1)), 
    url(${backgroundImage}) no-repeat center center; // 배경 이미지 설정
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LogContainer = styled.div`
  width: 88.54%;  // 1700px 기준의 88.54% (1920 * 0.8854 = 1700)
  height: 75vh;
  padding: 2.08%;  // 40px 기준의 2.08% (1920 * 0.0208 = 40)
  background: rgba(255, 251, 233, 0.80);
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const CalendarContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 0.83vw;  // 16px 기준의 0.83vw (1920 * 0.0083 = 16)
`;

const StyledCalendar = styled(Calendar)`
  .react-calendar__navigation button {
    color: #000000 !important;
  }
  
  .react-calendar__month-view__weekdays__weekday {
    color: #000000 !important;
  }

  .react-calendar__month-view__days__day {
    color: #000000 !important;
  }

  .react-calendar__tile--active {
    background: #e8491d !important;
    color: white !important;
  }

  .react-calendar__month-view__days__day--weekend {
    color: #ff0000 !important;
  }

  .react-calendar__tile--now {
    background: #ccffcc !important;
  }

  .react-calendar__tile--neighboringMonth {
    visibility: hidden !important;
  }
`;

const Button = styled.button`
  padding: 0.73%;  // 14px 기준의 0.73% (1920 * 0.0073 = 14)
  background: black;
  color: white;
  border: none;
  border-radius: 0.52%;  // 10px 기준의 0.52% (1920 * 0.0052 = 10)
  font-size: 1.20vw;  // 23px 기준의 1.20vw (1920 * 0.012 = 23)
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const DateText = styled.div`
  width: 37.60%;  // 722px 기준의 37.60% (1920 * 0.376 = 722)
  text-align: center;
  color: #3D3D3D;
  font-size: 1.56vw;  // 30px 기준의 1.56vw (1920 * 0.0156 = 30)
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.68%;  // 13px 기준의 0.68% (1920 * 0.0068 = 13)
  width: 100%;
`;

const InputTitle = styled.div`
  color: #3D3D3D;
  font-size: 1.25vw;  // 24px 기준의 1.25vw (1920 * 0.0125 = 24)
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
`;

const InputField = styled.input`
  width: 100%;
  height: 2.34%;  // 45px 기준의 2.34% (1920 * 0.0234 = 45)
  background: white;
  border: 1px #CCCCCC solid;
  border-radius: 0.52%;  // 10px 기준의 0.52% (1920 * 0.0052 = 10)
`;

const RadarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;