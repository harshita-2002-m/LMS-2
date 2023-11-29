import React, { useState, useEffect } from "react";

// import "./StudentQuiz.css"; // Updated CSS file name

 

function StudentQuiz() {

  // Updated component name

  const [quizState, setQuizState] = useState("start");

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [userScore, setUserScore] = useState(0);

  const [timeLeft, setTimeLeft] = useState(15);

 

  const questions = [

    {

      numb: 1,

      question: "What does HTML stand for?",

      answer: "Hyper Text Markup Language",

      options: [

        "Hyper Text Preprocessor",

        "Hyper Text Markup Language",

        "Hyper Text Multiple Language",

        "Hyper Tool Multi Language",

      ],

    },

    {

      numb: 2,

      question: "What does CSS stand for?",

      answer: "Cascading Style Sheet",

      options: [

        "Common Style Sheet",

        "Colorful Style Sheet",

        "Computer Style Sheet",

        "Cascading Style Sheet",

      ],

    },

    {

      numb: 3,

      question: "What does PHP stand for?",

      answer: "Hypertext Preprocessor",

      options: [

        "Hypertext Preprocessor",

        "Hypertext Programming",

        "Hypertext Preprogramming",

        "Hometext Preprocessor",

      ],

    },

    {

      numb: 4,

      question: "What does SQL stand for?",

      answer: "Structured Query Language",

      options: [

        "Stylish Question Language",

        "Stylesheet Query Language",

        "Statement Question Language",

        "Structured Query Language",

      ],

    },

    {

      numb: 5,

      question: "What does XML stand for?",

      answer: "eXtensible Markup Language",

      options: [

        "eXtensible Markup Language",

        "eXecutable Multiple Language",

        "eXTra Multi-Program Language",

        "eXamine Multiple Language",

      ],

    },

  ];

 

  const tickIconTag = (

    <div className="icon tick">

      <i className="fas fa-check"></i>

    </div>

  );

 

  const crossIconTag = (

    <div className="icon cross">

      <i className="fas fa-times"></i>

    </div>

  );

 

  const startQuiz = () => {

    setQuizState("quiz");

    startTimer();

  };

 

  const startTimer = () => {

    let timer = setInterval(() => {

      setTimeLeft((prevTime) => prevTime - 1);

    }, 1000);

 

    return () => {

      clearInterval(timer);

    };

  };

 

  const checkAnswer = (selectedAnswer) => {

    clearInterval(startTimer);

    const correctAnswer = questions[currentQuestion].answer;

    if (selectedAnswer === correctAnswer) {

      setUserScore(userScore + 1);

    }

    nextQuestion();

  };

 

  const nextQuestion = () => {

    if (currentQuestion < questions.length - 1) {

      setCurrentQuestion(currentQuestion + 1);

      setTimeLeft(15);

      startTimer();

    } else {

      setQuizState("result");

    }

  };

 

  useEffect(() => {

    if (timeLeft === 0) {

      nextQuestion();

    }

  }, [timeLeft]);

 

  const renderQuiz = () => {

    const currentQues = questions[currentQuestion];

    const options = currentQues.options.map((option, index) => (

      <div key={index} className="option" onClick={() => checkAnswer(option)}>

        <span>{option}</span>

      </div>

    ));

 

    return (

      <div className="studentQuiz QuizContainer">

        <header>

          <div className="title"> Student Quiz </div>

          <div className="timer">

            <div className="time_left_txt">Time Left</div>

            <div className="timer_sec">{timeLeft}</div>

          </div>

          <div className="time_line"></div>

        </header>

        <section>

          <div className="que_text">

            <span>

              {currentQues.numb}. {currentQues.question}

            </span>

          </div>

          <div className="option_list">{options}</div>

        </section>

        <footer>

          <button className="next_btn" onClick={nextQuestion}>

            Next Que

          </button>

        </footer>

      </div>

    );

  };

 

  const renderResult = () => {

    return (

      <div className="studentQuiz">

        <div className="icon">

          <i className="fas fa-crown"></i>

        </div>

        <div className="complete_text">You've completed the Student Quiz!</div>

        <div className="score_text">

          <span>

            You got <p>{userScore}</p> out of <p>{questions.length}</p>

          </span>

        </div>

        <div className="buttons">

          <button className="quit" onClick={() => window.location.reload()}>

            Quit Quiz

          </button>

        </div>

      </div>

    );

  };

 

  return (

    <div className="studentQuiz">

      {quizState === "start" && (

        <div className="start_btn">

          <button onClick={startQuiz}>Start Quiz</button>

        </div>

      )}

 

      {quizState === "quiz" && renderQuiz()}

 

      {quizState === "result" && renderResult()}

    </div>

  );

}

 

export default StudentQuiz;