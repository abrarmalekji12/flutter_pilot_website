// Parses Cloudflare Pages `_redirects` lines: "<from> <to> [status]".
const fs = require("fs");

function readRedirects(file) {
  return fs
    .readFileSync(file, "utf8")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => {
      const [from, to, status = "302"] = line.split(/\s+/);
      return { from, to, status: Number(status) };
    });
}

module.exports = { readRedirects };
