#!/usr/bin/env node

const fs = require('fs');
const max = 13 * 1024;

fs.stat('game.zip', (err, stats) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  const bytes = stats.size;
  const percent = Math.round((bytes * 100) / max);
  console.log(`${bytes} bytes (used ${percent}%)`);

  if (bytes > max) {
    console.error('zip file too big!');
    process.exit(1);
  }
});
