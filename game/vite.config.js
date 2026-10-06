import { defineConfig } from 'vite';

// base './' : GitHub Pages 하위 주소(/bird-vs-fireworks/)에서도 파일 경로가 깨지지 않게 한다.
// outDir 'docs' : 공개 때 Pages 를 「main 브랜치 /docs」로 지정한다. docs/ 는 빌드 결과 전용(빌드마다 비워진다).
// _backups/ : 이전 판 백업 폴더. 개발 서버가 감시·의존성 검색하지 않게 뺀다(빌드는 index.html 에서 출발하므로 포함되지 않는다).
export default defineConfig({
  base: './',
  server: {
    watch: { ignored: ['**/_backups/**', '**/docs/**'] },
  },
  optimizeDeps: {
    entries: ['index.html'],
  },
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000, // three.js 가 커서(약 650KB, 압축 시 약 170KB) 기본 경고 기준을 올림
  },
});
