# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## 언어 및 커뮤니케이션 규칙

- **기본 응답 언어**: 한국어
- **코드 주석**: 한국어로 작성
- **커밋 메시지**: 한국어로 작성
- **문서화**: 한국어로 작성
- **변수명/함수명**: 영어 (코드 표준 준수)

---

## 프로젝트 개요

HTML, CSS, Vanilla JavaScript, TailwindCSS v3로 구성된 **정적 개발자 웹 이력서/포트폴리오** 프로젝트입니다. 빌드 도구나 패키지 매니저 없이 브라우저에서 직접 실행되는 순수 정적 웹 페이지입니다.

- **배포 대상**: GitHub Pages 또는 Netlify (정적 호스팅)
- **TailwindCSS 방식**: CDN 스크립트 태그로 로드 (별도 빌드 단계 없음)

---

## 개발 환경 실행

빌드 도구가 없으므로 로컬 정적 서버로 바로 실행합니다.

```bash
# Python 내장 서버 (Python 3)
python -m http.server 8080

# Node.js가 있을 경우
npx serve .

# VS Code Live Server 확장 사용 시
# index.html 우클릭 → "Open with Live Server"
```

브라우저에서 `http://localhost:8080` 접속

---

## 프로젝트 아키텍처

```
portfolio-resume/
├── index.html          # 단일 페이지 — 모든 섹션 포함
├── css/
│   └── custom.css      # TailwindCSS 유틸리티로 불가능한 커스텀 스타일
│                       # (예: 타이핑 커서 깜빡임, 타임라인 선, 스크롤바 스타일)
├── js/
│   └── main.js         # 모든 인터랙션 로직 (네비게이션, 애니메이션, 다크모드)
└── assets/
    ├── images/         # 프로필 사진, 프로젝트 썸네일 (WebP 권장)
    └── icons/          # SVG 아이콘 (Heroicons 기반)
```

### 핵심 아키텍처 결정 사항

- **단일 HTML 파일**: 모든 섹션(`<section>`)이 `index.html` 한 파일에 존재. 별도 라우팅 없음.
- **JS 모듈 분리 없음**: `main.js`가 모든 DOM 조작을 담당. 기능별로 함수로 분리하여 관리.
- **TailwindCSS CDN**: `tailwind.config`를 인라인 `<script>` 블록으로 정의해 커스텀 색상·폰트 확장.
- **Intersection Observer**: 스크롤 진입 애니메이션의 핵심 메커니즘. `main.js`에서 공통 옵저버 인스턴스 하나를 재사용.

---

## 섹션 구조 및 ID 규칙

`index.html` 내 각 섹션은 앵커 링크와 스크롤 스파이에 사용되는 고유 `id`를 가집니다.

| 섹션 | HTML id | 설명 |
|------|---------|------|
| Hero | `#hero` | 이름, 직함 타이핑 애니메이션, CTA |
| About | `#about` | 프로필, 자기소개, 통계 |
| Skills | `#skills` | 기술 스택 뱃지 및 Progress Bar |
| Experience | `#experience` | 경력 타임라인 |
| Projects | `#projects` | 프로젝트 카드 + 필터 |
| Education | `#education` | 학력, 자격증 |
| Contact | `#contact` | 연락처, SNS 링크 |

---

## 디자인 토큰 (TailwindCSS 커스텀 설정)

`index.html` 내 인라인 `tailwind.config`에 아래 값을 확장해서 사용합니다.

```javascript
// 색상
primary:   '#6366F1'  // Indigo — 주 강조색
secondary: '#8B5CF6'  // Violet
accent:    '#06B6D4'  // Cyan

// 폰트
sans: ['Pretendard', 'Noto Sans KR', 'sans-serif']
mono: ['JetBrains Mono', 'monospace']
```

---

## JavaScript 주요 기능 패턴

`main.js`에서 구현할 주요 패턴:

```javascript
// 1. 다크모드 토글 — localStorage로 상태 유지
// 2. 햄버거 메뉴 — 모바일 nav 토글
// 3. 스크롤 스파이 — IntersectionObserver로 현재 섹션 감지 → nav 링크 active 처리
// 4. 타이핑 애니메이션 — 직함 문자열 배열을 순환하며 출력
// 5. 스크롤 진입 애니메이션 — .animate-target 클래스 요소에 .is-visible 토글
// 6. Projects 필터 — data-category 속성 기반 카드 show/hide
```

---

## 반응형 브레이크포인트

TailwindCSS 기본 브레이크포인트를 그대로 사용합니다.

| 접두사 | 최소 너비 | 대상 기기 |
|--------|----------|----------|
| (없음) | 0px | 모바일 기본 |
| `sm:` | 640px | 대형 모바일 |
| `md:` | 768px | 태블릿 |
| `lg:` | 1024px | 데스크탑 |
| `xl:` | 1280px | 와이드 |

모바일 퍼스트 원칙: 기본 클래스가 모바일, 접두사가 붙은 클래스가 확장.

---

## 개발 시 주의사항

- `custom.css`는 TailwindCSS로 표현 불가능한 경우에만 작성 (타임라인 가상요소 `::before`, 커스텀 스크롤바 등)
- 이미지는 `assets/images/`에 WebP 포맷으로 저장, `loading="lazy"` 속성 필수
- 외부 폰트(Pretendard)는 `<head>`의 `<link>` 태그로 로드, `font-display: swap` 적용
- Lighthouse 목표 점수: Performance 90+, Accessibility 95+, SEO 90+
