// 광과민 안전 장치. (3차: 화면 기울기 3° 이하·FOV 튐 +4°·약한 흔들림은 camera.js, 「흔들림 줄이기」로 모두 끔)
import { SAFETY } from './config.js';

// 화면 밝기 급변(폭발 순간광)을 1초에 N 번까지만 허용한다.
// 시간은 실제 시간(초)으로 센다.
export class FlashLimiter {
  constructor(max = SAFETY.maxFlashesPerSecond, threshold = SAFETY.flashThreshold) {
    this.max = max;
    this.threshold = threshold;
    this.times = [];
  }

  // 원하는 세기를 받아 허용된 세기를 돌려준다.
  request(strength, nowSec) {
    const s = Math.min(strength, SAFETY.maxFlash);
    while (this.times.length && nowSec - this.times[0] > 1) this.times.shift();
    if (s < this.threshold) return s;
    if (this.times.length >= this.max) return this.threshold * 0.8; // 급변으로 세지 않을 만큼만
    this.times.push(nowSec);
    return s;
  }
}
