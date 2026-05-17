// ================= EMAILJS CONFIGURATION =================
// 🔹 REPLACE THESE WITH YOUR ACTUAL EMAILJS CREDENTIALS 🔹
// Get them from https://www.emailjs.com/ (free account)
const EMAILJS_CONFIG = {
  PUBLIC_KEY: "1IDMadPMkjBJFq70S",
  SERVICE_ID: "service_5udght7",
  TEMPLATE_ID: "template_7gebh6w"
};

// Initialize EmailJS if keys are provided
if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.PUBLIC_KEY !== "1IDMadPMkjBJFq70S") {
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
}
// =========================================================

// ================= THEME MANAGEMENT =================
function setTheme(themeName) {
  document.documentElement.setAttribute('data-theme', themeName);
  localStorage.setItem('premium-theme', themeName);
}

function loadTheme() {
  const saved = localStorage.getItem('premium-theme');
  const validThemes = ['original', 'lavender', 'mauve', 'powder', 'sage', 'peach'];
  if (saved && validThemes.includes(saved)) {
    setTheme(saved);
  } else {
    setTheme('original');
  }
}

function initThemeSwitcher() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const dropdown = document.getElementById('themeDropdown');
  if (!toggleBtn || !dropdown) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('show');
  });

  document.addEventListener('click', () => {
    dropdown.classList.remove('show');
  });

  dropdown.querySelectorAll('div').forEach(option => {
    option.addEventListener('click', () => {
      const theme = option.getAttribute('data-theme');
      if (theme) setTheme(theme);
      dropdown.classList.remove('show');
    });
  });
}

// ================= MOBILE MENU =================
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('show');
    });
  }
}

// ================= HIRE MODAL =================
function initHireModal() {
  const hireBtn = document.getElementById('hireMeBtn');
  const modal = document.getElementById('hireModal');
  if (!hireBtn || !modal) return;

  hireBtn.addEventListener('click', () => {
    modal.classList.add('show');
  });

  const closeBtns = document.querySelectorAll('.close-modal, .close-modal-btn');
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.remove('show');
    });
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('show');
  });
}

// ================= TOAST NOTIFICATIONS =================
function showToast(message, isError = false) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.style.background = isError ? '#c0392b' : 'var(--text-primary)';
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

// ================= CONTACT FORM (EmailJS) =================
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Sending...';

    try {
      if (EMAILJS_CONFIG.PUBLIC_KEY === "1IDMadPMkjBJFq70S") {
        throw new Error('EmailJS not configured. Replace placeholders in script.js');
      }
      const result = await emailjs.sendForm(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        form,
        EMAILJS_CONFIG.PUBLIC_KEY
      );
      if (result.status === 200) {
        showToast('✓ Message sent successfully! Mohana will reply within 24h.');
        form.reset();
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error(error);
      showToast('❌ Failed to send. Please contact directly via email.', true);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

// ================= GITHUB BUTTONS (toast only) =================
function initGitHubButtons() {
  const btns = document.querySelectorAll('.github-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('🔗 GitHub repository – production code');
    });
  });
}

// ================= SCROLL REVEAL (Intersection Observer) =================
function initScrollReveal() {
  const elements = document.querySelectorAll('.fade-up');
  if (elements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => observer.observe(el));
}

// ================= SMOOTH SCROLL FOR INTERNAL ANCHORS (index.html) =================
function initSmoothScroll() {
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const hash = link.getAttribute('href');
      if (hash === '#') return;
      const targetElement = document.querySelector(hash);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Update URL without jumping
        history.pushState(null, null, hash);
      }
    });
  });
}

// ================= RESUME DOWNLOAD (not used in this version – added for future) =================
// (Optional: you can add a "Download Resume" button later)

// ================= INITIALIZE EVERYTHING =================
document.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  initThemeSwitcher();
  initMobileMenu();
  initHireModal();
  initContactForm();
  initGitHubButtons();
  initScrollReveal();
  initSmoothScroll();
});
