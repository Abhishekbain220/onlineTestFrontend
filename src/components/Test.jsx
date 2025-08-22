import React, { useEffect, useState, useRef } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const Test = () => {
  const duration = 30 * 60; // 30 minutes in seconds
  const navigate = useNavigate();

  const [mcqs, setMcqs] = useState([]);
  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem("answers");
    return saved ? JSON.parse(saved) : {};
  });
  const [timeLeft, setTimeLeft] = useState(duration);

  const timerRef = useRef(null);

  // Fetch questions
  useEffect(() => {
    axios.get("/mcq/questions").then((res) => setMcqs(res.data));
  }, []);

  // Setup timer
  useEffect(() => {
    let endTime = localStorage.getItem("endTime");

    if (!endTime) {
      endTime = Date.now() + duration * 1000; // store as timestamp
      localStorage.setItem("endTime", endTime);
    } else {
      endTime = parseInt(endTime, 10);
    }

    const updateTimer = () => {
      const remaining = Math.floor((endTime - Date.now()) / 1000);
      if (remaining <= 0) {
        clearInterval(timerRef.current);
        setTimeLeft(0);
        handleSubmit(); // Auto submit
      } else {
        setTimeLeft(remaining);
      }
    };

    updateTimer(); // run immediately
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

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post("/mcq/submit", { answers });

      // Navigate to results page
      navigate("/result", {
        state: { score: data.score, total: mcqs.length },
      });
    } catch (err) {
      console.error(err);
    }

    // Reset everything for next test
    localStorage.removeItem("answers");
    localStorage.removeItem("endTime");
    setAnswers({});
    setTimeLeft(duration);
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="h-screen w-full overflow-auto">
      <div className="p-6 h-full w-full">
        <h1 className="text-2xl font-bold">MCQ Test</h1>

        <div
          className={`p-2 my-4 rounded text-white ${
            timeLeft <= 60 ? "bg-red-600 animate-pulse" : "bg-green-600"
          }`}
        >
          Time Left: {formatTime(timeLeft)}
        </div>

        {mcqs.map((q, i) => (
          <div key={q._id} className="mb-4 p-3 border rounded">
            <p>
              {i + 1}. {q.Question}
            </p>
            {["A", "B", "C", "D"].map((opt) => (
              <label key={opt} className="block">
                <input
                  type="radio"
                  name={q._id}
                  value={opt}
                  onChange={() => handleAnswer(q._id, opt)}
                  checked={answers[q._id] === opt}
                />
                {q[`Option${opt}`]}
              </label>
            ))}
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Test;
