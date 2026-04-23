# 포트폴리오 모던 디자인 개편 플랜

## Context

사용자가 제공한 참고 이미지(Jensen Software Developer 포트폴리오)를 기반으로 포트폴리오 웹사이트를 모던하고 세련된 다크 테마로 전면 개편한다. 현재는 라이트모드가 기본값이고 Hero가 텍스트 중앙 정렬 1컬럼이나, 참고 이미지처럼 다크모드 기본, Hero 2컬럼 레이아웃, Glassmorphism 카드, 배경 Glow Orb 효과로 개편한다.

---

## 변경 파일

| 파일 | 규모 | 내용 |
|------|------|------|
| `portfolio-resume/js/main.js` | 소 | 다크모드 기본값 + Nav glass 로직 |
| `portfolio-resume/index.html` | 대 | FOUC 방지 스크립트, Hero 2컬럼 재설계, 카드 클래스, 컨테이너 통일 |
| `portfolio-resume/css/custom.css` | 중 | Hero 배경효과, glassmorphism, glow, gradient border 추가 |

---

## Phase 1 — main.js 수정 (다크모드 기본값)

### 1-1. `initDarkMode()` 로직 변경
```js
// 변경 전
const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

// 변경 후: 저장값 없으면 무조건 다크모드가 기본
const isDark = savedTheme ? savedTheme === 'dark' : true;
```

### 1-2. `handleNavScroll()` — 다크 glass 클래스로 교체
기존 `bg-white/80 dark:bg-slate-900/80` 계열 클래스를 `navbar-glass` 커스텀 클래스로 교체하여 JS 클래스 토글만으로 제어한다.

---

## Phase 2 — index.html `<head>` 수정

### 2-1. FOUC 방지 인라인 스크립트 (Tailwind CDN 보다 앞에 배치)
```html
<script>
  (function() {
    const saved = localStorage.getItem('theme');
    const isDark = saved ? saved === 'dark' : true; // 기본값 다크
    if (isDark) document.documentElement.classList.add('dark');
  })();
</script>
```

### 2-2. Tailwind config 색상 토큰 확장
```js
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary:          '#6366F1',
        'primary-light':  '#818cf8',   // 다크 배경용 밝은 버전
        secondary:        '#8B5CF6',
        'secondary-light':'#a78bfa',
        accent:           '#06B6D4',
        'accent-light':   '#22d3ee',
      },
      fontFamily: {
        sans: ['Pretendard', 'Noto Sans KR', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    }
  }
}
```

### 2-3. body 클래스 — 라이트 기본 제거
```html
<!-- 변경 전 -->
<body class="bg-slate-50 dark:bg-[#0F172A] text-slate-800 dark:text-slate-200 ...">

<!-- 변경 후 -->
<body class="bg-[#0F172A] text-slate-200 font-sans transition-colors duration-300">
```
라이트모드 지원은 `.light` 또는 `:not(.dark)` 선택자로 custom.css에서만 처리한다.

---

## Phase 3 — Hero 섹션 재설계 (2컬럼)

### 레이아웃 구조 변경
```
[현재] 텍스트 중앙 정렬 1컬럼
[변경] grid grid-cols-1 lg:grid-cols-2 (텍스트 좌 | 이미지 우)
```

### 배경 레이어 (3레이어 합성)
1. `.hero-mesh-bg` — 방사형 그라디언트 (primary/cyan/violet 혼합)
2. `.hero-orb-primary/secondary/accent` — Blur 처리된 glowing orbs (float 애니메이션)
3. `.hero-grid-bg` — 60px 간격 서브틀 격자 (opacity 3%)

### 왼쪽 컬럼 (텍스트)
- 상태 뱃지 (Open to Work) — `bg-primary/10 border border-primary/20 backdrop-blur-sm`
- h1: "안녕하세요," + **김개발** (`.hero-name-gradient`) + "입니다"
- 타이핑 애니메이션 (기존 로직 유지)
- CTA 버튼: "연락하기" (btn-glow-primary) + "이력서 다운로드" (glass border 스타일)
- 소셜 아이콘: `bg-white/5 border border-white/10 hover:bg-primary/20` dark glass 스타일

