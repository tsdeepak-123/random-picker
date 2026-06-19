"use client";

import { useState, useRef } from "react";
import { resolveTeams } from "./teams";

const PHASES = { INPUT: "input", SHUFFLING: "shuffling", DONE: "done" };

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const FEATURES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Instant Results",
    desc: "Live shuffle animation and team reveal in seconds.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "100% Private",
    desc: "Nothing is stored or sent anywhere. Runs in your browser.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Flexible Settings",
    desc: "Choose team count and members per team before generating.",
  },
];

function OptionPill({ value, selected, onClick, label }) {
  return (
    <button
      onClick={() => onClick(value)}
      className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all touch-manipulation ${
        selected
          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
          : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600"
      }`}
    >
      {label ?? value}
    </button>
  );
}

export default function Home() {
  const [phase, setPhase] = useState(PHASES.INPUT);
  const [inputValue, setInputValue] = useState("");
  const [members, setMembers] = useState([]);
  const [teamCount, setTeamCount] = useState(null);
  const [membersPerTeam, setMembersPerTeam] = useState(null);
  const [rollingNames, setRollingNames] = useState([]);
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState("");
  const intervalRef = useRef(null);
  const inputRef = useRef(null);

  function addMember() {
    const name = inputValue.trim();
    if (!name) return;
    if (members.map((m) => m.toLowerCase()).includes(name.toLowerCase())) {
      setError("This name has already been added.");
      return;
    }
    setMembers((prev) => [...prev, name]);
    setInputValue("");
    setError("");
    inputRef.current?.focus();
  }

  function removeMember(name) {
    setMembers((prev) => prev.filter((m) => m !== name));
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") addMember();
  }

  function startPicking() {
    if (!teamCount || !membersPerTeam) {
      setError("Please select number of teams and members per team.");
      return;
    }
    if (members.length < 2) {
      setError("Please add at least 2 members to generate teams.");
      return;
    }
    setError("");
    setPhase(PHASES.SHUFFLING);
    let ticks = 0;
    intervalRef.current = setInterval(() => {
      setRollingNames(shuffle(members).slice(0, Math.min(6, members.length)));
      ticks++;
      if (ticks >= 38) {
        clearInterval(intervalRef.current);
        // shuffle display order so teams appear in different positions each time
        setTeams(shuffle(resolveTeams(members)));
        setPhase(PHASES.DONE);
      }
    }, 90);
  }

  function reset() {
    setPhase(PHASES.INPUT);
    setTeams([]);
    setRollingNames([]);
    setMembers([]);
  }

  const totalExpected = teamCount && membersPerTeam ? teamCount * membersPerTeam : null;

  return (
    <main>

      {/* ── Hero ── */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
          <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            Free &amp; Anonymous
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Random Team Generator
          </h1>
          <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Add your members, configure team settings, and get balanced teams in seconds — no sign-up, no tracking.
          </p>
        </div>
      </section>

      {/* ── Feature Cards ── */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white rounded-xl border border-slate-200 p-5 flex gap-4 items-start shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  {f.icon}
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">{f.title}</p>
                  <p className="text-slate-500 text-sm mt-1 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Picker ── */}
      <section className="py-10 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">

          {/* ── Input Phase ── */}
          {phase === PHASES.INPUT && (
            <div className="flex flex-col gap-5">

              {/* Settings Card */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6">
                <h2 className="text-base font-bold text-slate-900 mb-5">Team Settings</h2>

                <div className="flex flex-col gap-5">
                  {/* Number of Teams */}
                  <div>
                    <p className="text-sm font-semibold text-slate-600 mb-2.5">Number of Teams</p>
                    <div className="flex flex-wrap gap-2">
                      {[2, 3, 4, 5, 6].map((n) => (
                        <OptionPill key={n} value={n} selected={teamCount === n} onClick={setTeamCount} />
                      ))}
                    </div>
                  </div>

                  {/* Members per Team */}
                  <div>
                    <p className="text-sm font-semibold text-slate-600 mb-2.5">Members per Team</p>
                    <div className="flex flex-wrap gap-2">
                      {[2, 3, 4, 5, 6].map((n) => (
                        <OptionPill key={n} value={n} selected={membersPerTeam === n} onClick={setMembersPerTeam} />
                      ))}
                    </div>
                  </div>

                  {/* Summary pill */}
                  {totalExpected && (
                    <div className="bg-slate-50 rounded-xl px-4 py-3 flex items-center justify-between">
                      <span className="text-sm text-slate-500">Expected members</span>
                      <span className="text-sm font-bold text-slate-800">
                        {teamCount} teams × {membersPerTeam} = <span className="text-blue-600">{totalExpected} members</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Add Members Card */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 flex flex-col gap-5">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Add Members</h2>
                  <p className="text-slate-500 text-sm mt-1">Type each name and press Enter or tap Add.</p>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Enter member name..."
                      className="flex-1 min-w-0 border border-slate-300 rounded-lg px-4 py-3 text-base font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={addMember}
                      className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-5 py-3 rounded-lg font-semibold text-sm transition-colors whitespace-nowrap touch-manipulation"
                    >
                      Add
                    </button>
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>

                {/* Progress bar */}
                {totalExpected && (
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        Progress
                      </p>
                      <p className="text-xs font-bold text-slate-700">
                        {members.length} / {totalExpected}
                      </p>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((members.length / totalExpected) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Members List */}
                {members.length > 0 && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-semibold text-slate-700">
                        Members&nbsp;
                        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">
                          {members.length}
                        </span>
                      </p>
                      <button
                        onClick={() => setMembers([])}
                        className="text-xs text-slate-400 hover:text-red-500 transition-colors py-1"
                      >
                        Clear all
                      </button>
                    </div>
                    <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
                      {members.map((name, i) => (
                        <div key={i} className="flex justify-between items-center px-4 py-3 hover:bg-slate-50 transition-colors">
                          <span className="text-sm font-medium text-slate-800 flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center shrink-0">
                              {i + 1}
                            </span>
                            {name}
                          </span>
                          <button
                            onClick={() => removeMember(name)}
                            className="text-slate-300 hover:text-red-400 text-xl leading-none font-bold transition-colors p-1 touch-manipulation"
                            aria-label={`Remove ${name}`}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={startPicking}
                  disabled={members.length === 0}
                  className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold text-base py-4 rounded-xl transition-colors shadow-sm touch-manipulation"
                >
                  Generate Teams
                </button>
              </div>
            </div>
          )}

          {/* ── Shuffling Animation ── */}
          {phase === PHASES.SHUFFLING && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 flex flex-col items-center gap-6">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
                <p className="text-slate-500 font-semibold text-sm uppercase tracking-widest">
                  Shuffling members...
                </p>
              </div>
              <div className="w-full max-w-xs border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
                {rollingNames.map((name, i) => (
                  <div key={i} className="px-5 py-3 text-sm font-semibold text-center text-slate-700 animate-pulse">
                    {name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Results ── */}
          {phase === PHASES.DONE && (
            <div className="flex flex-col gap-8">

              {/* Heading */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 mb-4">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  Teams are ready
                </h2>
                <p className="text-slate-500 text-sm mt-2">
                  {teams.length} teams · {teams.reduce((s, t) => s + t.members.length, 0)} members
                </p>
              </div>

              {/* Team Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {teams.map((team) => (
                  <div key={team.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-5 pt-5 pb-4 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                        {team.name}
                      </span>
                      <span className="text-xs font-medium text-slate-400">
                        {team.members.length} members
                      </span>
                    </div>
                    <ul className="px-5 py-3 flex flex-col gap-1">
                      {team.members.map((m, i) => (
                        <li key={i} className="flex items-center gap-3 py-2">
                          <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center shrink-0 uppercase">
                            {m.charAt(0)}
                          </span>
                          <span className="text-sm font-semibold text-slate-800">{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Start Over */}
              <div className="flex justify-center">
                <button
                  onClick={reset}
                  className="flex items-center gap-2 text-slate-500 hover:text-blue-600 text-sm font-semibold transition-colors py-2 px-4 touch-manipulation"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/>
                  </svg>
                  Start Over
                </button>
              </div>

            </div>
          )}

        </div>
      </section>

    </main>
  );
}
