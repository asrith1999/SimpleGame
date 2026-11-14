# Simple Pong Game

Browser canvas game by Asrith. Move the mouse or drag a finger over the court
to control the left paddle; the computer controls the right. First to 7 wins.
Pause/resume and New game controls are included. The court scales for mobile
screens and movement is adjusted for browser frame rate.

Open `index.html`, or run `python -m http.server 8080` in this folder and visit
http://localhost:8080. No dependencies, backend, accounts or database are needed.

For hosting, publish `index.html`, `game.js` and `style.css` together on a
static host, or enable GitHub Pages from the repository's main branch/root.

Hosted private preview: https://asrith-pong-1114.muhammedasrith.chatgpt.site
(sign in with the owning ChatGPT account).

Vercel deployment: https://asrith-pong.vercel.app

Syntax check: `node --check game.js`. Gameplay and pointer controls also need
real-browser verification. This is a single-player Pong game; the separate
IRON RIFT repository contains the network multiplayer project.
