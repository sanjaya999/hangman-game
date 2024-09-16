import React from 'react';

const HangmanFigure = ({ wrongGuesses }) => {
  const parts = [
    { d: "M20 230 L180 230", dasharray: 160 },
    { d: "M40 230 L40 30", dasharray: 200 },
    { d: "M40 30 L140 30", dasharray: 100 },
    { d: "M140 30 L140 60", dasharray: 30 },
    { d: "M140 60 A15 15 0 1 1 140.1 60", dasharray: 95 },
    { d: "M140 90 L140 150", dasharray: 60 },
    { d: "M140 100 L120 130", dasharray: 40 },
    { d: "M140 100 L160 130", dasharray: 40 },
    { d: "M140 150 L120 180", dasharray: 40 },
    { d: "M140 150 L160 180", dasharray: 40 },
  ];

  return (
    <svg className="hangman-svg" viewBox="0 0 200 250">
      {parts.map((part, index) => (
        <path
          key={index}
          d={part.d}
          className={`hangman-part ${wrongGuesses > index ? 'show' : ''}`}
          style={{
            strokeDasharray: part.dasharray,
            strokeDashoffset: part.dasharray
          }}
        />
      ))}
    </svg>
  );
};

export default HangmanFigure;