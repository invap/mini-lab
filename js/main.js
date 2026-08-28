const menuButton = document.querySelector('#menu-button');
const menuCloseButton = document.querySelector('#menu-closed');
const navigation = document.querySelector('#main-navigation');
const overlay = document.querySelector('#menu-overlay');

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

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeMenu();
    }
});


menuButton.addEventListener('click', openMenu);
menuCloseButton.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);   