### 오른쪽 컬럼 (이미지)
- `.hero-image-container` 로 감싼 프로필 이미지
- `hero-image-glow` — 이미지 주변 radial glow
- `hero-gradient-border` — 회전하는 gradient 테두리 (CSS 애니메이션)
- `.hero-dots-pattern` — 오른쪽 하단 점 패턴 장식
- `.hero-floating-badge` — 떠다니는 스킬 뱃지 (React, TypeScript)

### 모바일 반응형
- 이미지 컬럼: `order-1 lg:order-2` → 모바일에서 이미지가 위
- floating badges: `hidden lg:flex`
- 이미지 크기: `w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80`

---

## Phase 4 — 나머지 섹션 일관성 정비

### 컨테이너 너비 통일
- 전체 `max-w-5xl` → `max-w-6xl` 로 통일 (Hero 포함)
- Experience/Education 타임라인: `max-w-3xl` → `max-w-4xl`

### 섹션 패딩 통일
- `py-20 lg:py-32` → `py-24 lg:py-32` 로 통일

### 카드 스타일 교체
```html
<!-- 변경 전 -->
class="bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700"

<!-- 변경 후 -->
class="glass-card"
```
적용 대상: About 통계 카드, Skills 카드, Experience 카드, Projects 카드, SNS 카드, Contact 카드

### 섹션 교차 배경
- `bg-slate-100 dark:bg-slate-800/30` → `bg-[#080d1a]` (짝수 섹션)

---

## Phase 5 — custom.css 추가 스타일

### 추가할 주요 클래스
```css
/* Hero 배경 */
.hero-mesh-bg       — 방사형 그라디언트 혼합 배경
.hero-orb-*         — Glow orb (blur + float 애니메이션)
.hero-grid-bg       — 서브틀 격자 오버레이
.hero-name-gradient — 이름 gradient 텍스트
.hero-image-glow    — 이미지 주변 radial glow
.hero-gradient-border — 회전 gradient 테두리 애니메이션
.hero-dots-pattern  — 점 패턴 장식
.hero-floating-badge — 떠다니는 스킬 뱃지 float 애니메이션

/* 카드 */
.glass-card         — glassmorphism (bg rgba + backdrop-blur + border white/7)
.glass-card:hover   — 호버 시 border-color primary/25 + glow shadow
:root:not(.dark) .glass-card — 라이트모드 오버라이드 (흰 배경 80%)

/* 버튼 */
.btn-glow-primary   — primary 색상 glow shadow

/* 네비게이션 */
.navbar-glass       — 스크롤 시 dark glass (bg rgba(10,15,30,0.85) + backdrop-blur-xl)

/* 접근성 */
@media (prefers-reduced-motion: reduce) — 모든 애니메이션 비활성화
```

---

## 검증 방법

1. `python -m http.server 8080` 실행 후 `http://localhost:8080/portfolio-resume/` 접속
2. **다크모드 기본값 확인**: 첫 접속 시 다크모드로 표시, localStorage 'theme' 없을 때
3. **Hero 2컬럼 확인**: 데스크탑(1024px+)에서 텍스트 좌/이미지 우 배치 확인
4. **모바일 확인**: 768px 이하에서 1컬럼 (이미지 위/텍스트 아래) 확인
5. **Glow 효과 확인**: Hero orb 애니메이션, 이미지 gradient border 회전
6. **Glass 카드 확인**: About/Skills/Projects 카드 hover 시 border glow
7. **Nav glass 확인**: 스크롤 20px+ 시 dark glass 배경 적용
8. **FOUC 없음 확인**: 하드 리프레시 시 흰 배경 깜빡임 없음
9. **Lighthouse**: Performance 90+, Accessibility 95+, SEO 90+ 유지 확인
