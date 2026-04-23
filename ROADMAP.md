# 개발자 웹 이력서 개발 로드맵

## 프로젝트 개요

- **목표**: HTML, CSS, JavaScript, TailwindCSS를 활용한 반응형 개발자 웹 이력서 제작
- **기술 스택**: HTML5, CSS3, Vanilla JavaScript, TailwindCSS v3
- **배포 방식**: 정적 웹 페이지 (GitHub Pages 또는 Netlify)

---

## 아키텍처 구조

```
portfolio-resume/
├── index.html          # 메인 HTML 파일
├── css/
│   └── custom.css      # TailwindCSS로 커버되지 않는 커스텀 스타일
├── js/
│   └── main.js         # 인터랙션 및 애니메이션 로직
├── assets/
│   ├── images/         # 프로필 이미지, 프로젝트 스크린샷
│   └── icons/          # SVG 아이콘
└── ROADMAP.md
```

---

## 이력서 섹션 구성

| 섹션 | 내용 | 우선순위 |
|------|------|----------|
| Hero (소개) | 이름, 직함, 한 줄 소개, CTA 버튼 | ★★★ |
| About Me | 간략한 자기소개 및 개발 철학 | ★★★ |
| Skills | 기술 스택 시각화 (Progress Bar / Badge) | ★★★ |
| Experience | 경력 사항 타임라인 | ★★★ |
| Projects | 주요 프로젝트 카드 | ★★★ |
| Education | 학력 사항 | ★★☆ |
| Contact | 연락처 및 SNS 링크 | ★★★ |

---

## 개발 단계별 로드맵

### Phase 1: 프로젝트 초기 세팅 (Day 1)

- [ ] 프로젝트 디렉토리 구조 생성
- [ ] TailwindCSS CDN 또는 CLI 설정
  ```html
  <!-- CDN 방식 (빠른 프로토타이핑) -->
  <script src="https://cdn.tailwindcss.com"></script>
  ```
- [ ] `index.html` 기본 보일러플레이트 작성
- [ ] 반응형 뷰포트 메타 태그 설정
- [ ] 색상 팔레트 및 폰트 결정 (Google Fonts 연동)

### Phase 2: 레이아웃 및 네비게이션 (Day 2)

- [ ] 고정형(sticky) 네비게이션 바 구현
  - 로고 (이름 또는 이니셜)
  - 섹션 이동 앵커 링크
  - 모바일 햄버거 메뉴 (JS 토글)
- [ ] 스크롤 시 네비게이션 배경색 변화 효과
- [ ] 섹션 스크롤 스파이 (현재 위치 하이라이트)

### Phase 3: Hero 섹션 (Day 2~3)

- [ ] 풀스크린 히어로 영역 구성
- [ ] 이름 및 직함 타이핑 애니메이션 (JavaScript)
  ```javascript
  // 타이핑 효과 예시
  const roles = ['Frontend Developer', 'UI/UX Enthusiast', 'Problem Solver'];
  ```
- [ ] CTA 버튼: "이력서 다운로드" / "연락하기"
- [ ] 소셜 링크 아이콘 (GitHub, LinkedIn, Email)
- [ ] 부드러운 스크롤 다운 인디케이터

### Phase 4: About Me 섹션 (Day 3)

- [ ] 프로필 이미지 (원형 크롭)
- [ ] 자기소개 텍스트 (2~3문단)
- [ ] 주요 수치 통계 카드 (경력 N년, 프로젝트 N개 등)
- [ ] 이력서 PDF 다운로드 버튼

### Phase 5: Skills 섹션 (Day 3~4)

- [ ] 기술 카테고리 분류
  - Frontend: HTML, CSS, JavaScript, React, TailwindCSS
  - Backend: Node.js, Python, etc.
  - Tools: Git, Docker, Figma, etc.
- [ ] 기술 레벨 시각화 (Progress Bar 또는 Badge 방식)
- [ ] 스크롤 진입 시 애니메이션 (Intersection Observer API)

```javascript
// Intersection Observer로 스크롤 애니메이션 구현
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in');
    }
  });
}, { threshold: 0.1 });
```

### Phase 6: Experience 섹션 (Day 4)

- [ ] 세로 타임라인 레이아웃
- [ ] 각 경력 항목 구성
  - 회사명 / 직책
  - 재직 기간
  - 주요 업무 및 성과 (불릿 포인트)
  - 사용 기술 태그
- [ ] 좌우 교차 레이아웃 (데스크탑) / 단일 컬럼 (모바일)

### Phase 7: Projects 섹션 (Day 5)

- [ ] 프로젝트 카드 그리드 레이아웃 (3열 → 2열 → 1열 반응형)
- [ ] 각 카드 구성
  - 프로젝트 썸네일 이미지
  - 프로젝트명 및 한 줄 설명
  - 사용 기술 뱃지
  - GitHub / Live Demo 링크 버튼
- [ ] 카드 호버 효과 (이미지 오버레이)
- [ ] 카테고리 필터 기능 (JavaScript)

### Phase 8: Education & Contact 섹션 (Day 5~6)

