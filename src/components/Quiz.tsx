import React, { useState } from 'react';
import { questions } from '@/data/questions';

import PythonLogo from '@/components/PythonLogo';

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [learnerName, setLearnerName] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);

  const handleStartQuiz = () => {
    if (learnerName.trim()) {
      setQuizStarted(true);
    } else {
      alert("Please enter your name first!");
    }
  };

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
  };

  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      if (selectedOption === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }

      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedOption(null);
      } else {
        setShowScore(true);
      }
    }
  };

  const handleRestart = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowScore(false);
    setSelectedOption(null);
    setQuizStarted(false);
    setLearnerName('');
  };

  const passPercentage = 60;
  const currentPercentage = Math.round((score / questions.length) * 100);
  const passed = currentPercentage >= passPercentage;

  if (!quizStarted) {
    return (
      <div className="quiz-start-container">
        <h2 className="quiz-title">পাইথন স্কিল টেস্ট</h2>
        <p className="quiz-desc">আপনার দক্ষতা যাচাই করুন এবং সার্টিফিকেট অর্জন করুন!</p>
        <div className="input-group">
          <input
            type="text"
            placeholder="আপনার নাম লিখুন..."
            value={learnerName}
            onChange={(e) => setLearnerName(e.target.value)}
            className="quiz-input"
          />
          <button onClick={handleStartQuiz} className="quiz-btn start-btn">
            পরীক্ষা শুরু করুন
          </button>
        </div>
        <div className="quiz-info">
          <p>মোট প্রশ্ন: {questions.length}টি</p>
          <p>পাস মার্ক: {passPercentage}%</p>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      {showScore ? (
        <div className="score-section">
          {passed ? (
            <div className="certificate-container">
              <div className="certificate-border">
                <div className="certificate-content">
                  <div className="certificate-header">
                    <PythonLogo size={60} className="cert-logo" />
                    {/* Using CSS generated logo instead if image fails or just text */}
                    <h1 className="cert-title">CERTIFICATE</h1>
                    <p className="cert-subtitle">OF ACHIEVEMENT</p>
                  </div>

                  <div className="cert-body">
                    <p className="cert-text">This certificate is proudly presented to</p>
                    <h2 className="cert-name">{learnerName}</h2>
                    <p className="cert-text">
                      for successfully completing the <strong>Python Programming Basic Assessment</strong>
                    </p>
                    <div className="cert-score">
                      Score: {currentPercentage}% ({score}/{questions.length})
                    </div>
                  </div>

                  <div className="cert-footer">
                    <div className="cert-signature">
                      <div className="sig-line"></div>
                      <p>Sifat Faisal</p>
                      <p className="sig-title">Author & Instructor</p>
                    </div>
                    <div className="cert-date">
                      <div className="sig-line"></div>
                      <p>{new Date().toLocaleDateString()}</p>
                      <p className="sig-title">Date</p>
                    </div>
                  </div>
                </div>
              </div>
              <button onClick={handleRestart} className="quiz-btn restart-btn">
                আবার পরীক্ষা দিন
              </button>
            </div>
          ) : (
             <div className="fail-card">
               <div className="fail-icon">😔</div>
               <h2>দুঃখিত, আপনি পাস করতে পারেননি!</h2>
               <p className="fail-score">আপনার স্কোর: {score} / {questions.length}</p>
               <p className="fail-percent">({currentPercentage}%)</p>
               <p className="fail-motivation">
                 মন খারাপ করবেন না! বইয়ের অধ্যায়গুলো আবার ভালো করে পড়ুন এবং পুনরায় চেষ্টা করুন।
                 পাস করার জন্য কমপক্ষে {passPercentage}% নম্বর প্রয়োজন।
               </p>
               <button onClick={handleRestart} className="quiz-btn restart-btn">
                 আবার চেষ্টা করুন
               </button>
             </div>
          )}
        </div>
      ) : (
        <div className="question-section">
          <div className="question-header">
            <span className="question-count">
              প্রশ্ন {currentQuestion + 1} / {questions.length}
            </span>
            <span className="timer-placeholder">⏱️</span>
          </div>

          <h2 className="question-text">{questions[currentQuestion].question}</h2>

          <div className="options-grid">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${selectedOption === index ? 'selected' : ''}`}
                onClick={() => handleOptionClick(index)}
              >
                {option}
              </button>
            ))}
          </div>

          <button
            className="quiz-btn next-btn"
            onClick={handleNextQuestion}
            disabled={selectedOption === null}
          >
            {currentQuestion === questions.length - 1 ? 'সাবমিট করুন' : 'পরবর্তী প্রশ্ন →'}
          </button>
        </div>
      )}
    </div>
  );
}
