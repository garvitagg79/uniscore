import React, { useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";

// Function to calculate the score based on standard deviation and average
const calculateScore = (parsedScore, average, sd) => {
  if (average > 80) average -= average * 0.1;
  if (average < 60) average += average * 0.1;
  let normal = (parsedScore - average) / sd;
  if (normal > 1.5 && parsedScore >= 85) return 10;
  if (normal > 1.5 && parsedScore < 85) return 9;
  if (normal > 1.0 && normal <= 1.5) return 9;
  if (normal > 0.5 && normal <= 1.0) return 8;
  if (normal > 0.0 && normal <= 0.5) return 7;
  if (normal > -0.5 && normal <= 0.0) return 6;
  if (normal > -1.0 && normal <= -0.5 && parsedScore >= 70) return 6;
  if (normal > -1.0 && normal <= -0.5 && parsedScore < 70) return 5;
  if (normal > -1.5 && normal <= -1.0 && parsedScore >= 60) return 5;
  if (normal > -1.5 && normal <= -1.0 && parsedScore < 60) return 4;
  // Add more conditions as needed
  if (parsedScore > 54) return 4;
  return 0; // Default score if none of the conditions are met
};

// Course component
const Course = ({ name, initialScore, average, sd }) => {
  const [score, setScore] = useState("");
  const [result, setResult] = useState("");
  const [isScoreVisible, setIsScoreVisible] = useState(false);

  const handleCalculate = () => {
    const parsedScore = parseFloat(score);

    if (
      !isNaN(parsedScore) &&
      parsedScore >= 0 &&
      parsedScore <= initialScore
    ) {
      const courseScore = calculateScore(parsedScore, average, sd);
      setResult(`Score: ${courseScore}`);
    } else {
      setResult("Please enter a valid score between 0 and " + initialScore);
    }
  };

  return (
    <div className="course-container">
      <h2 onClick={() => setIsScoreVisible(!isScoreVisible)}>{name}</h2>
      {isScoreVisible && (
        <div>
          <label>Enter your score (out of {initialScore}): </label>
          <input
            type="text"
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />
          <button className="course-container button" onClick={handleCalculate}>
            Calculate
          </button>
        </div>
      )}
      {isScoreVisible && (
        <div>
          <p>{result ? `${result}, +- 1 in your CGPA` : ""}</p>
        </div>
      )}
    </div>
  );
};

// App component
function App() {
  // Define courses and their corresponding initial scores
  const courses = [
    {
      name: "Project Management For Managers",
      initialScore: 100,
      average: 65.76319648,
      sd: 9.252887652,
    },
    {
      name: "Foundations Of R Software",
      initialScore: 100,
      average: 84.29032258,
      sd: 9.115897062,
    },
    {
      name: "Privacy And Security In Online Social Media",
      initialScore: 100,
      average: 82.4992343,
      sd: 6.286762997,
    },
    {
      name: "Cyber Security and Privacy",
      initialScore: 100,
      average: 68.31623932,
      sd: 7.851791925,
    },
    {
      name: "Introduction To Industry 4.0 And Industrial Internet Of Things",
      initialScore: 100,
      average: 79.35307517,
      sd: 5.646406169,
    },
    {
      name: "Deep Learning - IIT Ropar",
      initialScore: 100,
      average: 71.53333333,
      sd: 10.15247395,
    },
    {
      name: "Wildlife Ecology",
      initialScore: 100,
      average: 95.75262732,
      sd: 7.376178747,
    },
    {
      name: "Design Thinking - A Primer",
      initialScore: 100,
      average: 76.40428677,
      sd: 10.30668247,
    },
    {
      name: "Design & Implementation Of Human-Computer Interfaces",
      initialScore: 100,
      average: 64.46464646,
      sd: 7.232738961,
    },
  ];

  return (
    <div className="app-container">
      <div className="header">
        <h1>UniScore</h1>
      </div>
      <div className="courses-container">
        {courses.map((course, index) => (
          <Course key={index} {...course} />
        ))}
      </div>
      <Analytics />
    </div>
  );
}

export default App;
