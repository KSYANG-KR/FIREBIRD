# Firework Survival

Fun for people. A nightmare for birds.
You are a bird asleep on a bridge in a Seoul-like city. The fireworks festival starts, and the noise sends you into the night sky.
Fly just above the rooftops, along the river, over downtown and back to the river, and dodge the fireworks bursting right in front of you.

**Play (after publishing):** https://<id>.github.io/bird-vs-fireworks/
(PC Chrome or Edge recommended, keyboard only)

## How to play

- Choose a bird: Sparrow (quick & tiny), Magpie (all-rounder) or Pigeon (tough).
- One stage, about 180 seconds: river → left turn → avenue and downtown rooftops → rooftop turn → down to the river → over Bridge B → finale.
- **When a firework goes up, a dotted ring appears. About one second later it bursts. Fly outside the ring — or through the hole.**
  - The ring you see is exactly the danger area.
  - Outside the ring: PASS. Through the hole: THROUGH! (more points).
  - Small dotted ring = where you are, drawn on the burst plane (only for fireworks with a hole).
- Food: mint-ringed food heals HP. Cyan feathers give ROLL +1 (max 5). When full, you get points instead.
- Top 10 is saved only in this browser.

## Controls (keyboard only)

| Key | Action |
| --- | --- |
| Arrow keys / WASD | Move (you fly forward automatically) |
| Space | Roll (start with 3, max 5) |
| Esc / P | Pause |
| M | Sound on/off |

## Photosensitivity warning

Warning: flashing lights. If you have photosensitive epilepsy, don't play. Stop if you feel unwell.
There is no full-screen white flash, and big brightness changes are limited to 3 per second.
"Reduce Motion" turns off screen tilt, FOV kicks, shakes and slow motion (on by default if your OS asks for reduced motion).

## If hardware acceleration is off

The game shows a notice and lowers quality. Turn it on at chrome://settings/system and restart Chrome, or use Edge.

## Credits

- Code: three.js + Vite. Sound and music are synthesized with Web Audio. Fireworks and the city are code-made shapes and shaders. No real landmarks or real shop names.
- Third-party assets: facades, asphalt, paving (ambientCG, CC0 1.0), smoke (Kenney, CC0 1.0), sign font BvfSign (Black Han Sans subset, SIL OFL 1.1), title font Anton (SIL OFL 1.1, full text in `public/assets/fonts/OFL.txt`).
- **AI-generated assets:** the three bird 3D models and the window-interior / skyline images were made with AI tools (Higgsfield: GPT Image, Meshy) and then edited. They are NOT covered by the license of the code in this repository.
- Details: [`public/assets/CREDITS.txt`](public/assets/CREDITS.txt)

## Run locally

Needs [Node.js](https://nodejs.org). In this folder:

```
npm install      # once
npm run dev      # http://localhost:5173
```

- Build for publishing: `npm run build` (output in `docs/`). Preview the build: `npm run preview` (http://localhost:4173)
- On Windows PowerShell, if `npm` is blocked, use `npm.cmd`.
- Balance numbers live in `src/config.js`.

## 한국어 안내

- 게임 이름은 「파이어워크 서바이벌(Firework Survival)」이고, 화면 글자는 모두 영어입니다. 배경의 한글 간판은 서울 밤거리 그림이라 그대로 둡니다.
- 조작: 방향키/WASD 이동, Space 롤, Esc 일시정지, M 소리. 점선 원이 뜨면 약 1초 뒤 터지니 원 밖으로, 또는 가운데 구멍으로 피하세요.
- 광과민성 경고: 불꽃의 빛과 밝기 변화가 나옵니다. 빛에 민감하거나 발작을 겪은 적이 있다면 플레이하지 마세요.
