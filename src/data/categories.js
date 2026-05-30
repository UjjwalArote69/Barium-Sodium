// Category key → CSS variable name (defined in landing.css for dark/light themes).
export const CATEGORY_VAR = {
  alkali: "--c-alkali",
  alkaline: "--c-alkaline",
  transition: "--c-transition",
  post: "--c-post",
  metalloid: "--c-metalloid",
  nonmetal: "--c-nonmetal",
  halogen: "--c-halogen",
  noble: "--c-noble",
  lanthanide: "--c-lanthanide",
  actinide: "--c-actinide",
  unknown: "--c-unknown",
}

// Hex equivalents (used by Three.js scenes that can't read CSS vars off the page).
export const CATEGORY_HEX = {
  "--c-alkali": "#ff6b5b",
  "--c-alkaline": "#ffb547",
  "--c-transition": "#6db5ff",
  "--c-post": "#36e5c7",
  "--c-metalloid": "#b5e04a",
  "--c-nonmetal": "#ffe45e",
  "--c-halogen": "#ff5ba8",
  "--c-noble": "#b47aff",
  "--c-lanthanide": "#ff8fa3",
  "--c-actinide": "#ff8c42",
  "--c-unknown": "#6b7280",
}
