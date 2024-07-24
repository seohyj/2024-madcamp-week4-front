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
import moment from 'moment-timezone';

import backgroundImage from '../assets/UI_images/MyLog.png';
import Header from '../components/Header';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

function MyLog() {
  // kakaoId 상태로 관리
  const [kakaoId, setKakaoId] = useState(null);
  const [nickname, setNickname] = useState('');
  // date, waketime, sleeptime 상태로 관리
  const [date, setDate] = useState(new Date());
  const [wakeTime, setWakeTime] = useState(new Date());
  const [sleepTime, setSleepTime] = useState(new Date());
  // 감정 데이터를 상태로 분리
  const [emotions, setEmotions] = useState({
    Joy: 0,
    Sadness: 0,
    Fear: 0,
    Disgust: 0,
    Anger: 0,
    Surprise: 0
  });

  // 감정 데이터 존재 여부 상태 관리
  const [isExisting, setIsExisting] = useState(false);
  // 수정 모드 상태 관리
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedKakaoId = localStorage.getItem('kakaoId');
    if (storedKakaoId) {
      setKakaoId(storedKakaoId);
      axios.get(`http://localhost:3001/user/kakao/nickname?kakao_id=${storedKakaoId}`)
        .then(response => {
          setNickname(response.data.nickname);
        })
        .catch(error => {
          console.error('There was an error fetching the nickname!', error);
        });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const onChange = date => {
    setDate(date);
  };

  const formatDate = (date) => {
    const options = { month: 'numeric', day: 'numeric', weekday: 'short' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  // wake-time 기록
  const handleRecordWakeTime = async () => {
    const selectedTime = wakeTime;
    const kstTime = moment(selectedTime).tz('Asia/Seoul').toISOString();
    const selectedDate = moment(date).tz('Asia/Seoul').format('YYYY-MM-DD');
    try {
      const response = await axios.put(`http://localhost:3001/user-mylog/${kakaoId}/${selectedDate}/wake-time`, {
        wake_time: kstTime,
      });
      console.log('기상 시각 기록 성공:', response.data);
    } catch (error) {
      console.error('기상 시각 기록 실패:', error);
    }
  };


  // sleep-time 기록
  const handleRecordSleepTime = async () => {
    const selectedTime = sleepTime;
    const kstTime = moment(selectedTime).tz('Asia/Seoul').toISOString();
    const selectedDate = moment(date).tz('Asia/Seoul').format('YYYY-MM-DD');
    try {
      const response = await axios.put(`http://localhost:3001/user-mylog/${kakaoId}/${selectedDate}/sleep-time`, {
        sleep_time: kstTime,
      });
      console.log('수면 시각 기록 성공:', response.data);
    } catch (error) {
      console.error('수면 시각 기록 실패:', error);
    }
  };


  const fetchEmotionsData = async (kakaoId, selectedDate) => {
    try {
      // 서버에서 감정 데이터를 가져옵니다.
      const emotionsResponse = await axios.get(`http://localhost:3001/user-mylog/${kakaoId}/${selectedDate}/emotion`);
      if (emotionsResponse.data) {
        // 감정 데이터가 있으면 상태를 업데이트합니다.
        setEmotions(emotionsResponse.data);
        setIsExisting(true);
      } else {
        // 감정 데이터가 없으면 기본값으로 설정합니다.
        setEmotions({
          Joy: 0.2,
          Sadness: 0.4,
          Fear: 0.6,
          Disgust: 0.8,
          Anger: 1.0,
          Surprise: 1.0
        });
        setIsExisting(false);
      }
    } catch (error) {
      // 에러가 발생하면 기본값으로 설정합니다.
      console.error('Failed to fetch emotions data:', error);
      setEmotions({
        Joy: 0.5,
        Sadness: 0.5,
        Fear: 0.5,
        Disgust: 0.5,
        Anger: 0.5,
        Surprise: 0.5
      });
      setIsExisting(false);
    }
  };

  // 슬라이더 값 변경 시 호출되는 함수입니다.
const handleSliderChange = (emotion, value) => {
  console.log(`Changing ${emotion} to ${value}`);
  setEmotions((prevEmotions) => ({
    ...prevEmotions,
    [emotion]: value
  }));
  console.log('Updated emotions:', { ...emotions, [emotion]: value });
};

  // 감정을 서버에 저장하는 함수입니다.
  const handleSaveEmotions = async () => {
    const requestData = {
      hex_happy: emotions.Joy,
      hex_sad: emotions.Sadness,
      hex_anger: emotions.Anger,
      hex_fear: emotions.Fear,
      hex_surprise: emotions.Surprise,
      hex_disgust: emotions.Disgust
    };
    // 선택된 날짜를 Asia/Seoul 시간대로 포맷합니다.
    const selectedDate = moment(date).tz('Asia/Seoul').format('YYYY-MM-DD');

    try {
      // 감정 데이터가 이미 존재하면 PUT 요청, 그렇지 않으면 POST 요청을 보냅니다.
      const url = isExisting 
        ? `http://localhost:3001/user-mylog/${kakaoId}/${selectedDate}/emotion`
        : `http://localhost:3001/user-mylog/emotion`;
      const method = isExisting ? 'put' : 'post';

      // URL과 요청 데이터를 콘솔에 출력
    console.log('Request URL:', url);
    console.log('Request Data:', {
      kakao_id: kakaoId,
      date: selectedDate,
      ...requestData
    });

      const response = await axios({
        method: method,
        url: url,
        data: {
          kakao_id: kakaoId,
          date: selectedDate,
          ...requestData
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Emotions saved successfully:', response.data);
      alert('감정이 저장되었습니다!');
      setIsEditing(false); // 수정 모드 종료
      if (!isExisting) setIsExisting(true);
    } catch (error) {
      console.error('Failed to save emotions:', error);
    }
  };

  // 레이더 차트 데이터입니다.
  const radarData = {
    labels: ['Joy', 'Sadness', 'Fear', 'Disgust', 'Anger', 'Surprise'],
    datasets: [
      {
        label: 'Emotions',
        data: Object.values(emotions),
        backgroundColor: 'rgba(181, 255, 117, 0.2)',
        borderColor: 'rgba(151, 206, 104, 1.0)',
        borderWidth: 1
      }
    ]
  };
  // 레이더 차트 옵션입니다.
  const radarOptions = {
    scale: {
      ticks: {
        beginAtZero: true,
        min: 0,
        max: 1,
        stepSize: 0.2
      }
    },
  };

  return (
    <Container>
      <Header />
      
      <LogContainer>
        {/* 날짜를 포맷하여 표시합니다. */}
        <DateText>{formatDate(date)}</DateText>
        <ContentWrapper>
          <CalendarContainer>
            {/* 달력 컴포넌트를 사용하여 날짜를 선택할 수 있습니다. */}
            <StyledCalendar
              onChange={setDate}
              value={date}
            />
            <LeftInputContainer>
              <InputBox>
              {/* 오늘의 기상 시각 입력 섹션 */}
                <InputTitle>오늘의 기상 시각</InputTitle>
                <DatePicker 
                  selected={wakeTime} 
                  onChange={setWakeTime} 
                  showTimeSelect 
                  showTimeSelectOnly 
                  timeIntervals={10} 
                  timeCaption="Time" 
                  dateFormat="h:mm aa" 
                  customInput={<InputField />} 
                />
                {/* 기상 시각 기록 버튼 */}
                <Button onClick={handleRecordWakeTime}>기상시각 기록</Button>
              </InputBox>
              <InputBox>
              {/* 어젯밤의 취침 시각 입력 섹션 */}
                <InputTitle>어젯밤의 취침 시각</InputTitle>
                <DatePicker
                  selected={sleepTime}
                  onChange={(date) => setSleepTime(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={10}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  customInput={<InputField />}
                />
                {/* 취침 시각 기록 버튼 */}
                <Button onClick={handleRecordSleepTime}>취침시각 기록</Button>
              </InputBox>
               {/* 일기 쓰기 버튼 */}
              <DiaryButton onClick={() => navigate('/writediary')}>일기 쓰기</DiaryButton>
            </LeftInputContainer>
          </CalendarContainer>
          <RightInputContainer>
            <RadarWrapper>
              {/* 레이더 차트를 표시합니다. */}
              <Radar data={radarData} options={radarOptions} />
              <SliderWrapper>
                {/* 감정을 조정할 수 있는 슬라이더를 생성합니다. */}
                {Object.keys(emotions).map((emotion) => (
                  <div key={emotion}>
                    <label>{emotion}</label>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.01" 
                      value={emotions[emotion]}
                      onChange={(e) => handleSliderChange(emotion, parseFloat(e.target.value))}
                      style={{ 
                        background: `linear-gradient(to right, 
                        ${emotionColors[emotion]} 0%, 
                        ${emotionColors[emotion]} ${emotions[emotion] * 100}%, 
                        #ddd ${emotions[emotion] * 100}%, 
                        #ddd 100%)` 
                      }}
                      //disabled={!isEditing}
                      required disabled={!isEditing && isExisting}////제일 중요!!! 상태활성화 조건!!!
                    />
                  </div>
                ))}
              </SliderWrapper>
            </RadarWrapper>
            {/* 감정 기록 저장 및 수정 버튼 */}
            {isExisting && !isEditing ? (
              <SaveButton type="button" onClick={() => setIsEditing(true)}>감정 기록 수정</SaveButton>
            ) : (
              <SaveButton onClick={handleSaveEmotions}>감정 기록 저장</SaveButton>
            )}
          </RightInputContainer>
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
  width: 88%;
  height: 75vh;
  padding: 30px;
  background: rgba(250, 250, 253, 0.7);
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
  height: fit-content;
`;

const CalendarContainer = styled.div`
  width: 740px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding-bottom: 50px;
`;

const LeftInputContainer = styled.div`
  flex: 1;
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 15px;
`;

const RightInputContainer = styled.div`
  width: 740px;
  height: 600px;
  gap: 23px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 0.83vw;
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
    background: #4c4c4c !important;
  }

  .react-calendar__tile--neighboringMonth {
    visibility: hidden !important;
  }
  margin-top: 50px;
  margin-bottom: 1dvb;
  border-radius: 12px;
  border-color: transparent;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Button = styled.button`
  flex: 1;
  padding: 10px;
  background: black;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 12px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;

  &:hover {
    background-color: #333333;  // Hover 시 배경색
    color: white;  // Hover 시 글자색
  }
`;

const DiaryButton = styled.button`
  width: 500px;
  flex: 1;
  padding: 10px;
  background: white;
  color: black;
  border: none;
  border-radius: 20px;
  font-size: 17px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const SaveButton = styled.button`
  width: 500px;
  flex: 1;
  padding: 12px;
  background: white;
  color: black;
  border: none;
  border-radius: 20px;
  font-size: 17px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const DateText = styled.div`
  width: 37.60%;
  text-align: center;
  color: #3D3D3D;
  font-size: 1.56vw;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

const InputTitle = styled.div`
  color: #3D3D3D;
  font-size: 1.25vw;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
`;

const InputField = styled.input`
  width: 500px;
  height: 40px;
  background: white;
  text-align: center;
  border: 1px #CCCCCC solid;
  border-radius: 10px;
`;

const RadarWrapper = styled.div`
  width: 480px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const SliderWrapper = styled.div`
  font-size: 11px;
  font-family: 'Avenir', sans-serif;
  font-weight: 500;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);  // 2열로 배치
  grid-gap: 10px;  // 각 항목 간의 간격
  padding: 10px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  label {
    font-weight: bold;
  }

  input[type="range"] {
    width: 100%;
    margin: 0;
    -webkit-appearance: none;
    appearance: none;
    background: #ddd;
    border-radius: 3px;
    height: 8px;
    cursor: pointer;
    outline: none;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 9.5px;
      height: 9.5px;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5);
    }
  }
`;

const emotionColors = {
  Joy: '#feed9f',
  Sadness: '#92abd6',
  Fear: '#cfc9f3',
  Disgust: '#acdcc1',
  Anger: '#c66060',
  Surprise: '#edbfc8'
};