import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // App.js에서 App 함수를 로딩
import reportWebVitals from './reportWebVitals';

// ReactDOM.createRoot의 인수에서는 root라는 ID를 가진 요소를 지정
const root = ReactDOM.createRoot(
  // index.html에 있는 root를 ID를 가진 요소로 지정
  document.getElementById('root') as HTMLElement
);
root.render(
  // 화면에 그릴 JSX 태그를 지정
  // 부적절한 코드를 감지하기 위한 헬퍼
  <React.StrictMode>
    {/* App은 src/App.tsx로부터 임포트한 것을 사용 */}
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
