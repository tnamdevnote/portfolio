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
    // navbarMenu.classList.remove('active')
});

// Scroll to selected page when the user selects a page on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (e) => {
    const target = e.target;
    const link = target.dataset.link;
    const activeMenu = document.querySelector('.navbar__menu__item.active');
    activeMenu.classList.remove('active');
    target.classList.add('active');
    if (link === undefined) return;
    scrollIntoView(link);
});

// Scroll to home when the user clicks the logo
const navLogo = document.querySelector('.navbar__logo');
navLogo.addEventListener('click', () => {
    scrollIntoView('#home')
});

// Activate navbar menu as user scroll through the browser
const sectionIds = ['#home', '#about', '#skills', '#work', '#testimonials', '#contact'];
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => 
    document.querySelector(`[data-link='${id}']`)
);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
const selectNavItem = (selected) => {
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}

const scrollIntoView = (selector) => {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: "smooth", block: "start" });
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
};

const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3,
    };
    
const handleIntersect = (entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting && entry.intersectionRatio > 0) {
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            if(entry.boundingClientRect.y < 0) {
                selectedNavIndex = index + 1
            } else {
                selectedNavIndex = index -1
            }
        }
    })
};

const observer = new IntersectionObserver(handleIntersect, options);
sections.forEach((section) => observer.observe(section));

window.addEventListener('wheel', () => {
    if (window.scrollY === 0) {
        selectedNavIndex = 0;
    } else if (Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight) {
        selectedNavIndex = navItems.length-1;
    }
    selectNavItem(navItems[selectedNavIndex]);
})

// Open up navbar when the user clicks toggle button
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
})

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

// Handle click on the "arrow up" button
scrollTopBtn.addEventListener('click', () => {
   scrollIntoView('#home');
})

// Filter Projects Based on the categories
const workCategories = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workCategories.addEventListener('click', (e) => {
    const category = e.target.dataset.category || e.target.parentNode.dataset.category;
    if(category === null) return;

    // Remove selection from the previous item and select the new one
    const active = document.querySelector('.category__btn.active');
    active.classList.remove('active');
    const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    target.classList.add('active');

    projectContainer.classList.add('anime-out');
    setTimeout(() => {
        projects.forEach(project => {
            if (category === '*' || category === project.dataset.type) {
                project.classList.remove('invisible');
            } else {
                project.classList.add('invisible');
            }
        })
        projectContainer.classList.remove('anime-out');
    }, 200)
});

