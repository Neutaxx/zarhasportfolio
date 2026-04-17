/* ============================
   Portfolio — Zarha Neuta
   ============================ */

// View navigation (Home + Cycles)
const views = document.querySelectorAll('.view');
const navLinks = document.querySelectorAll('.nav-link[data-view]');
const dropdownItems = document.querySelectorAll('.dropdown-item');
const cycleCards = document.querySelectorAll('.cycle-card');

function showView(viewId) {
    views.forEach(v => v.classList.remove('active'));
    const target = document.getElementById(viewId);
    if (target) target.classList.add('active');

    // Update nav state: Home button active only when home view
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    if (viewId === 'home') {
        document.querySelector('.nav-link[data-view="home"]').classList.add('active');
    } else {
        document.querySelector('.dropdown-trigger').classList.add('active');
    }

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => showView(link.dataset.view));
});

dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
        showView(item.dataset.view);
        // Close dropdown after click
        const dropdown = item.closest('.nav-dropdown');
        dropdown.classList.remove('open');
        setTimeout(() => dropdown.classList.remove('force-open'), 100);
    });
});

cycleCards.forEach(card => {
    card.addEventListener('click', () => showView(card.dataset.view));
});

// Brand click → go home
document.querySelector('.brand').addEventListener('click', () => showView('home'));

// Mobile-friendly dropdown toggle
const dropdownTrigger = document.querySelector('.dropdown-trigger');
dropdownTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownTrigger.closest('.nav-dropdown').classList.toggle('open');
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown')) {
        document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
    }
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');

document.addEventListener('click', (e) => {
    const slot = e.target.closest('.image-slot');
    if (slot && !slot.classList.contains('empty')) {
        const img = slot.querySelector('img');
        if (img) {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('active');
        }
    }
});

lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('active');
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') lightbox.classList.remove('active');
});

// Gentle parallax on sparkles
document.addEventListener('mousemove', (e) => {
    const sparkles = document.querySelectorAll('.sparkle');
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    sparkles.forEach((s, i) => {
        const factor = (i % 3 + 1) * 0.5;
        s.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
});

// Handle broken images — swap to empty placeholder
document.querySelectorAll('.image-slot img').forEach(img => {
    img.addEventListener('error', () => {
        const slot = img.parentElement;
        slot.classList.add('empty');
        img.remove();
        if (!slot.querySelector('span')) {
            const span = document.createElement('span');
            span.textContent = '+ Add image';
            slot.appendChild(span);
        }
    });
});
