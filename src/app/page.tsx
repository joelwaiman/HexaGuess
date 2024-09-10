'use client'

import { useState } from "react";

export default function Home() {
  const [randomColor, setRandomColor] = useState<string>(generateRandomColor());
  const [color, setColor] = useState<string>('');
  const [inputColor, setInputColor] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(5);
  const [message, setMessage] = useState<string>('');
  const [score, setScore] = useState<number>(0);

  function generateRandomColor(): string {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  }

  function handleTry(): void {
    if (attempts < 1) {
      setMessage('Has alcanzado el límite de intentos.');
      return;
    }

    setColor(inputColor);

    if (inputColor.toLowerCase() === randomColor.substring(1).toLowerCase()) {
      setMessage('¡Felicidades! Has acertado el color.');
      setScore(prev => prev + 10);
    } else {
      setAttempts(attempts - 1);
      setMessage(`Intento incorrecto. Te quedan ${attempts} oportunidades.`);
    }
  }

  function resetGame(): void {
    setRandomColor(generateRandomColor());
    setColor('');
    setInputColor('');
    setAttempts(5);
    setScore(0)
    setMessage('');
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col w-full md:w-[900px] gap-10 items-center text-4xl bg-slate-900 p-10 rounded-2xl">
        <h1 className="font-bold text-center">Try to match the color. Good luck</h1>
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
            className="bg-white p-4 rounded-2xl text-black"
            onClick={handleTry}
          >
            Try
          </button>
        </div>
        <p className="text-center">{message}</p>
        <div className="flex w-full justify-between">
          <button className="bg-black p-4 rounded-2xl text-white" onClick={() => setRandomColor(generateRandomColor())}>
            New color
          </button>
          <button className="bg-white p-4 rounded-2xl text-black" onClick={resetGame}>
            Reset
          </button>
        </div>
        <p className="text-2xl font-semibold bg-slate-700 rounded-3xl p-4">Score: {score}</p>

      </main>
    </div>
  );
}
