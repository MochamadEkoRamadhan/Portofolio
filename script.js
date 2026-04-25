// ===== DARK MODE TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
  document.body.classList.add('dark-mode');
}

if (themeToggle) {
  themeToggle.innerHTML = `
    <span class="toggle-track">
      <span class="toggle-icon sun" aria-hidden="true">
        <i class="fas fa-sun"></i>
      </span>
      <span class="toggle-icon moon" aria-hidden="true">
        <i class="fas fa-moon"></i>
      </span>
      <span class="toggle-thumb"></span>
    </span>
  `;

  themeToggle.setAttribute('aria-pressed', document.body.classList.contains('dark-mode') ? 'true' : 'false');
  
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.setAttribute('aria-pressed', document.body.classList.contains('dark-mode') ? 'true' : 'false');
    
    // Save preference
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
}

// ===== THEME (DEFAULT: LIGHT) =====
// Force light theme as the primary theme (ignore any previously saved dark preference).
document.body.classList.remove('dark-mode');
try {
  localStorage.setItem('theme', 'light');
} catch {
  // ignore
}

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');
const navClose = document.getElementById('navClose');

if (hamburger && navLinks) {
  const closeNav = () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    if (navOverlay) navOverlay.classList.remove('active');
  };

  const openNav = () => {
    hamburger.classList.add('active');
    navLinks.classList.add('active');
    if (navOverlay) navOverlay.classList.add('active');
  };

  hamburger.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      closeNav();
    } else {
      openNav();
    }
  });

  // Close menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      closeNav();
    });
  });

  if (navOverlay) {
    navOverlay.addEventListener('click', closeNav);
  }

  if (navClose) {
    navClose.addEventListener('click', closeNav);
  }
}

// ===== MOBILE NAV ACTIVE STATE =====
document.addEventListener('DOMContentLoaded', () => {
  const navAnchors = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  if (!navAnchors.length) return;

  const sections = navAnchors
    .map((anchor) => document.querySelector(anchor.getAttribute('href')))
    .filter(Boolean);

  const setActiveLink = (id) => {
    navAnchors.forEach((anchor) => {
      const target = anchor.getAttribute('href').slice(1);
      anchor.classList.toggle('is-active', target === id);
    });
  };

  navAnchors.forEach((anchor) => {
    anchor.addEventListener('click', () => {
      const id = anchor.getAttribute('href').slice(1);
      setActiveLink(id);
    });
  });

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible && visible.target.id) {
        setActiveLink(visible.target.id);
      }
    },
    {
      threshold: [0.2, 0.4, 0.6],
      rootMargin: '-42% 0px -45% 0px',
    }
  );

  sections.forEach((section) => observer.observe(section));
  setActiveLink(sections[0].id);
});

// ===== MOBILE NOTICE (RECOMMEND DESKTOP) =====
document.addEventListener('DOMContentLoaded', () => {
  const notice = document.querySelector('[data-mobile-notice]');
  if (!(notice instanceof HTMLElement)) return;

  const closeButton = notice.querySelector('[data-mobile-notice-close]');
  const storageKey = 'mobile_notice_dismissed_v1';

  const isDismissed = () => {
    try {
      return localStorage.getItem(storageKey) === '1';
    } catch {
      return false;
    }
  };

  const setDismissed = () => {
    try {
      localStorage.setItem(storageKey, '1');
    } catch {
      // ignore
    }
  };

  const mq = window.matchMedia ? window.matchMedia('(max-width: 768px)') : null;

  const updateVisibility = () => {
    const isMobileViewport = mq ? mq.matches : window.innerWidth <= 768;
    const shouldShow = isMobileViewport && !isDismissed();
    notice.toggleAttribute('hidden', !shouldShow);
  };

  updateVisibility();

  if (mq && typeof mq.addEventListener === 'function') {
    mq.addEventListener('change', updateVisibility);
  } else {
    window.addEventListener('resize', updateVisibility, { passive: true });
  }

  if (closeButton instanceof HTMLElement) {
    closeButton.addEventListener('click', () => {
      setDismissed();
      notice.setAttribute('hidden', '');
    });
  }
});

