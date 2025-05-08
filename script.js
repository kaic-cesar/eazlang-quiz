const questions = [
  {
    question: "1) Qual é a cor do céu em um dia claro? ",
    answers: ["Green", "Yellow", "Blue"],
    correct: "Blue"
  },
  {
    question: "2) Qual destes é um animal que late?",
    answers: ["Dog", "Cat", "Bird"],
    correct: "Dog"
  },
  {
    question: "3) Qual fruta é vermelha e tem sementes pequenas?",
    answers: ["Banana", "Apple", "Orange"],
    correct: "Apple"
  },
  {
    question: "4) Qual destes é um objeto usado para escrever?",
    answers: ["Pen", "Plate", "Cup"],
    correct: "Pen"
  },
  {
    question: "5) Qual destes é um animal que voa?",
    answers: ["Fish", "Cat", "Bird"],
    correct: "Bird"
  },
  {
    question: "6) Qual destes é um objeto usado para beber?",
    answers: ["Plate", "Cup", "Fork"],
    correct: "Machado de Assis"
  },
  {
    question: "7) Qual destes é uma fruta amarela e curvada?",
    answers: ["Grape", "Banana", "Pineapple"],
    correct: "Banana"
  },
  {
    question: "8) Qual destes é um animal que mia?",
    answers: ["Cat", "Dog", "Cow"],
    correct: "Cat"
  },
  {
    question: "9) Qual cor é o sol?",
    answers: ["Yellow", "Blue", "Red"],
    correct: "Yellow"
  },
  {
    question: "10) Qual destes é um objeto usado para cortar papel?",
    answers: ["Scissors", "Knife", "Fork"],
    correct: "Scissors"
  }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswers = [];

function loadQuestion() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = "";

  const q = questions[currentQuestion];
  const questionEl = document.createElement("h2");
  questionEl.innerText = q.question;

  container.appendChild(questionEl);

  q.answers.forEach((answer) => {
    const answerEl = document.createElement("div");
    answerEl.className = "answer";
    answerEl.innerText = answer;
    answerEl.addEventListener("click", () => {
      document.querySelectorAll(".answer").forEach((el) => {
        el.classList.remove("selected");
      });
      answerEl.classList.add("selected");
    });
    container.appendChild(answerEl);
  });

  document.getElementById("backBtn").disabled = currentQuestion === 0;
}

document.getElementById("nextBtn").addEventListener("click", () => {
  const selected = document.querySelector(".answer.selected");
  if (!selected) {
    alert("Por favor, selecione uma resposta.");
    return;
  }

  const answerText = selected.innerText;
  const q = questions[currentQuestion];

  selectedAnswers[currentQuestion] = {
    question: q.question,
    selected: answerText,
    correct: q.correct
  };

  if (answerText === q.correct) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    const resultParams = encodeURIComponent(JSON.stringify(selectedAnswers));
    window.location.href = `result.html?score=${score}&total=${questions.length}&results=${resultParams}`;
  }
});

document.getElementById("backBtn").addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
});

window.onload = loadQuestion;
