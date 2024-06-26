// Copyright (c) 2023 Michael Kolesidis <michael.kolesidis@gmail.com>
// Licensed under the GNU Affero General Public License v3.0.
// https://www.gnu.org/licenses/gpl-3.0.html

// Check if the "crypto" module is available
let crypto: any;

try {
  crypto = require("node:crypto");
} catch (err) {
  console.error(
    "WARNING: crypto support is disabled and Math.random() will be used instead!"
  );
}

/*
 * API endpoint to fetch a scratchcard.
 *
 * Generates an array of values for the scratchcard.
 * Each value represents the reward amount for a specific scratch area.
 */
export function getValues(): (50 | 1| 5 | 10 | 0)[] {
  // Array to store the generated values
  const values: (50 | 1 | 5 | 10 | 0)[] = [];

  // Generate values for each position on the scratchcard
  for (let i = 0; i < 4; i++) {
    let randomNumber: number;

    // Use crypto library for random number generation if available
    if (crypto && crypto.randomBytes) {
      const randomBytes = crypto.randomBytes(4);
      randomNumber = randomBytes.readUInt32BE(0) / Math.pow(2, 32);
    } else {
      // Fallback to Math.random() if crypto support is disabled
      randomNumber = Math.random();
    }

// Value  Probability
    // 1      50%
    // 0      30%
    // 5     15%
    // 10     4%
    // 50    1%

    // Assign a reward value based on the generated random number
    if (randomNumber < 0.5) {
      values.push(0);
    } else if (randomNumber < 0.8) {
      values.push(5);
    } else if (randomNumber < 0.95) {
      values.push(10);
    } else if (randomNumber < 0.99) {
      values.push(1);
    } else {
      values.push(50);
    }
  }

  return values;
}