// ===== TAB NAVIGATION =====
document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-btn');
  
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabName = btn.getAttribute('data-tab');
      const modalContent = btn.closest('.modal-content');
      
      if (!modalContent) return;

      setModalActiveTab(modalContent, tabName);
    });
  });
});

// ===== MODAL FUNCTIONS =====
let activeModalId = null;
let lastFocusedElement = null;

function setModalActiveTab(modalContent, tabName) {
  if (!modalContent) return;

  // Tabs
  modalContent.querySelectorAll('.tab-btn').forEach((button) => {
    const isActive = button.getAttribute('data-tab') === tabName;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  // Content
  modalContent.querySelectorAll('.tab-content').forEach((content) => {
    const isActive = content.getAttribute('data-tab') === tabName;
    content.classList.toggle('active', isActive);
  });
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;

  if (activeModalId && activeModalId !== id) {
    closeModal(activeModalId, false);
  }

  lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  activeModalId = id;

  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');

  const modalContent = modal.querySelector('.modal-content');
  if (modalContent) {
    setModalActiveTab(modalContent, 'overview');
    modalContent.scrollTop = 0;
  }

  // Trigger fade/scale animation
  requestAnimationFrame(() => {
    modal.classList.add('is-open');
  });

  document.body.style.overflow = 'hidden'; // Prevent scrolling

  const closeButton = modal.querySelector('.close');
  if (closeButton) {
    closeButton.focus({ preventScroll: true });
  } else if (modalContent) {
    modalContent.focus({ preventScroll: true });
  }
}

function closeModal(id, restoreFocus = true) {
  const modal = document.getElementById(id);
  if (!modal) return;

  if (activeModalId === id) {
    activeModalId = null;
  }

  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = 'auto'; // Enable scrolling

  let finalized = false;
  const finalize = () => {
    if (finalized) return;
    finalized = true;
    modal.style.display = 'none';
  };

  // Wait for opacity transition; fallback for browsers that skip transitionend.
  modal.addEventListener(
    'transitionend',
    (event) => {
      if (event.target === modal) finalize();
    },
    { once: true }
  );
  setTimeout(finalize, 320);

  if (restoreFocus && lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
  }
}

// Keyboard: ESC to close, TAB focus trap
document.addEventListener('keydown', (event) => {
  if (!activeModalId) return;

  if (event.key === 'Escape') {
    event.preventDefault();
    closeModal(activeModalId);
    return;
  }

  if (event.key !== 'Tab') return;

  const modal = document.getElementById(activeModalId);
  if (!modal) return;

  const focusable = Array.from(
    modal.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => el instanceof HTMLElement && el.offsetParent !== null);

  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

// Close modal when clicking outside (overlay)
window.addEventListener('click', (event) => {
  if (event.target instanceof HTMLElement && event.target.classList.contains('modal') && event.target.id) {
    closeModal(event.target.id);
  }
});

// Performance: removed unused slider/dot functions and typewriter animation to reduce bundle size

// ===== ANIMASI SCROLL REVEAL =====
document.addEventListener('DOMContentLoaded', () => {
  const revealTextTargets = document.querySelectorAll(
    '.hero-badge, .hero-title, .hero-subtitle, .hero-desc, .section-title, .section-subtitle, .about-desc, .about-quote, .stat-item, .project-content h4, .project-content p, .tag'
  );
  const revealCardTargets = document.querySelectorAll(
    '.project-card, .showcase-item, .skill-card, .contact-card, .experience-item, .social-item, .about-image, .hero-animation, .btn'
  );

  revealTextTargets.forEach((element, index) => {
    element.classList.add('reveal-text');
    element.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 90}ms`);
  });

  revealCardTargets.forEach((element, index) => {
    element.classList.add('reveal-card');
    element.style.setProperty('--reveal-delay', `${Math.min(index % 5, 4) * 110}ms`);
  });

  const observerOptions = {
    threshold: 0.16,
    rootMargin: '0px 0px -12% 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      } else {
        entry.target.classList.remove('animate-in');
      }
    });
  }, observerOptions);
  
  const revealTargets = document.querySelectorAll('.reveal-text, .reveal-card');
  revealTargets.forEach((element) => {
    observer.observe(element);
  });
});

// Performance: removed particle system, floating elements, JS hover transforms, and email copy
// to reduce DOM manipulation and event listeners


