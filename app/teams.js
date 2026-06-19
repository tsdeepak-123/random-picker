// internal — do not share
export const FIXED_TEAMS = [
  { id: 1, members: ["Saood", "Deepak", "Keerthana"] },
  { id: 2, members: ["Rithik", "Rifana", "Musthaq"] },
  { id: 3, members: ["Amrutha", "Bency", "Ajanya"] },
  { id: 4, members: ["Mubashir", "Nandhana", "Shalu"] },
  { id: 5, members: ["Nandhalal", "Musthafa", "Diya"] },
];

// Labels shuffled randomly at result time — reassigned in resolveTeams
const LABELS = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon"];

// Alternate names / nicknames that bypass fuzzy match and go straight to a team
const ALIASES = {
  munna: 5,      // same person as Musthafa
  musthafa: 5,
};

// Levenshtein edit distance — counts insertions, deletions, substitutions
function editDistance(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function norm(str) {
  return str.toLowerCase().trim().replace(/\s+/g, "");
}

// Flat list of all stored members with their team id
const ALL_STORED = FIXED_TEAMS.flatMap((t) =>
  t.members.map((m) => ({ stored: m, teamId: t.id }))
);

export function resolveTeams(inputNames) {
  const matched = {}; // teamId → members[]

  inputNames.forEach((typed) => {
    const normalTyped = norm(typed);

    // Check alias map first (handles nicknames / alternate spellings)
    const aliasTeamId = ALIASES[normalTyped];
    if (aliasTeamId !== undefined) {
      if (!matched[aliasTeamId]) matched[aliasTeamId] = [];
      matched[aliasTeamId].push(typed);
      return;
    }

    // Fall back to fuzzy match against stored names
    let best = null;
    let bestDist = Infinity;
    ALL_STORED.forEach(({ stored, teamId }) => {
      const d = editDistance(normalTyped, norm(stored));
      if (d < bestDist) {
        bestDist = d;
        best = { teamId };
      }
    });

    if (best && bestDist <= 2) {
      if (!matched[best.teamId]) matched[best.teamId] = [];
      matched[best.teamId].push(typed);
    }
  });

  // Shuffle label order so it looks random every time
  const shuffledLabels = [...LABELS].sort(() => Math.random() - 0.5);

  return FIXED_TEAMS
    .map((ft, idx) =>
      matched[ft.id]
        ? { id: ft.id, name: shuffledLabels[idx], members: matched[ft.id] }
        : null
    )
    .filter(Boolean);
}
