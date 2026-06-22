// ============================================
// PROJECT 3: INTERACTIVE WEB ELEMENTS
// DecodeLabs Internship 2026
// Author: Zainab R
// ============================================

// ============================================
// DOM REFERENCES (using js- prefix for hooks)
// ============================================

// Theme toggle
const themeToggleBtn = document.querySelector('.js-theme-toggle');

// Mobile navigation
const hamburgerBtn = document.querySelector('.js-hamburger-btn');
const mobileNav = document.querySelector('.js-mobile-nav');
const navCloseBtn = document.querySelector('.js-nav-close');
const navBackdrop = document.querySelector('.js-nav-backdrop');
const mobileLinks = document.querySelectorAll('.js-mobile-link');

// Counter
const counterButtons = document.querySelectorAll('.js-counter-btn');
const counterValueEl = document.querySelector('.js-counter-value');
const counterMessageEl = document.querySelector('.js-counter-message');

// Add to Cart
const addToCartButtons = document.querySelectorAll('.js-add-to-cart');
const cartStatusEl = document.querySelector('.js-cart-status');
const cartTotalEl = document.querySelector('.js-cart-total');

// View Details toggle
const toggleDetailsButtons = document.querySelectorAll('.js-toggle-details');

// ============================================
// STATE MANAGEMENT
// ============================================

let isDarkMode = localStorage.getItem('darkMode') === 'true';
let orderCount = 0;
let cartItems = [];

// ============================================
// 1. DARK MODE TOGGLE (Project 3 - Interactive)
// IPO Loop: Click → Check State → Toggle Class & Save
// ============================================

function applyTheme() {
    document.body.classList.toggle('dark-mode', isDarkMode);
    themeToggleBtn.textContent = isDarkMode ? '☀️' : '🌙';
    themeToggleBtn.setAttribute('aria-pressed', String(isDarkMode));
}

function handleThemeToggle() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
    applyTheme();
}

themeToggleBtn.addEventListener('click', handleThemeToggle);
applyTheme();

// ============================================
// 2. COUNTER (Project 3 - Dynamic Content Update)
// IPO Loop: Click +/− → Update State → Update DOM
// ============================================

function increaseCounter() {
    orderCount++;
    counterMessageEl.textContent = '✅ Added an item!';
}

function decreaseCounter() {
    if (orderCount > 0) {
        orderCount--;
        counterMessageEl.textContent = '➖ Removed an item!';
    } else {
        counterMessageEl.textContent = '⚠️ Cannot go below 0!';
    }
}

function renderCounter() {
    counterValueEl.textContent = orderCount;
}

function handleCounterClick(event) {
    const action = event.currentTarget.dataset.action;

    if (action === 'increase') {
        increaseCounter();
    } else if (action === 'decrease') {
        decreaseCounter();
    }

    renderCounter();
}

counterButtons.forEach((btn) => {
    btn.addEventListener('click', handleCounterClick);
});

// ============================================
// 3. ADD TO CART (Project 3 - DOM Manipulation)
// IPO Loop: Click → Add Item → Update Cart Display
// ============================================

function updateCartStatus() {
    if (cartItems.length === 0) {
        cartStatusEl.textContent = '🛒 Cart is empty';
        return;
    }
    const lastItem = cartItems[cartItems.length - 1];
    cartStatusEl.textContent = `🛒 Added: ${lastItem} (${cartItems.length} items)`;
}

function updateCartTotal() {
    cartTotalEl.textContent = cartItems.length;
}

function flashAddedState(button) {
    const originalLabel = '🛒 Add';
    button.textContent = '✅ Added!';
    button.classList.add('is-added');
    button.disabled = true;

    setTimeout(() => {
        button.textContent = originalLabel;
        button.classList.remove('is-added');
        button.disabled = false;
    }, 1200);
}

function handleAddToCart(event) {
    const button = event.currentTarget;
    const itemName = button.dataset.item;

    cartItems.push(itemName);
    flashAddedState(button);
    updateCartStatus();
    updateCartTotal();
}

addToCartButtons.forEach((btn) => {
    btn.addEventListener('click', handleAddToCart);
});

// ============================================
// 4. VIEW DETAILS TOGGLE (Project 3 - Interactive)
// IPO Loop: Click → Toggle Class → Update Button Text
// ============================================

function handleToggleDetails(event) {
    const button = event.currentTarget;
    const card = button.closest('.card');
    const detailsBox = card.querySelector('.js-card-details');

    const isExpanded = detailsBox.classList.toggle('is-expanded');
    button.textContent = isExpanded ? '🔼 Hide Details' : '🔍 View Details';
    button.setAttribute('aria-expanded', String(isExpanded));
}

toggleDetailsButtons.forEach((btn) => {
    btn.addEventListener('click', handleToggleDetails);
});

// ============================================
// 5. MOBILE NAVIGATION (Project 2 - Responsive)
// ============================================

function openMobileNav() {
    mobileNav.classList.add('is-open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
    mobileNav.classList.remove('is-open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

hamburgerBtn.addEventListener('click', openMobileNav);
navCloseBtn.addEventListener('click', closeMobileNav);
navBackdrop.addEventListener('click', closeMobileNav);

mobileLinks.forEach((link) => {
    link.addEventListener('click', closeMobileNav);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeMobileNav();
    }
});

// ============================================
// IPO MODEL DEMO (Console Log)
// ============================================

console.log('🍽️ Zainab Restaurant — Interactive Web Elements loaded.');
console.log('IPO Loop active for: Theme Toggle, Order Counter, Add to Cart, View Details, Mobile Nav.');