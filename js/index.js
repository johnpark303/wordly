const 정답 = "APPLE";

let index = 0;
let attempts = 0;
let timer;
//변경 가능한 변수 선언 let

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다";
    div.style =
      "display:flex; justify-content:center; align-items:center; font-weight:bold; position:absolute; top:41vh; left:44.1vw; background-color:#67A461; width:200px; height:75px; border-radius:5px;";
    document.body.appendChild(div); //js로 html만들기
  };

  const nextLine = () => {
    if (attempts === 6) return; //6번째 시도이면 아무것도 반환하지 않는다
    //줄 바꾸는 함수
    attempts += 1; //attempts는 줄, 시도를 의미
    index = 0; //인덱스 초기화 (처음부터 시작)
  }; //기능 구현이 완료되면 디버깅하기

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  const handleEnterKey = () => {
    let 맞은_개수 = 0;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']` //반복문을 이용해 입력된 단어를 한 단어 씩 불러온다 {시도는 고정}{i}
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i]; //for문으로 i번 반복했을 때 정답의 i번째 문자(인덱스)
      if (입력한_글자 === 정답_글자) {
        block.style.background = "#67A461";
        맞은_개수 += 1;
      } else if (정답.includes(입력한_글자)) block.style.background = "#C3AE54";
      //.includes()를 이용해 겹치는 숫자가 있는지 확인 (같지는 않지만~)
      else block.style.background = "#747979";
      block.style.color = "white"; //틀린 경우
    }
    if (맞은_개수 === 5) gameover(); //5단어 다 맞는 경우 nextline()함수를 불러오는데
    nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      //인덱스가 0인 경우 생기는 오류 방지를 위해 조건문 달아주기
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']` //오류 수정을 위해 새로운 변수 지정
      );
      preBlock.innerText = ""; //해당 인덱스를 비우고
    }
    if (index !== 0) index -= 1; //인덱스가 0이 아닌 경우만 전칸으로 되돌아가라
  };

  const handleKeydown = (event) => {
    //키를 눌렀을 떄 이벤트가 전달됨
    const key = event.key.toUpperCase(); //.toUpperCase 를 이용해 대문자로 변경
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']` //backtic을 이용해서 변수 넣기
    );
    if (event.key === "Backspace")
      handleBackspace(); //thisBlock이란 변수를 파라미터로 전달해서 사용, thisblock 변수를 재정의할 필요 없음
    else if (index === 5) {
      if (event.key === "Enter")
        //Enter 대, 소문자 구분
        handleEnterKey(); //인덱스가 5일때, enter를 누르면 해당 함수가 실행되고 다른 것이면 아무 것도 리턴하지 않는다.
      else return;
    } else if (keyCode >= 65 && keyCode <= 90) {
      //keyCode 이용해서 알파벳만 입력되게하기
      thisBlock.innerText = key;
      index += 1;
    }
  };

  const startTimer = () => {
    const 시작_시간 = new Date();

    const setTime = () => {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector(".timer");
      timeDiv.innerText = `${분}:${초}`;
    };

    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKeydown);
}
//JS 변수, 함수명 => camel 표기법: 띄어쓰는 단어를 대문자로 ex) appStart
//python => snake: 띄어쓰기를 _(언더바)로 표기

appStart();
