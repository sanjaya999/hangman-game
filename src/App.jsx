import React, { useState, useEffect } from 'react';
import HangmanFigure from './HangmanFigure';
import './App.css';

const words = ["elephant", "quiz", "apple", "dog", "jazz"]; // Word pool

function App() {
  const [word, setWord] = useState(words[Math.floor(Math.random() * words.length)]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.className = theme + '-theme';
  }, [theme]);

  const displayWord = word.split("").map((letter) => ({
    letter: letter,
    revealed: guessedLetters.includes(letter)
  }));

  const handleGuess = (letter) => {
    if (!guessedLetters.includes(letter) && !wrongGuesses.includes(letter)) {
      if (word.includes(letter)) {
        setGuessedLetters([...guessedLetters, letter]);
      } else {
        setWrongGuesses([...wrongGuesses, letter]);
      }
    }
  };

  const isLoser = wrongGuesses.length >= 10;
  const isWinner = word.split("").every((letter) => guessedLetters.includes(letter));

  const resetGame = () => {
    setWord(words[Math.floor(Math.random() * words.length)]);
    setGuessedLetters([]);
    setWrongGuesses([]);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  return (
    <div className="game-container">
      <h1>Hangman Game</h1>
      <button onClick={toggleTheme} className="theme-toggle">
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
      <div className="hangman-figure">
        <HangmanFigure wrongGuesses={wrongGuesses.length} />
      </div>
      
      <div className="word-display">
        {displayWord.map((letterObj, index) => (
          <span key={index} className={letterObj.revealed ? "revealed" : ""}>
            {letterObj.revealed ? letterObj.letter : "_"}
          </span>
        ))}
      </div>
      
      <div className="keyboard">
        {alphabet.map((letter) => (
          <button
            key={letter}
            className={`letter-btn ${guessedLetters.includes(letter) ? "correct" : ""} ${wrongGuesses.includes(letter) ? "wrong" : ""}`}
            onClick={() => handleGuess(letter)}
            disabled={guessedLetters.includes(letter) || wrongGuesses.includes(letter) || isWinner || isLoser}
          >
            {letter}
          </button>
        ))}
      </div>

      <div className="game-status">
        {isWinner && <p className="status win">Congratulations, You Win!</p>}
        {isLoser && <p className="status lose">Game Over! The word was "{word}".</p>}
      </div>

      <button onClick={resetGame} className="reset-btn">Play Again</button>
    </div>
  );
}

export default App;