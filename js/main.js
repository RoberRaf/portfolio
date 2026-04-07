// ============================================
// Theme Toggle (Dark/Light Mode)
// ============================================
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
});

// Apply icon on load (theme already set by head script)
const initialTheme = document.documentElement.getAttribute('data-theme') || 'light';
themeIcon.className = initialTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

// ============================================
// Mobile Menu Toggle
// ============================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    const isActive = hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isActive);
});

document.querySelectorAll('.nav-links li a').forEach(n =>
    n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    })
);

// ============================================
// Navbar Shrink on Scroll + Active Link
// ============================================
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-links li a:not(.btn-secondary)');

let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            // Shrink navbar
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Active section highlighting
            let current = '';
            sections.forEach(section => {
                const top = section.offsetTop - 100;
                if (window.scrollY >= top) {
                    current = section.getAttribute('id');
                }
            });
            navLinkItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });

            ticking = false;
        });
        ticking = true;
    }
});

// ============================================
// Scroll Reveal (Intersection Observer)
// ============================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ============================================
// Typing Effect
// ============================================
const subtitleEl = document.querySelector('.subtitle');
const roles = ['Flutter Mobile Developer', 'Senior Mobile Engineer', 'Mobile App Architect'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const current = roles[roleIndex];

    if (isDeleting) {
        subtitleEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        subtitleEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let delay = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === current.length) {
        delay = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 500;
    }

    setTimeout(typeEffect, delay);
}

// Start typing after a brief delay
setTimeout(typeEffect, 1500);

// ============================================
// Project Category Filtering
// ============================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.dataset.filter;

        projectCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.classList.remove('hidden');
                card.style.display = '';
            } else {
                card.classList.add('hidden');
                // Remove from layout after transition
                setTimeout(() => {
                    if (card.classList.contains('hidden')) {
                        card.style.display = 'none';
                    }
                }, 300);
            }
        });
    });
});

// ============================================
// Stats Counter Animation
// ============================================
const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target);
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

function animateCounter(el, target) {
    let current = 0;
    const increment = target / 40;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.textContent = target + '+';
            clearInterval(timer);
        } else {
            el.textContent = Math.ceil(current) + '+';
        }
    }, 40);
}

// ============================================
// Dynamic Copyright Year
// ============================================
const copyrightEl = document.querySelector('.copyright');
if (copyrightEl) {
    const year = new Date().getFullYear();
    copyrightEl.innerHTML = `&copy; ${year} Rober Boules. Built with modern web technologies.`;
}
