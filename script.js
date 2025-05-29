const questions = [
    {
      question: "What number comes next in the sequence: 2, 6, 12, 20, 30, ?",
      options: ["36", "40", "42", "48"],
      answer: 2,
    },
    {
      question: "If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops definitely Lazzies?",
      options: ["Yes", "No", "Cannot say", "Only some are"],
      answer: 0,
    },
    {
      question: "Find the odd one out: Apple, Banana, Carrot, Grape",
      options: ["Apple", "Banana", "Carrot", "Grape"],
      answer: 2,
    },
    {
      question: "If you rearrange the letters 'CIFAIPC' you get the name of a:",
      options: ["City", "Animal", "Ocean", "River"],
      answer: 2,
    },
    {
      question: "Which shape completes the pattern? ◼️, ◻️, ◼️, ◻️, ?",
      options: ["◼️", "◻️", "▲", "●"],
      answer: 0,
    },
    {
      question: "If two pencils cost 8 cents, how much do five pencils cost?",
      options: ["20 cents", "18 cents", "16 cents", "15 cents"],
      answer: 2,
    },
    {
      question: "What comes next: J, F, M, A, M, ?",
      options: ["J", "K", "L", "N"],
      answer: 0,
    },
    {
      question: "If 3x + 2 = 11, what is x?",
      options: ["2", "3", "4", "5"],
      answer: 1,
    },
    {
      question: "Which number is the smallest?",
      options: ["0.2", "0.03", "0.5", "0.09"],
      answer: 1,
    },
    {
      question: "If you flip a coin 3 times, what is the chance of getting all heads?",
      options: ["1/6", "1/8", "1/4", "1/2"],
      answer: 1,
    },
    {
      question: "What is the next number in this pattern: 1, 4, 9, 16, 25, ?",
      options: ["30", "35", "36", "49"],
      answer: 2,
    },
    {
      question: "What is 15% of 200?",
      options: ["20", "25", "30", "35"],
      answer: 2,
    },
    {
      question: "If a clock shows 3:15, what is the angle between the hour and minute hands?",
      options: ["0°", "7.5°", "30°", "45°"],
      answer: 1,
    },
    {
      question: "If all squares are rectangles, are all rectangles squares?",
      options: ["Yes", "No", "Maybe", "Sometimes"],
      answer: 1,
    },
    {
      question: "Which number logically replaces the question mark? 7, 14, 28, 56, ?",
      options: ["62", "112", "108", "84"],
      answer: 1,
    },
    {
      question: "What is the missing number? 5, 10, 20, 40, ?",
      options: ["80", "90", "100", "60"],
      answer: 0,
    },
    {
      question: "If two trains are moving towards each other at 60 km/h and 40 km/h, how far apart were they 1 hour ago?",
      options: ["40 km", "50 km", "100 km", "120 km"],
      answer: 3,
    },
    {
      question: "What letter comes next in this series? B, D, F, H, ?",
      options: ["I", "J", "K", "L"],
      answer: 2,
    },
    {
      question: "Which word does NOT belong? Dog, Cat, Rabbit, Carrot",
      options: ["Dog", "Cat", "Rabbit", "Carrot"],
      answer: 3,
    },
    {
      question: "What number is missing? 3, 6, 9, ?, 15",
      options: ["10", "11", "12", "13"],
      answer: 2,
    },
  ];

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  const questionEl = document.getElementById("question");
  const optionBtns = Array.from(document.getElementsByClassName("option-btn"));
  const feedbackEl = document.getElementById("feedback");
  const scoreEl = document.getElementById("score");
  const restartBtn = document.getElementById("restart-btn");
  
  let shuffledQuestions = [];
  let currentQuestionIndex = 0;
  let score = 0;
  
  function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    scoreEl.style.display = "none";
    restartBtn.style.display = "none";
    feedbackEl.textContent = "";
    shuffledQuestions = [...questions];
    shuffleArray(shuffledQuestions);
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    currentQuestion.options.forEach((option, index) => {
      optionBtns[index].textContent = option;
      optionBtns[index].disabled = false;
    });
  }
  
  function resetState() {
    feedbackEl.textContent = "";
    optionBtns.forEach((btn) => {
      btn.style.backgroundColor = "#4a90e2";
      btn.disabled = false;
    });
    scoreEl.style.display = "none";
  }
  
  function selectAnswer(e) {
    const selectedBtn = e.target;
    const selectedIndex = optionBtns.indexOf(selectedBtn);
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
  
    optionBtns.forEach((btn) => (btn.disabled = true)); 
  
    if (selectedIndex === currentQuestion.answer) {
      selectedBtn.style.backgroundColor = "#28a745"; 
      feedbackEl.textContent = "Thats Correct";
      score++;
    } else {
      selectedBtn.style.backgroundColor = "#dc3545";
      feedbackEl.textContent = `Wrong! The answer was: "${currentQuestion.options[currentQuestion.answer]}"`;

      optionBtns[currentQuestion.answer].style.backgroundColor = "#28a745";
    }
  
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
      setTimeout(showQuestion, 1800);
    } else {
      setTimeout(showScore, 1800);
    }
  }
  
  function showScore() {
    questionEl.style.display = "none";
    optionBtns.forEach((btn) => (btn.style.display = "none"));
    feedbackEl.style.display = "none";
  
    scoreEl.style.display = "block";
  
    const total = shuffledQuestions.length;
    const percent = (score / total) * 100;
    let iqMessage = "";
  
    if (percent >= 90) {
      iqMessage = "Genius level!";
    } else if (percent >= 75) {
      iqMessage = "Above average IQ!";
    } else if (percent >= 50) {
      iqMessage = "Normal IQ. Just Keep practicing!";
    } else {
      iqMessage = "Needs improvement. Keep Trying again!";
    }
  
    scoreEl.textContent = `You scored ${score} out of ${total}! ${iqMessage}`;
    restartBtn.style.display = "inline-block";
  }
  
  restartBtn.addEventListener("click", () => {
    questionEl.style.display = "block";
    optionBtns.forEach((btn) => {
      btn.style.display = "inline-block";
    });
    feedbackEl.style.display = "block";
    startQuiz();
  });
  
  optionBtns.forEach((btn) => {
    btn.addEventListener("click", selectAnswer);
  });
  
  startQuiz();
  