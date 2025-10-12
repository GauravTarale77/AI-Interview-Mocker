import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

function QuestionsSection({
  mockInterviewQuestion = [],
  activeQuestionIndex = 0,
  onSelect,
}) {
  const textToSpeech = (text) => {
    if ("SpeechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, Your browser does not support text to speech");
    }
  };

  if (!mockInterviewQuestion || mockInterviewQuestion.length === 0) {
    return <div>No questions available.</div>;
  }

  return (
    <div className="p-5 border rounded-lg my-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {mockInterviewQuestion.map((qa, index) => {
          const isActive = activeQuestionIndex === index;
          return (
            <button
              key={qa?.id ?? qa?.question ?? index}
              type="button"
              onClick={() => onSelect && onSelect(index)}
              className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer
                ${isActive ? "bg-blue-700 text-white" : "bg-gray-300"}`}
            >
              Question #{index + 1}
            </button>
          );
        })}
      </div>

      <h2 className="my-5 text-md md:text-lg">
        {mockInterviewQuestion[activeQuestionIndex]?.question}
      </h2>
      <Volume2
        className="cursor-pointer"
        onClick={() =>
          textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)
        }
      />

      <div className="border rounded-lg p-5 bg-blue-100 mt-20">
        <h2 className="flex gap-2 items-center">
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className="text-sm text-blue-700 my-2">
          {process.env.NEXT_PUBLIC_QUESTION_NOTE}
        </h2>
      </div>
    </div>
  );
}

export default QuestionsSection;
