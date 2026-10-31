// Lunar Hollow: fixed case file, no model required.
// The answer is hard-coded so the game is fair and works offline.

const CLUES = {
  chem: {
    text: "Jar label: 'Do not mix. Vinegar + baking soda = trouble.' The label also lists a second jar missing from the shelf photo.",
    found: false,
  },
  bio: {
    text: "Pressed leaf: a maple leaf dated 'October', but it has no autumn colour. It was picked in early spring.",
    found: false,
  },
  math: {
    text: "HTML comment on the front page: '2, 3, 5, 7, 11, 13' next to a locked-page number. The pattern points to the password.",
    found: false,
  },
  hist: {
    text: "Guestbook entry: Otto says Ren posted 'on Tuesday'. The site's own archive shows the last post was on Thursday, March 14.",
    found: false,
  },
};

// Password for the archive: primes after 10 are 11, 13, 17, so the 3rd is 17.
const PASSWORD = "17";

let cluesFound = 0;

function show(id) {
  ["home", "case", "guestbook", "links"].forEach(function (s) {
    const el = document.getElementById(s);
    if (el) el.style.display = s === id ? "block" : "none";
  });
}

function addNote(text) {
  const notes = document.getElementById("notes");
  if (cluesFound === 0) notes.innerHTML = "";
  const p = document.createElement("p");
  p.textContent = "- " + text;
  notes.appendChild(p);
}

function question(key) {
  const log = document.getElementById("log2");
  const clue = CLUES[key];
  if (!clue) return;
  log.textContent = "Questioning suspect...";
  setTimeout(function () {
    log.textContent = clue.text;
    if (!clue.found) {
      clue.found = true;
      cluesFound += 1;
      document.getElementById("cluecount").textContent = String(cluesFound);
      addNote(clue.text);
    }
    document.body.classList.remove("flash");
    void document.body.offsetWidth;
    document.body.classList.add("flash");
  }, 400);
}

function tryPw() {
  const input = document.getElementById("pw").value.trim();
  const archive = document.getElementById("archive");
  const log = document.getElementById("log");
  if (input === PASSWORD) {
    archive.style.display = "block";
    log.textContent = "Access granted.";
  } else {
    log.textContent = "ACCESS DENIED. The moon is not full yet.";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const archive = document.getElementById("archive");
  if (archive) archive.style.display = "none";
  // Hidden clue: the sequence of primes is a visible hint in the HTML comment.
  // Players who check the source find the password pattern.
});