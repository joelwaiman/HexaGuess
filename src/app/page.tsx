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
    if (attempts.length === 5) {
      setMessage('Has alcanzado el límite de intentos. El color correcto era ' + randomColor);
      return;
    }

    if (inputColor.length !== 6) {
      setMessage('Solo 6 caracteres');
      return;
    }

    setColor(inputColor);
    setAttempts(prev => [...prev, inputColor])

    if (inputColor.toUpperCase() === randomColor.substring(1).toUpperCase()) {
      setMessage('¡Felicidades! Has acertado el color.');
      setScore(prev => prev + 10);

    } else {
      const remainingAttempts = 5 - attempts.length - 1;
      if (remainingAttempts > 1) {
        setMessage(`Intento fallido. Te quedan ${remainingAttempts} intentos`);
      } else if (remainingAttempts === 1) {
        setMessage('Cuidado, te queda el último intento');
      } else {
        setMessage('Se acabaron los intentos. El color correcto era ' + randomColor);
      }
      setInputColor('');
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
        result.push(
          <span key={i} className="hidden"></span>
        );
      }
    }

    for (let i = 0; i < inputChars.length; i++) {
      if (result[i].props.className === "hidden") {
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
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-center">Intenta adivinar el color</h1>
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
            disabled={inputColor.length !== 6 || attempts.length >= 5 || inputColor.toUpperCase() === randomColor.substring(1).toUpperCase()}
          >
            Intentar
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
            Nuevo color
          </button>
          <button className="bg-red-600 p-3 rounded-xl text-white text-lg hover:bg-red-700 transition-colors"
            onClick={resetGame}>
            Reiniciar
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

        <p className="text-2xl font-semibold bg-gray-700 rounded-full px-6 py-2">Puntaje: {score}</p>
      </main>
    </div>
  );
}