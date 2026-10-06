// 화면 그리기 준비: WebGL 렌더러, 톤매핑(밝은 불꽃이 하얗게 타지 않게), 블룸(빛 번짐) 후처리, 창 크기 변화 처리.
// 장면은 HDR(1 넘는 밝기)로 그리고, 블룸은 1.0 넘는 빛(불꽃)에만 걸린다. 마지막 출력 단계에서 톤매핑한다.
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { RENDER } from './config.js';

export function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
}

const TONE = { ACESFilmic: THREE.ACESFilmicToneMapping, AgX: THREE.AgXToneMapping };

// 그래픽 카드 이름(WebGL 렌더러 문자열). 가속이 꺼져 있으면 SwiftShader·Basic Render(WARP) 같은 소프트웨어 이름이 나온다.
export function detectGpu() {
  let name = '';
  try {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl2') || c.getContext('webgl');
    if (gl) {
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      name = String((ext && gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)) || gl.getParameter(gl.RENDERER) || '');
      const lose = gl.getExtension('WEBGL_lose_context');
      if (lose) lose.loseContext();
    }
  } catch {
    name = '';
  }
  return { name, software: !!name && RENDER.softwareRe.test(name) };
}

export class Renderer {
  constructor(container, settings) {
    this.settings = settings;
    // 가속 꺼짐이면 저사양을 자동으로 켠다(블룸 끔·불씨 절반·MSAA 0·내부 해상도 가로 1280 이하). 저장은 하지 않는다.
    const gpu = detectGpu();
    this.gpuName = gpu.name;
    this.software = gpu.software;
    if (this.software) settings.lowSpec = true;
    this.renderer = new THREE.WebGLRenderer({ antialias: !this.software, powerPreference: 'high-performance' });
    this.renderer.toneMapping = TONE[RENDER.toneMapping] ?? THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = RENDER.exposure;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.shadowMap.enabled = false; // 그림자 없음(성능 예산)
    this.renderer.setClearColor(0x000000, 1);
    container.appendChild(this.renderer.domElement);
    this.canvas = this.renderer.domElement;

    // HDR(반정밀 실수) + 여러 번 표본(계단 현상 줄이기) 렌더 타깃
    const rt = new THREE.WebGLRenderTarget(256, 256, { type: THREE.HalfFloatType, samples: this.software ? 0 : RENDER.msaaSamples });
    this.composer = new EffectComposer(this.renderer, rt);
    this.renderPass = new RenderPass(new THREE.Scene(), new THREE.PerspectiveCamera());
    // UnrealBloomPass 는 내부 계산을 화면의 절반 해상도에서 시작한다(성능).
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(256, 256),
      RENDER.bloom.strength,
      RENDER.bloom.radius,
      RENDER.bloom.threshold,
    );
    this.outputPass = new OutputPass(); // 톤매핑 + sRGB 변환
    this.composer.addPass(this.renderPass);
    this.composer.addPass(this.bloomPass);
    this.composer.addPass(this.outputPass);

    this.onResize = [];
    window.addEventListener('resize', () => this.resize());
    this.resize();
  }

  get pixelRatio() {
    const cap = this.settings.lowSpec ? RENDER.lowSpecPixelRatio : RENDER.maxPixelRatio;
    let pr = Math.min(window.devicePixelRatio || 1, cap);
    // 소프트웨어 그리기 + 저사양: 내부 해상도 가로를 1280 이하로
    if (this.software && this.settings.lowSpec) pr = Math.min(pr, RENDER.softwareMaxWidth / Math.max(1, window.innerWidth));
    return pr;
  }

  resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const pr = this.pixelRatio;
    this.renderer.setPixelRatio(pr);
    this.renderer.setSize(w, h);
    this.composer.setPixelRatio(pr);
    this.composer.setSize(w, h);
    this.width = w;
    this.height = h;
    for (const fn of this.onResize) fn(w, h, pr);
  }

  // 블룸을 쓰면 후처리 경로, 아니면 바로 그린다(이때는 재질마다 톤매핑).
  // overlay(8차): bloom·톤매핑이 끝난 화면 위에 깊이 검사 없이 덧그리는 장면(낙하산 불꽃 알 예고) — 폭발 불빛에 묻히지 않게
  render(scene, camera, allowBloom = true, overlay = null) {
    const bloom = allowBloom && this.settings.bloom && !this.settings.lowSpec;
    if (bloom) {
      this.renderPass.scene = scene;
      this.renderPass.camera = camera;
      this.composer.render();
    } else {
      this.renderer.render(scene, camera);
    }
    if (overlay) {
      const r = this.renderer;
      const ac = r.autoClear;
      r.autoClear = false;
      r.setRenderTarget(null);
      r.render(overlay, camera);
      r.autoClear = ac;
    }
  }
}
