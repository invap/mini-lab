const menuButton = document.querySelector('#menu-button');
const menuCloseButton = document.querySelector('#menu-closed');
const navigation = document.querySelector('#main-navigation');
const overlay = document.querySelector('#menu-overlay');
const themeToggles = document.querySelectorAll("[data-theme-toggle]");
const savedTheme = localStorage.getItem('theme') || 'light';

function openMenu() {
    navigation.classList.add('site-nav--open');
    overlay.classList.add('menu-overlay--visible');

    menuButton.setAttribute('aria-expanded', 'true');
    document.addEventListener('click', clickAfueraDelHandler);
    document.body.classList.add('no-scroll');
}

function closeMenu() {
    navigation.classList.remove('site-nav--open');
    overlay.classList.remove('menu-overlay--visible');

    menuButton.setAttribute('aria-expanded', 'false');
    document.removeEventListener('click', clickAfueraDelHandler);
    document.body.classList.remove('no-scroll');
}

function clickAfueraDelHandler  (event) {
    if (!navigation.contains(event.target) && !menuButton.contains(event.target)) {
        closeMenu();
    }   
}

if (menuButton && menuCloseButton && navigation && overlay) {
    menuButton.addEventListener('click', openMenu);
    menuCloseButton.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navigation.classList.contains('site-nav--open')) {
            closeMenu();
        }
    });
}

document.documentElement.dataset.theme = savedTheme;
    themeToggles.forEach((toggle) =>{
        toggle.addEventListener("click", () => {
            const currentTheme = document.documentElement.dataset.theme;
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            document.documentElement.dataset.theme = newTheme;
            localStorage.setItem("theme", newTheme);
        })
    });
