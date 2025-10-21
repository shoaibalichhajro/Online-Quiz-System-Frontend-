const questions = [
  { question: "1. What does HTML stand for?", options: ["Hyper Trainer Markup Language", "Hyper Text Markup Language", "Hyper Text Markdown Language", "HighText Machine Language"], answer: 1 },
  { question: "2. What does CSS stand for?", options: ["Colorful Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets"], answer: 2 },
  { question: "3. Which tag is used to link CSS in HTML?", options: ["<script>", "<link>", "<style>", "<meta>"], answer: 1 },
  { question: "4. Which property changes text color in CSS?", options: ["font-color", "color", "text-color", "font-style"], answer: 1 },
  { question: "5. Which language runs in a web browser?", options: ["Python", "C++", "JavaScript", "Java"], answer: 2 },
  { question: "6. What keyword declares a variable in JS?", options: ["int", "var", "declare", "v"], answer: 1 },
  { question: "7. What does DOM stand for?", options: ["Document Object Model", "Data Object Model", "Desktop Object Method", "Document Oriented Method"], answer: 0 },
  { question: "8. Which HTML tag inserts a line break?", options: ["<break>", "<br>", "<lb>", "<b>"], answer: 1 },
  { question: "9. Which symbol is used for JS comments?", options: ["//", "#", "<!-- -->", "**"], answer: 0 },
  { question: "10. Which CSS property controls text size?", options: ["font-style", "text-size", "font-size", "text-style"], answer: 2 },
  { question: "11. What does SQL stand for?", options: ["Structured Query Language", "Strong Question Language", "Structured Query Logic", "Sequential Query Language"], answer: 0 },
  { question: "12. Which HTML tag is for the largest heading?", options: ["<h6>", "<head>", "<h1>", "<heading>"], answer: 2 },
  { question: "13. Which attribute specifies an image source?", options: ["src", "href", "alt", "link"], answer: 0 },
  { question: "14. How to make a numbered list in HTML?", options: ["<ul>", "<ol>", "<list>", "<dl>"], answer: 1 },
  { question: "15. Which event occurs on element click?", options: ["onchange", "onclick", "onhover", "onpress"], answer: 1 },
  { question: "16. Which keyword defines a constant in JS?", options: ["constant", "const", "let", "var"], answer: 1 },
  { question: "17. Which CSS property changes background?", options: ["color", "bgcolor", "background-color", "background"], answer: 2 },
  { question: "18. Which is not a programming language?", options: ["Python", "HTML", "C++", "Java"], answer: 1 },
  { question: "19. What does API stand for?", options: ["Application Programming Interface", "Applied Programming Idea", "Advanced Program Integration", "Application Protocol Interface"], answer: 0 },
  { question: "20. Which tag defines a hyperlink?", options: ["<a>", "<link>", "<href>", "<url>"], answer: 0 }
];

let currentQuestion = 0;
let score = 0;
let timer, timeLeft = 15;
let isPaused = false;
let userName = "";

const startContainer = document.getElementById("start-container");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress-bar");
const timeEl = document.getElementById("time");
const greetEl = document.getElementById("greet");
const scoreEl = document.getElementById("score");
const welcomeEl = document.getElementById("welcome");
const pauseBtn = document.getElementById("pause-btn");

document.getElementById("start-btn").onclick = () => {
  const nameInput = document.getElementById("username").value.trim();
  if (nameInput === "") {
    alert("Please enter your name!");
    return;
  }
  userName = nameInput;
  startContainer.classList.add("hide");
  quizContainer.classList.remove("hide");
  welcomeEl.textContent = `Good luck, ${userName}! 🍀`;
  loadQuestion();
  startTimer();
};

function loadQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.classList.add("option-btn");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(index);
    optionsEl.appendChild(btn);
  });
  updateProgress();
  resetTimer();
}

function checkAnswer(selected) {
  const correct = questions[currentQuestion].answer;
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach((btn, index) => {
    btn.disabled = true;
    if (index === correct) btn.style.background = "#2ecc71";
    if (index === selected && selected !== correct) btn.style.background = "#e74c3c";
  });
  if (selected === correct) score++;
  clearInterval(timer);
  nextBtn.style.display = "block";
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
    nextBtn.style.display = "none";
  } else {
    showResult();
  }
};

function showResult() {
  quizContainer.classList.add("hide");
  resultContainer.classList.remove("hide");
  greetEl.textContent = `🎉 Congratulations, ${userName}! 🎉`;
  scoreEl.textContent = `You scored ${score} out of ${questions.length}`;
  clearInterval(timer);
}

restartBtn.onclick = () => {
  currentQuestion = 0;
  score = 0;
  resultContainer.classList.add("hide");
  startContainer.classList.remove("hide");
  nextBtn.style.display = "none";
};

pauseBtn.onclick = () => {
  if (!isPaused) {
    clearInterval(timer);
    isPaused = true;
    pauseBtn.textContent = "▶️ Resume";
  } else {
    startTimer();
    isPaused = false;
    pauseBtn.textContent = "⏸️ Pause";
  }
};

function updateProgress() {
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  progressBar.style.width = progress + "%";
}

function startTimer() {
  clearInterval(timer);
  timeLeft = 15;
  timeEl.textContent = timeLeft;
  timer = setInterval(() => {
    if (!isPaused) {
      timeLeft--;
      timeEl.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        nextBtn.style.display = "block";
      }
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 15;
  timeEl.textContent = timeLeft;
  startTimer();
}
