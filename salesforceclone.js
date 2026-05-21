// ===== ANNOUNCEMENT STRIP =====
const stripClose = document.getElementById('stripClose');
const strip = document.querySelector('.announcement-strip');

if (stripClose) {
    stripClose.addEventListener('click', () => {
        strip.style.display = 'none';
    });
}

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const icon = hamburger.querySelector('i');
    icon.className = navLinks.classList.contains('open')
        ? 'ri-close-line'
        : 'ri-menu-line';
});

// Close nav when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.querySelector('i').className = 'ri-menu-line';
    }
});

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== STATS COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        // Format number
        if (target >= 1000) {
            el.textContent = Math.floor(current).toLocaleString() + '+';
        } else {
            el.textContent = Math.floor(current);
        }
    }, 16);
};

// Trigger counter when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            statNumbers.forEach(animateCounter);
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats');
if (statsSection) statsObserver.observe(statsSection);

// ===== PRICING TOGGLE =====
const pricingToggle = document.getElementById('pricingToggle');
const monthlyLabel = document.getElementById('monthlyLabel');
const annualLabel = document.getElementById('annualLabel');
const monthlyPrices = document.querySelectorAll('.monthly-price');

// Monthly prices
const prices = {
    monthly: [25, 75, 150],
    annual: [20, 60, 120]
};

let isAnnual = false;

pricingToggle.addEventListener('click', () => {
    isAnnual = !isAnnual;
    pricingToggle.classList.toggle('on', isAnnual);

    monthlyLabel.classList.toggle('active', !isAnnual);
    annualLabel.classList.toggle('active', isAnnual);

    const currentPrices = isAnnual ? prices.annual : prices.monthly;
    monthlyPrices.forEach((el, i) => {
        el.textContent = currentPrices[i];
    });
});

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll(
    '.product-card, .testimonial-card, .pricing-card, .stat-item'
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    revealObserver.observe(el);
});

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});