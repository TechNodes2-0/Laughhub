import { useState } from "react";
import correct from "./assets/sound/confetti.mp3";
import lose from "./assets/sound/lose.mp3";

const Question = () => {
  const questions = [
    {
      question: "Why couldn't the bicycle stand up by itself?",
      options: [
        "It was too tired",
        "It had a flat tire",
        "It didn't like to stand up",
      ],
      correctAnswer: "It was too tired",
    },
    {
      question: "What did the grape say when it got stepped on?",
      options: [
        "Nothing, it just let out a little whine",
        "Ouch!",
        "Grape juice",
      ],
      correctAnswer: "Nothing, it just let out a little whine",
    },
    {
      question: "What do you call an alligator in a vest?",
      options: [
        "An investigator",
        "A well-dressed alligator",
        "A cool alligator",
      ],
      correctAnswer: "An investigator",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [isWinning, setIsWinning] = useState(false);
  const [isLosing, setIsLosing] = useState(false);

  const handleAnswerOptionClick = (answerOption) => {
    if (answerOption === questions[currentQuestion].correctAnswer) {
      new Audio(correct).play();
      setScore(score + 1);
      setIsWinning(true);
    } else {
      new Audio(lose).play();
      setIsLosing(true);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const shareOnTwitter = () => {
    const tweetText = `I scored ${score} out of ${questions.length} on this hilarious quiz! 🤣🤣🤣`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}`;
    window.open(tweetUrl);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen  font-bold text-center">
      <div className="absolute inset-0 z-0 bg-cover bg-center opacity-50"></div>
      <div className="z-10 p-8 rounded-md shadow-lg bg-white">
        {showScore ? (
          <>
            {isWinning && (
              <div className="animate-bounce">
                <img
                  src="  https://cdn-icons-png.flaticon.com/512/3593/3593584.png "
                  alt="Winning animation"
                  className="w-[50px] "
                />
              </div>
            )}
            {isLosing && (
              <div className="animate-shake">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/7371/7371998.png"
                  alt="Losing animation"
                  className="w-[50px] "
                />
              </div>
            )}
            <div className="text-4xl mb-4">
              You scored {score} out of {questions.length}!
            </div>
            <div className="mb-4">
              <button
                className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-4
"
                onClick={shareOnTwitter}
              >
                Share on Twitter
              </button>
              <button
                className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={() => window.location.reload()}
              >
                Play Again
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-4xl mb-4">
              {" "}
              {questions[currentQuestion].question}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {questions[currentQuestion].options.map((answerOption, index) => (
                <button
                  key={index}
                  className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  onClick={() => handleAnswerOptionClick(answerOption)}
                >
                  {answerOption}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Question;
