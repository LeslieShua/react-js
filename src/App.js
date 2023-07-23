/* eslint-disable */

import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  let [title, setTitle] = useState(["자바스크립트", "파이썬", "나물"]);
  let [like, setLike] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [subTitle, setSubTitle] = useState(0); //UI 상태 저장
  let [input, setInput] = useState(""); //input값 상태 저장

  const [currentDate, setCurrentDate] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleButtonClick = () => {
    if (input.trim() !== "") {
      let copy3 = [...title];
      copy3.unshift(input);
      setTitle(copy3);

      let copyLike = [...like];
      copyLike.unshift(0);
      setLike(copyLike);

      setInput("");
    } else {
      alert("Please enter a value before adding.");
    }
  };

  useEffect(() => {
    const getCurrentDateInKorean = () => {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Asia/Seoul",
      };

      const koreanDate = new Date().toLocaleDateString("ko-KR", options);
      return koreanDate;
    };

    // Set the initial state with the current Korean date
    setCurrentDate(getCurrentDateInKorean());
  }, []);

  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 blog</div>
      </div>
      {/* 가나다순정렬 */}
      <button
        onClick={() => {
          let so = [...title];
          so.sort((a, b) => (a.toUpperCase() < b.toUpperCase() ? -1 : 1));
          setTitle(so);
        }}
      >
        가나다순정렬
      </button>
      {/* 글 수정 */}
      <button
        onClick={() => {
          let copy = [...title];
          copy[1] = "가지";
          setTitle(copy);
        }}
      >
        글 수정
      </button>
      {/* `_` 화살표 함수의 인수는 인수가 사용되지 않음을 나타내는 규칙 */}
      {Array.from(title)
        .fill()
        .map((_, i) => (
          <div className="list" key={i}>
            <span
              className="list1"
              onClick={() => {
                setModal(!modal);
                setSubTitle(i);
              }}
            >
              {title[i]}
            </span>
            <span
              onClick={() => {
                const copyLike = [...like];
                copyLike[i]++;
                setLike(copyLike);
              }}
            >
              👍
            </span>
            {like[i]}

            <span className="horizon">
              <p> {currentDate} 발행</p>

              {/* 글 삭제 */}
              <button
                onClick={() => {
                  let copy2 = [...title];
                  copy2.splice(i, 1);
                  setTitle(copy2);
                }}
              >
                삭제
              </button>
            </span>
          </div>
        ))}

      <input onChange={handleInputChange} value={input} className="mginR10" />
      {/* 글 추가 */}
      <button onClick={handleButtonClick}>생성</button>

      {modal === true ? (
        <Modal subTitle={subTitle} setTitle={setTitle} title={title} />
      ) : null}
      {/* ternary perator */}
    </div>
  );
}

function Modal(props) {
  return (
    <div className="modal">
      {props.title[props.subTitle]}
      <p>날짜</p>
      <p>상세내용</p>
      <button>글수정</button>
    </div>
  );
}

export default App;
