'use strict';


// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
    if (window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
});

// Scroll to selected page when the user selects a page on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (e) => {
    const target = e.target;
    const link = target.dataset.link;
    if (link === undefined) return;
    
    scrollIntoView(link);
});

// Scroll to Contact page when the user clicks Contact Me button in Home
const contactBtn = document.querySelector('.home__contact');
contactBtn.addEventListener('click', ()=> {
    scrollIntoView('#contact')
});

// Make page transparent when user scrolls down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    home.style.opacity = 1 - window.scrollY/homeHeight;
})

// Add Scroll-to-top button at the bottom right corner of the window
const scrollTopBtn = document.querySelector('#scrollTop');
document.addEventListener('scroll', () => {
    if (window.scrollY > homeHeight) {
        scrollTopBtn.classList.add('scrollTop--show');
    } else {
        scrollTopBtn.classList.remove('scrollTop--show');
    }
})

// Handle clikc on the "arrow up" button
scrollTopBtn.addEventListener('click', () => {
   scrollIntoView('#home');
})






const scrollIntoView = (selector) => {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: "smooth", block: "start" })
};

