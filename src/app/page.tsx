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
      setMessage(`wrong attemp. ${4 - attempts.length} chance left`);
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
    return input.split('').map((char, index) => {
      let bgColor = '';

      if (target.includes(char) && char === target[index]) {
        bgColor = 'bg-green-500';
      } else if (target.includes(char) && char !== target[index]) {
        bgColor = 'bg-yellow-500';
      } else {
        bgColor = 'bg-gray-500';
      }

      return (
        <span
          key={index}
          className={`${bgColor} text-white font-bold py-1 px-2 rounded`}
        >
          {char.toUpperCase()}
        </span>
      );
    });
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col w-full md:w-[900px] gap-10 items-center text-4xl bg-zinc-900 p-10 rounded-2xl">
        <h1 className="font-bold text-center">Try to match the color</h1>
        <section className="flex w-full gap-4">
          <div className="w-2/3 h-80 rounded-2xl" style={{ backgroundColor: randomColor }} />
          <div className="w-2/3 h-80 rounded-2xl" style={{ backgroundColor: `#${color}` }} />
        </section>

        <div className="flex flex-col md:flex-row w-full justify-center gap-2">
          <input
            className='p-4 rounded-2xl text-black '
            value={inputColor}
            onChange={(e) => setInputColor(e.target.value.replace('#', ''))}
            type="text"
            placeholder="ff7f50"
          />
          <button
            className="bg-white p-4 rounded-2xl text-black disabled:cursor-no-drop disabled:opacity-60"
            onClick={handleTry}
            disabled={inputColor.length !== 6}
          >
            Try
          </button>
        </div>
        <p className="text-center">{message}</p>
        <div className="flex w-full justify-between">
          <button className="bg-black p-4 rounded-2xl text-white"
            onClick={() => {
              setRandomColor(generateRandomColor());
              setAttempts([])
            }}>
            New color
          </button>
          <button className="bg-white p-4 rounded-2xl text-black" onClick={resetGame}>
            Reset
          </button>
        </div>
        <div className="flex flex-col items-center">
          <p>Attemps</p>
          <ol>
            {attempts.map((attempt, index) => (
              <li key={index} className="flex gap-1 justify-center p-4 text-black rounded-lg">
                {verifyLetterPosition(attempt, randomColor)}
              </li>
            ))}
          </ol>
        </div>

        <p className="text-2xl font-semibold bg-slate-700 rounded-3xl p-4">Score: {score}</p>

      </main>
    </div>
  );
}