- [ ] 학력 타임라인 (간결한 형태)
- [ ] 자격증 / 수상 내역
- [ ] Contact 폼 또는 이메일 링크
- [ ] 소셜 미디어 아이콘 모음
- [ ] 구글 맵 또는 거주 지역 표시 (선택)

### Phase 9: 반응형 & 접근성 (Day 6)

- [ ] 모바일 (375px), 태블릿 (768px), 데스크탑 (1280px) 대응
- [ ] TailwindCSS 반응형 접두사 활용 (`sm:`, `md:`, `lg:`, `xl:`)
- [ ] 다크 모드 지원 (`dark:` 접두사 + JS 토글)
- [ ] 시맨틱 HTML 태그 사용 (`<section>`, `<article>`, `<nav>` 등)
- [ ] alt 텍스트, aria-label 등 접근성 속성 추가

### Phase 10: 최적화 및 배포 (Day 7)

- [ ] 이미지 최적화 (WebP 변환, lazy loading)
- [ ] CSS/JS 불필요한 코드 제거
- [ ] Lighthouse 성능 점수 90점 이상 목표
- [ ] GitHub Repository 생성 및 코드 푸시
- [ ] GitHub Pages 또는 Netlify 배포
- [ ] 커스텀 도메인 연결 (선택)

---

## 이력서 콘텐츠 예시

### 기본 정보
```
이름: 김개발
직함: Frontend Developer
위치: 서울, 대한민국
이메일: dev.kim@example.com
GitHub: github.com/devkim
LinkedIn: linkedin.com/in/devkim
```

### About Me
```
안녕하세요! 3년차 프론트엔드 개발자 김개발입니다.
사용자 경험을 최우선으로 생각하며, 깔끔하고 유지보수 가능한 코드를 
작성하는 것을 목표로 합니다. 새로운 기술을 빠르게 습득하고 팀과의
협업을 즐기는 개발자입니다.
```

### 주요 기술
- **Frontend**: HTML5, CSS3, JavaScript (ES6+), React, TailwindCSS
- **Backend**: Node.js, Express, Python
- **Database**: MySQL, MongoDB
- **Tools**: Git/GitHub, Figma, VS Code, Docker

### 경력 사항
```
(주) 테크스타트업 | Frontend Developer | 2023.03 ~ 현재
- React 기반 SPA 서비스 개발 및 유지보수
- TailwindCSS 도입으로 스타일링 생산성 40% 향상
- 웹 성능 최적화로 LCP 지표 2.5초 → 1.2초 개선

(주) 웹에이전시 | Web Developer (인턴) | 2022.07 ~ 2023.02
- 기업 홈페이지 10여 개 퍼블리싱 작업
- 반응형 웹 디자인 구현
```

### 주요 프로젝트
```
1. 개인 포트폴리오 웹사이트
   - 기술: HTML, CSS, JavaScript, TailwindCSS
   - 설명: 반응형 웹 이력서 및 포트폴리오 페이지

2. 할 일 관리 앱 (Todo App)
   - 기술: React, TypeScript, Zustand
   - 설명: 드래그 앤 드롭 기능이 있는 칸반 보드 스타일 Todo 앱

3. 날씨 대시보드
   - 기술: JavaScript, OpenWeather API, Chart.js
   - 설명: 실시간 날씨 정보 및 5일 예보 시각화 앱
```

### 학력
```
○○대학교 | 컴퓨터공학과 | 2018.03 ~ 2022.02 (졸업)
```

---

## 디자인 가이드라인

### 색상 팔레트 (추천)
```
Primary:   #6366F1 (Indigo)
Secondary: #8B5CF6 (Violet)
Accent:    #06B6D4 (Cyan)
Dark BG:   #0F172A (Slate 900)
Light BG:  #F8FAFC (Slate 50)
Text:      #1E293B (Slate 800)
```

### 타이포그래피
```
Heading: 'Pretendard' 또는 'Noto Sans KR' (Bold)
Body:    'Pretendard' 또는 'Inter' (Regular)
Code:    'JetBrains Mono' (Monospace)
```

### 인터랙션 규칙
- 모든 호버 효과: `transition-all duration-300`
- 스크롤 애니메이션: `Intersection Observer API` 활용
- 로딩 애니메이션: CSS `@keyframes` 또는 TailwindCSS `animate-` 클래스

---

## 참고 리소스

- [TailwindCSS 공식 문서](https://tailwindcss.com/docs)
- [Google Fonts - Pretendard](https://fonts.google.com)
- [Font Awesome Icons](https://fontawesome.com)
- [Heroicons (TailwindCSS 팀 제작 SVG)](https://heroicons.com)
- [Unsplash (무료 이미지)](https://unsplash.com)
- [Shields.io (배지 생성)](https://shields.io)

---

## 완성 체크리스트

- [ ] 모든 섹션 구현 완료
- [ ] 모바일 반응형 동작 확인
- [ ] 다크 모드 동작 확인
- [ ] 크로스 브라우저 테스트 (Chrome, Firefox, Safari, Edge)
- [ ] Lighthouse 성능/접근성/SEO 점수 확인
- [ ] 이력서 PDF 다운로드 기능 동작 확인
- [ ] 소셜 링크 정상 작동 확인
- [ ] 배포 URL 공유 준비 완료
