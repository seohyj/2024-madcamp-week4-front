import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function KakaoCallback() {
  const navigate = useNavigate();
  const [hasFetched, setHasFetched] = useState(false); // 상태 추가

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code && !hasFetched) { // 이미 요청을 보낸 적이 있는지 확인
      setHasFetched(true); // 요청을 보냈음을 상태에 저장
      fetch(`http://localhost:3001/user/kakao/callback?code=${code}`, {
        method: 'GET',
        credentials: 'include'
      })
        .then(response => response.json())
        .then(data => {
          if (data.kakaoId) {
            localStorage.setItem('kakaoId', data.kakaoId);
            navigate('/main');
          } else {
            navigate('/login');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          navigate('/login');
        })
        .finally(() => {
          window.history.replaceState({}, document.title, window.location.pathname);
        });
    } else {
      navigate('/login');
    }
  }, [navigate, hasFetched]);

  return (
    <div className="callback-container">
      <h2>Processing Kakao Login...</h2>
    </div>
  );
}

export default KakaoCallback;
