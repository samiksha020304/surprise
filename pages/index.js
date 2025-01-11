import { useState, useEffect } from "react";
import Confetti from "react-confetti";

export default function Home() {
  const [showQuestion, setShowQuestion] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [userName, setUserName] = useState("Love");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name") || "Love";
    setUserName(name);

    // Show the main question after a countdown
    const timer = setTimeout(() => setShowQuestion(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleYesClick = () => {
    setShowCelebration(true);
  };

  const moveButton = (e) => {
    const button = e.target;
    const randomX = Math.random() * window.innerWidth * 0.8;
    const randomY = Math.random() * window.innerHeight * 0.8;
    button.style.position = "absolute";
    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;
    button.style.transform = `rotate(${Math.random() * 360}deg)`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-purple-800 to-black overflow-hidden relative flex items-center justify-center">
      {/* Twinkling Stars */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, index) => (
          <div
            key={index}
            className="absolute bg-white rounded-full w-1 h-1 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Shooting Stars */}
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="absolute bg-white w-2 h-2 rounded-full animate-shooting-star"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 50}%`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        ></div>
      ))}

      {/* Confetti Celebration */}
      {showCelebration && <Confetti />}

      {/* Content */}
      <div className="text-center relative z-10">
        {!showQuestion ? (
          <div className="text-5xl font-extrabold text-white drop-shadow-lg animate-fade-in">
            Hi {userName}! 🌟  
            <p className="mt-4 text-2xl">I have something special to ask...</p>
          </div>
        ) : !showCelebration ? (
          <>
            <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-8 animate-fade-in">
              Will You Marry Me? 💖
            </h1>
            <div className="space-x-4">
              <button
                onClick={handleYesClick}
                className="bg-pink-600 text-white px-8 py-3 rounded-full text-lg shadow-lg hover:bg-pink-700 transition-all transform hover:scale-110 animate-fade-in"
              >
                Yes
              </button>
              <button
                onMouseOver={moveButton}
                className="bg-gray-300 text-gray-800 px-8 py-3 rounded-full text-lg shadow-lg transform hover:animate-jiggle transition-all"
              >
                No
              </button>
            </div>
          </>
        ) : (
          <div className="celebration animate-fade-in">
            <h2 className="text-4xl font-bold text-pink-600 mb-4">
              💕 Yay! I can't wait to spend forever with you! 💕
            </h2>
            <p className="mt-4 text-lg text-white italic">
              You’ve made me the happiest person in the universe! 🌌
            </p>
            <p className="mt-4 text-lg text-white italic">
              Let's marry right away 🌌
            </p>
            <div className="mt-8 animate-bounce text-6xl">🎉🎉🎉</div>
          </div>
        )}
      </div>
    </div>
  );
}
