import React, { useEffect, useState, useRef } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const Test = () => {
  const duration = 30 * 60; // 30 minutes
  const navigate = useNavigate();

  const [mcqs, setMcqs] = useState([]);
  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem("answers");
    return saved ? JSON.parse(saved) : {};
  });
  const [timeLeft, setTimeLeft] = useState(duration);
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const timerRef = useRef(null);

  // ✅ Fetch questions correctly from nested array
  useEffect(() => {
    axios.get("/mcq/questions").then((res) => {
      if (Array.isArray(res.data) && res.data[0]?.questions) {
        setMcqs(res.data[0].questions);
      } else {
        setMcqs([]);
      }
    });
  }, []);

  // ✅ Timer setup
  useEffect(() => {
    let endTime = localStorage.getItem("endTime");

    if (!endTime) {
      endTime = Date.now() + duration * 1000;
      localStorage.setItem("endTime", endTime);
    } else {
      endTime = parseInt(endTime, 10);
    }

    const updateTimer = () => {
      const remaining = Math.floor((endTime - Date.now()) / 1000);
      if (remaining <= 0) {
        clearInterval(timerRef.current);
        setTimeLeft(0);
        handleSubmit(); // Auto-submit
      } else {
        setTimeLeft(remaining);
      }
    };

    updateTimer();
    timerRef.current = setInterval(updateTimer, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  // Save answers persistently
  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers));
  }, [answers]);

  const handleAnswer = (id, option) => {
    setAnswers((prev) => ({ ...prev, [id]: option }));
  };

  // ✅ Handle submit locally — calculate score
  const handleSubmit = async () => {
    let newScore = 0;

    mcqs.forEach((q) => {
      if (answers[q._id] === q.CorrectAnswer) {
        newScore++;
      }
    });

    setScore(newScore);
    setSubmitted(true);

    // Reset after showing result
    localStorage.removeItem("answers");
    localStorage.removeItem("endTime");
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // ✅ Show result page after submit
  if (submitted) {
    return (
      <div className="flex flex-col w-full items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">🎉 Test Completed!</h1>
        <p className="text-xl mb-4">
          Your Score: <span className="font-bold">{score}</span> / {mcqs.length}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Retake Test
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">🧠 MCQ Test</h1>

        <div
          className={`p-2 mb-4 rounded text-white font-medium ${
            timeLeft <= 60 ? "bg-red-600 animate-pulse" : "bg-green-600"
          }`}
        >
          Time Left: {formatTime(timeLeft)}
        </div>

        {mcqs.length === 0 && (
          <p className="text-gray-600">Loading questions...</p>
        )}

        {mcqs.map((q, i) => (
          <div key={q._id} className="mb-5 p-4 border rounded bg-white shadow-sm">
            <p className="font-medium mb-3">
              {i + 1}. {q.Question}
            </p>
            {["A", "B", "C", "D"].map((opt) => (
              <label
                key={opt}
                className="block border rounded p-2 mb-2 hover:bg-blue-50 cursor-pointer"
              >
                <input
                  type="radio"
                  name={q._id}
                  value={opt}
                  onChange={() => handleAnswer(q._id, opt)}
                  checked={answers[q._id] === opt}
                  className="mr-2"
                />
                <span className="font-semibold">{opt}.</span>{" "}
                {q[`Option${opt}`]}
              </label>
            ))}
          </div>
        ))}

        {mcqs.length > 0 && (
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
          >
            Submit Test
          </button>
        )}
      </div>
    </div>
  );
};

export default Test;
