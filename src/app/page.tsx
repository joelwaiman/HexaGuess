'use client'

import { useState } from "react";

export default function Home() {
  const [randomColor, setRandomColor] = useState<string>(generateRandomColor());
  const [color, setColor] = useState<string>('');
  const [inputColor, setInputColor] = useState<string>('');
  const [attempts, setAttempts] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');
  const [score, setScore] = useState<number>(0);

  function generateRandomColor(): string {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  }

  function handleTry(): void {
    if (attempts.length === 4) {
      setMessage('Has alcanzado el límite de intentos.');
      return;
    }

    setColor(inputColor);
    setAttempts(prev => [...prev, inputColor])

    if (inputColor.toLowerCase() === randomColor.substring(1).toLowerCase()) {
      setMessage('¡Felicidades! Has acertado el color.');
      setScore(prev => prev + 10);
    } else {
      setMessage(`wrong attemp. ${4 - attempts.length - 1} chance left`);
      setInputColor('')
    }
    if (inputColor.length !== 6) {
      setMessage('only 6 characters');
      return;
    }
  }

  function resetGame(): void {
    setRandomColor(generateRandomColor());
    setColor('');
    setInputColor('');
    setAttempts([]);
    setScore(0)
    setMessage('');
  }

  function verifyLetterPosition(input: string, target: string): JSX.Element[] {
    const targetChars = target.slice(1).toUpperCase().split('');
    const inputChars = input.toUpperCase().split('');
    const result: JSX.Element[] = [];
    const usedTargetIndices: Set<number> = new Set();

    for (let i = 0; i < inputChars.length; i++) {
      if (inputChars[i] === targetChars[i]) {
        result.push(
          <span
            key={i}
            className="bg-green-500 text-white font-bold py-1 px-2 rounded"
          >
            {inputChars[i]}
          </span>
        );
        usedTargetIndices.add(i);
      } else {
        result.push(null);
      }
    }

    for (let i = 0; i < inputChars.length; i++) {
      if (result[i] === null) {
        let found = false;
        for (let j = 0; j < targetChars.length; j++) {
          if (!usedTargetIndices.has(j) && inputChars[i] === targetChars[j]) {
            result[i] = (
              <span
                key={i}
                className="bg-yellow-500 text-white font-bold py-1 px-2 rounded"
              >
                {inputChars[i]}
              </span>
            );
            usedTargetIndices.add(j);
            found = true;
            break;
          }
        }
        if (!found) {
          result[i] = (
            <span
              key={i}
              className="bg-gray-500 text-white font-bold py-1 px-2 rounded"
            >
              {inputChars[i]}
            </span>
          );
        }
      }
    }

    return result;
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-8 md:p-12 font-sans bg-gradient-to-br from-gray-900 to-gray-800 text-white">

      <main className="flex flex-col w-full max-w-2xl gap-6 items-center bg-gray-800 p-6 rounded-2xl shadow-xl">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-center">Try to match the color</h1>
        <section className="flex flex-col sm:flex-row w-full gap-4 justify-center">
          <div className="w-full sm:w-2/5 h-32 sm:h-48 rounded-xl shadow-lg" style={{ backgroundColor: randomColor }} />
          <div className="w-full sm:w-2/5 h-32 sm:h-48 rounded-xl shadow-lg" style={{ backgroundColor: `#${color}` }} />
        </section>

        <div className="flex flex-col sm:flex-row w-full justify-center gap-4">
          <input
            className="p-3 w-full rounded-xl text-black text-lg"
            value={inputColor}
            onChange={(e) => setInputColor(e.target.value.replace('#', ''))}
            type="text"
            placeholder="ff7f50"
          />
          <button
            className="bg-blue-600 p-3 rounded-xl text-white text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
            onClick={handleTry}
            disabled={inputColor.length !== 6}
          >
            Try
          </button>
        </div>
        <p className="text-center text-lg">{message}</p>
        <div className="flex flex-col sm:flex-row w-full justify-between gap-4">
          <button className="bg-gray-700 p-3 rounded-xl text-white text-lg hover:bg-gray-600 transition-colors"
            onClick={() => {
              setRandomColor(generateRandomColor());
              setAttempts([]);
              setInputColor('')
            }}>
            New color
          </button>
          <button className="bg-red-600 p-3 rounded-xl text-white text-lg hover:bg-red-700 transition-colors"
            onClick={resetGame}>
            Reset
          </button>
        </div>
        <div className="flex flex-col items-center w-full">
          <p className="text-xl font-semibold mb-2">Attemps</p>
          <ol className="w-full space-y-2">
            {attempts.map((attempt, index) => (
              <li key={index} className="flex gap-1 justify-center p-2 bg-gray-700 rounded-lg">
                {verifyLetterPosition(attempt, randomColor)}
              </li>
            ))}
          </ol>
        </div>

        <p className="text-2xl font-semibold bg-gray-700 rounded-full px-6 py-2">Score: {score}</p>

      </main>
    </div>
  );
}
