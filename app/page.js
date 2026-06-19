"use client";

import { useState, useEffect, useRef } from "react";
import { TEAMS, ALL_MEMBERS } from "./teams";

const PHASES = {
  IDLE: "idle",
  SHUFFLING: "shuffling",
  REVEALING: "revealing",
  DONE: "done",
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Home() {
  const [phase, setPhase] = useState(PHASES.IDLE);
  const [rollingNames, setRollingNames] = useState([]);
  const [revealedTeams, setRevealedTeams] = useState([]);
  const [currentReveal, setCurrentReveal] = useState(null);
  const intervalRef = useRef(null);

  function startPicking() {
    setRevealedTeams([]);
    setCurrentReveal(null);
    setPhase(PHASES.SHUFFLING);

    let ticks = 0;
    const totalTicks = 40;
    intervalRef.current = setInterval(() => {
      setRollingNames(shuffle(ALL_MEMBERS).slice(0, 6));
      ticks++;
      if (ticks >= totalTicks) {
        clearInterval(intervalRef.current);
        revealTeams();
      }
    }, 80);
  }

  function revealTeams() {
    setPhase(PHASES.REVEALING);
    setRollingNames([]);

    let index = 0;
    function revealNext() {
      if (index >= TEAMS.length) {
        setPhase(PHASES.DONE);
        setCurrentReveal(null);
        return;
      }
      setCurrentReveal(TEAMS[index]);
      setTimeout(() => {
        setRevealedTeams((prev) => [...prev, TEAMS[index]]);
        setCurrentReveal(null);
        index++;
        setTimeout(revealNext, 600);
      }, 1800);
    }
    revealNext();
  }

  useEffect(() => () => clearInterval(intervalRef.current), []);

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-start py-10 px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-1">
          🎲 MCA 3rd Sem — Mini Project
        </h1>
        <p className="text-gray-400 text-lg">Random Team Selection</p>
      </div>

      {/* Start Button */}
      {phase === PHASES.IDLE && (
        <button
          onClick={startPicking}
          className="bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all text-white font-bold text-xl px-10 py-4 rounded-2xl shadow-lg shadow-indigo-900"
        >
          ✨ Start Random Pick
        </button>
      )}

      {/* Rolling Names Animation */}
      {phase === PHASES.SHUFFLING && (
        <div className="flex flex-col items-center gap-3 mt-6 w-full max-w-sm">
          <p className="text-indigo-400 font-semibold text-lg animate-pulse">
            🔀 Shuffling members...
          </p>
          <div className="bg-gray-900 border border-indigo-700 rounded-2xl w-full px-6 py-4 flex flex-col gap-2">
            {rollingNames.map((name, i) => (
              <div
                key={i}
                className="text-center text-white font-bold text-lg py-1 px-3 rounded-lg bg-indigo-900/40 animate-pulse"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Current Team Being Revealed */}
      {phase === PHASES.REVEALING && currentReveal && (
        <div className="mt-8 flex flex-col items-center gap-4">
          <p className="text-yellow-400 text-xl font-bold animate-pulse">
            🎯 Selecting...
          </p>
          <div className="bg-yellow-500/10 border-2 border-yellow-400 rounded-2xl px-8 py-5 text-center shadow-xl shadow-yellow-900/30 min-w-[260px]">
            <p className="text-yellow-300 font-extrabold text-2xl mb-3">
              {currentReveal.name}
            </p>
            <div className="flex flex-col gap-1">
              {currentReveal.members.map((m, i) => (
                <span
                  key={i}
                  className="bg-yellow-400/20 text-yellow-100 rounded-lg px-3 py-1 font-semibold text-base"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Revealed Teams Grid */}
      {revealedTeams.length > 0 && (
        <div className="mt-10 w-full max-w-5xl">
          {phase === PHASES.DONE && (
            <h2 className="text-center text-2xl font-bold text-green-400 mb-6">
              ✅ All Teams Selected!
            </h2>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {revealedTeams.map((team) => (
              <div
                key={team.id}
                className="bg-gray-900 border border-indigo-800 rounded-2xl px-6 py-5 shadow-lg"
              >
                <h3 className="text-indigo-400 font-extrabold text-lg mb-3 border-b border-indigo-900 pb-2">
                  🏷️ {team.name}
                </h3>
                <ul className="flex flex-col gap-2">
                  {team.members.map((m, i) => (
                    <li
                      key={i}
                      className="text-white font-medium text-base flex items-center gap-2"
                    >
                      <span className="text-indigo-500 text-xs">▶</span> {m}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Restart */}
      {phase === PHASES.DONE && (
        <button
          onClick={() => setPhase(PHASES.IDLE)}
          className="mt-10 text-gray-500 hover:text-gray-300 text-sm underline transition"
        >
          Reset & Pick Again
        </button>
      )}
    </main>
  );
}
