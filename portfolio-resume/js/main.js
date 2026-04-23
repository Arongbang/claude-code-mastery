/* =====================================================
   main.js — 포트폴리오 전체 인터랙션 로직
   모든 기능은 DOMContentLoaded 이후 초기화
   ===================================================== */

// ── 전역 상수 ─────────────────────────────────────────
const SECTION_IDS = ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'sns', 'contact'];

const TYPING_STRINGS = [
  'Frontend Developer',
  'UI/UX Enthusiast',
  'React Developer',
  'Problem Solver',
  'Open Source Contributor',
];

const TYPING_SPEED   = 100;   // ms / 글자 타이핑 속도
const ERASE_SPEED    = 50;    // ms / 글자 지우기 속도
const PAUSE_DURATION = 2200;  // ms / 완성 후 대기 시간


// ── 1. 다크모드 관리 ──────────────────────────────────
function initDarkMode() {
  const toggleBtn = document.getElementById('dark-toggle');
  const iconSun   = document.getElementById('icon-sun');
  const iconMoon  = document.getElementById('icon-moon');
  const htmlEl    = document.documentElement;

  // 저장된 테마가 없으면 다크모드를 기본값으로 사용
  const savedTheme  = localStorage.getItem('theme');
  const isDark      = savedTheme ? savedTheme === 'dark' : true;

  applyTheme(isDark);

  toggleBtn.addEventListener('click', () => {
    const currentlyDark = htmlEl.classList.contains('dark');
    applyTheme(!currentlyDark);
    localStorage.setItem('theme', !currentlyDark ? 'dark' : 'light');
  });

  function applyTheme(dark) {
    htmlEl.classList.toggle('dark', dark);
    // 해 아이콘: 다크모드일 때 숨김
    iconSun.classList.toggle('hidden', dark);
    // 달 아이콘: 라이트모드일 때 숨김
    iconMoon.classList.toggle('hidden', !dark);
  }
}


// ── 2. 네비게이션 바 ──────────────────────────────────
function initNavbar() {
  const navbar       = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu   = document.getElementById('mobile-menu');
  const mobileLinks  = mobileMenu.querySelectorAll('a');

  // 스크롤 시 네비게이션 다크 glass 효과
  function handleNavScroll() {
    const scrolled = window.scrollY > 20;
    navbar.classList.toggle('navbar-glass', scrolled);
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // 초기 실행

  // 모바일 햄버거 메뉴 토글
  hamburgerBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
    hamburgerBtn.setAttribute('aria-label', isOpen ? '모바일 메뉴 닫기' : '모바일 메뉴 열기');
  });

  // 모바일 링크 클릭 시 메뉴 자동 닫기
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      hamburgerBtn.setAttribute('aria-label', '모바일 메뉴 열기');
    });
  });

  // 외부 클릭 시 메뉴 닫기
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && mobileMenu.classList.contains('is-open')) {
      mobileMenu.classList.remove('is-open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
  });
}


// ── 3. 스크롤 스파이 (현재 섹션 네비 하이라이트) ──────
function initScrollSpy() {
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = SECTION_IDS
    .map(id => document.getElementById(id))
    .filter(Boolean);

  // rootMargin: 뷰포트 상단 50% ~ 하단 40% 진입 시 활성화
  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeId = entry.target.id;
          navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${activeId}`;
            link.classList.toggle('active', isActive);
          });
        }
      });
    },
    { rootMargin: '-50% 0px -40% 0px' }
  );

  sections.forEach(section => spyObserver.observe(section));
}


// ── 4. 타이핑 애니메이션 ──────────────────────────────
function initTypingAnimation() {
  const textEl = document.getElementById('typing-text');
  if (!textEl) return;

  let stringIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  let timerId     = null;

  function type() {
    const currentString = TYPING_STRINGS[stringIndex % TYPING_STRINGS.length];

    if (isDeleting) {
      textEl.textContent = currentString.substring(0, charIndex - 1);
      charIndex--;
    } else {
      textEl.textContent = currentString.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? ERASE_SPEED : TYPING_SPEED;

    if (!isDeleting && charIndex === currentString.length) {
      // 완성 → 잠시 대기 후 지우기
      delay = PAUSE_DURATION;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // 다 지워짐 → 다음 문자열로
      isDeleting = false;
      stringIndex++;
      delay = 300;
    }

    timerId = setTimeout(type, delay);
  }

  // 페이지 탭 비활성 시 타이머 일시정지 (배터리 절약)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearTimeout(timerId);
    } else {
      type();
    }
  });

  type();
}


// ── 5. 스크롤 진입 애니메이션 (.animate-target) ───────
function initScrollAnimations() {
  const targets = document.querySelectorAll('.animate-target');

  const animObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // 한 번 등장 후 감시 해제 → 성능 최적화
          animObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach(target => animObserver.observe(target));
}


// ── 6. 스킬 Progress Bar 채움 애니메이션 ──────────────
function initProgressBars() {
  const progressBars = document.querySelectorAll('.progress-bar[data-width]');

  const progressObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetWidth = entry.target.dataset.width;
          // requestAnimationFrame: 초기 width:0 렌더링 이후 값 적용 → CSS transition 발동
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              entry.target.style.width = `${targetWidth}%`;
            });
          });
          progressObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  progressBars.forEach(bar => progressObserver.observe(bar));
}


// ── 7. 프로젝트 카테고리 필터 ─────────────────────────
function initProjectFilter() {
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('#projects-grid .project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // 활성 버튼 스타일 교체
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach(card => {
        const category   = card.dataset.category;
        const shouldShow = filter === 'all' || category === filter;

        if (shouldShow) {
          // 표시: 페이드인 애니메이션
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            });
          });
        } else {
          // 숨김: 페이드아웃 후 display:none
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}


// ── 8. 스크롤 탑 버튼 ────────────────────────────────
function initScrollTopBtn() {
  const btn = document.getElementById('scroll-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    const show = window.scrollY > 400;
    btn.style.opacity     = show ? '1' : '0';
    btn.style.pointerEvents = show ? 'auto' : 'none';
    btn.style.transform   = show ? 'translateY(0)' : 'translateY(8px)';
  }, { passive: true });

  btn.style.transition = 'opacity 0.3s, transform 0.3s';

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


// ── 초기화 진입점 ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initNavbar();
  initScrollSpy();
  initTypingAnimation();
  initScrollAnimations();
  initProgressBars();
  initProjectFilter();
  initScrollTopBtn();
});
