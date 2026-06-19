// ⚠️ DO NOT SHARE THIS FILE — actual teams are stored here
export const TEAMS = [
  {
    id: 1,
    name: "Team 1",
    members: ["Member A1", "Member A2", "Member A3"],
  },
  {
    id: 2,
    name: "Team 2",
    members: ["Member B1", "Member B2", "Member B3"],
  },
  {
    id: 3,
    name: "Team 3",
    members: ["Member C1", "Member C2", "Member C3"],
  },
  {
    id: 4,
    name: "Team 4",
    members: ["Member D1", "Member D2", "Member D3"],
  },
  {
    id: 5,
    name: "Team 5",
    members: ["Member E1", "Member E2", "Member E3"],
  },
];

// All 15 members flat list — used for the fake shuffle animation
export const ALL_MEMBERS = TEAMS.flatMap((t) => t.members);
