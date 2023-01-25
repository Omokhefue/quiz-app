const startBtn = document.querySelector(".start_btn button");
const infoBox = document.querySelector(".info_box");
const quizBox = document.querySelector(".quiz_box");
const actualQuestionNumber = document.querySelector(".total_questions");
const exitBtn = infoBox.querySelector(".buttons .quit");
const continueBtn = infoBox.querySelector(".buttons .restart");
const optionList = document.querySelector(".option_list");
const timeCount = quizBox.querySelector(".timer .timer_sec");
const timeLine = quizBox.querySelector(".time_line");
let tickIcon = `<div class="icon tick"><i class="fas fa-check"></i></div>`;
let crossIcon = `  <div class="icon cross"><i class="fas fa-times"></i></div>`;

startBtn.addEventListener("click", () => {
  infoBox.classList.add("active");
});
exitBtn.addEventListener("click", () => {
  infoBox.classList.remove("active");
});
continueBtn.addEventListener("click", () => {
  infoBox.classList.remove("active");
  quizBox.classList.add("active");
  startTimer(15);
  startTimerLine(0);
  showQuestions(0);
  questionCounter(1);
});
let questionCount = 0;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;
let questionNumber = 1;

const nextBtn = quizBox.querySelector(".next_btn");
const resultBox = document.querySelector(".result_box");
const restartQuiz = resultBox.querySelector(".buttons .restart");
const quitQuiz = resultBox.querySelector(".buttons .quit");

restartQuiz.onclick = () => {
  resultBox.classList.remove("active");
  quizBox.classList.add("active");
  questionCount = 0;
  questionNumber = 1;
  timeValue = 15;
  widthValue = 0;
  userScore = 0;
  showQuestions(questionCount);
  questionCounter(questionNumber);
  clearInterval(counter);
  startTimer(timeValue);
  clearInterval(counterLine);
  startTimerLine(widthValue);
  nextBtn.style.display = "none";
};
quitQuiz.onclick = () => {
  window.location.reload();
};
function nextQuestion() {
  if (questionCount < questions.length - 1) {
    questionCount++;
    questionNumber++;
    showQuestions(questionCount);
    questionCounter(questionNumber);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(widthValue);
    nextBtn.style.display = "none";
  } else {
    clearInterval(counter);
    clearInterval(counterLine);
    showResultBox();
  }
}
nextBtn.addEventListener("click", () => {
  nextQuestion();
});
function showQuestions(index) {
  const questionText = document.querySelector(".question_text");
  let questionTag = `<span>${questions[index].numb} . ${questions[index].question}</span>`;
  let optionTag = `
          <div class="option">
            <span>${questions[index].options[0]}</span>
          </div>
          <div class="option">
            <span>${questions[index].options[1]}</span>
          </div>
          <div class="option">
            <span>${questions[index].options[2]}</span>
          </div>
          <div class="option">
            <span>${questions[index].options[3]}</span>
          </div>
  `;
  questionText.innerHTML = questionTag;
  optionList.innerHTML = optionTag;

  const option = optionList.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "selectedOption(this)");
  }
}
function selectedOption(answer) {
  clearInterval(counter);
  clearInterval(counterLine);
  let userAnswer = answer.innerText;
  let correctAnswer = questions[questionCount].answer;
  if (userAnswer === correctAnswer) {
    userScore++;
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", tickIcon);
  } else {
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", crossIcon);
    Array.from(optionList.children).forEach((option) => {
      if (option.innerText == correctAnswer) {
        option.classList.add("correct");
      }
    });
  }
  Array.from(optionList.children).forEach((option) => {
    option.classList.add("disabled");
  });
  nextBtn.style.display = "block";
}
function showResultBox() {
  infoBox.classList.remove("active");
  quizBox.classList.remove("active");
  resultBox.classList.add("active");
  const scoreText = resultBox.querySelector(".score_text");
  if (userScore == questions.length) {
    scoreTag = `
    <span>Congrats,you're a certified programmer!
    You got all${questions.length}correct
    `;
  } else if (userScore >= 3) {
    scoreTag = `
    <span>Nice. You got<p>${userScore}</p>out of<p>${questions.length}</p></span>
    `;
  } else if (userScore >= 1) {
    scoreTag = `
    <span>Hmm, You got only<p>${userScore}</p>out of<p>${questions.length}</p></span>
    `;
  } else {
    scoreTag = `
    <span>Oops!<p>${userScore}</p>out of<p>${questions.length}</p></span>
    `;
  }
  scoreText.innerHTML = scoreTag;
}
function startTimer(time) {
  timeLine.style.backgroundColor = "green";
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;
    if (time < 10) {
      timeCount.textContent = `0${time}`;
      timeLine.style.backgroundColor = "orange";
    }
    if (time < 4) {
      timeCount.textContent = `0${time}`;
      timeLine.style.backgroundColor = "red";
    }
    if (time == 0) {
      clearInterval(counter);
      nextBtn.addEventListener("click", nextQuestion());
    }
  }
}
function startTimerLine(time) {
  counterLine = setInterval(timer, 29);
  function timer() {
    time += 1;
    timeLine.style.width = time + "px";
    if (time > 549) {
      clearInterval(counterLine);
    }
  }
}
function questionCounter(index) {
  actualQuestionNumber.innerHTML = `
  <span><p>${index}</p> of <p>${questions.length}</p>Questions</span>
  `;
}
