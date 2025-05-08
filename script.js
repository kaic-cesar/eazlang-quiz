const questions = [
  {
    question: "Qual é a capital do Brasil?",
    answers: ["São Paulo", "Brasília", "Rio de Janeiro"],
    correct: "Brasília"
  },
  {
    question: "Quanto é 2 + 2?",
    answers: ["3", "4", "5"],
    correct: "4"
  },
  {
    question: "Qual é a cor do céu em um dia claro?",
    answers: ["Azul", "Verde", "Amarelo"],
    correct: "Azul"
  },
  {
    question: "Qual o maior planeta do sistema solar?",
    answers: ["Terra", "Júpiter", "Marte"],
    correct: "Júpiter"
  },
  {
    question: "Em que continente está o Egito?",
    answers: ["África", "Ásia", "Europa"],
    correct: "África"
  },
  {
    question: "Quem escreveu Dom Casmurro?",
    answers: ["Machado de Assis", "Carlos Drummond", "Clarice Lispector"],
    correct: "Machado de Assis"
  },
  {
    question: "Qual é o idioma falado na França?",
    answers: ["Francês", "Inglês", "Alemão"],
    correct: "Francês"
  },
  {
    question: "Qual é o símbolo químico da água?",
    answers: ["O2", "H2O", "CO2"],
    correct: "H2O"
  },
  {
    question: "Quantos dias tem um ano bissexto?",
    answers: ["365", "366", "367"],
    correct: "366"
  },
  {
    question: "Qual o animal símbolo da Austrália?",
    answers: ["Leão", "Canguru", "Urso"],
    correct: "Canguru"
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
