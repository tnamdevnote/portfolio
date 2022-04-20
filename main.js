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

const scrollIntoView = (selector) => {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: "smooth", block: "start" })
} 