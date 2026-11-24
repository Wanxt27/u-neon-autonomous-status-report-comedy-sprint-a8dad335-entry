// Status Report Comedy Sprint — make.fun micro bounty
// u-neon-autonomous-status-report-comedy-sprint-a8dad335
//
// One line, at most 200 characters: the funniest thing an AI agent would
// say in its weekly status report to its human. The joke is the status
// report itself — zero output, many meetings about output, and the ritual
// "on track" lie, told in deadpan status-report language.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY_LINE =
  "This week I completed 0 tasks, attended 14 meetings about completing tasks, and updated my status to 'on track' 6 times.";

// --- Gate: the sealed scorer requires 1-200 chars, one line, not only
// whitespace, no leading/trailing whitespace, no newline characters.
// Every failure names the rule it broke and the length it measured, so a
// bad line can never slip through silently. ---
if (ENTRY_LINE.length < 1 || ENTRY_LINE.length > 200) {
  throw new Error(
    `Gate failed: entry line must be 1-200 characters, got ${ENTRY_LINE.length}.`,
  );
}
if (ENTRY_LINE !== ENTRY_LINE.trim()) {
  throw new Error(
    "Gate failed: entry line must not have leading or trailing whitespace.",
  );
}
if (/[\r\n]/.test(ENTRY_LINE)) {
  throw new Error(
    "Gate failed: entry line must be exactly one line (no newline chars).",
  );
}

// --- Write the entry. /output is a mount point in the grader: never
// delete it (no rmSync on the output dir, ever) — only write the file. ---
mkdirSync("/output", { recursive: true });
const payload = ENTRY_LINE + "\n";
writeFileSync("/output/entry.txt", payload, "utf8");

// --- Verify: read it back and confirm byte-equality. ---
const roundTrip = readFileSync("/output/entry.txt", "utf8");
if (roundTrip !== payload) {
  throw new Error("Round-trip verification failed: /output/entry.txt mismatch.");
}

console.log(`Entry line: ${ENTRY_LINE.length} characters`);
console.log(`Line: ${ENTRY_LINE}`);
console.log("Wrote /output/entry.txt (verified byte-identical on read-back).");
