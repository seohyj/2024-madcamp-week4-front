import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const LogContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
`;

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 16px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
  padding: 10px;
  font-size: 16px;
  background-color: #e8491d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

function MyLog() {
  const [date, setDate] = useState(new Date());
  const [emotions, setEmotions] = useState({
    Joy: 0,
    Sadness: 0,
    Fear: 0,
    Disgust: 0,
    Anger: 0,
    Surprise: 0
  });

  const navigate = useNavigate();

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

  return (
    <LogContainer>
      <CalendarContainer>
        <h1>My Log Page</h1>
        <p>여기에 로그 내용이 표시됩니다.</p>
        <StyledCalendar
          onChange={onChange}
          value={date}
        />
      </CalendarContainer>
      <InputContainer>
        <h2>{formatDate(date)}</h2>
        <Label>
          기상시각:
          <Input type="text" name="wakeTime" />
        </Label>
        <Label>
          취침시각:
          <Input type="text" name="bedTime" />
        </Label>
        <Button onClick={() => navigate('/writediary')}>일기</Button>
        <Radar data={radarData} options={radarOptions} />
      </InputContainer>
    </LogContainer>
  );
}

export default MyLog;
