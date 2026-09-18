const menuButton = document.querySelector('#menu-button');
const menuCloseButton = document.querySelector('#menu-close');
const navigation = document.querySelector('#main-navigation');
const overlay = document.querySelector('#menu-overlay');
const themeToggles = document.querySelectorAll("[data-theme-toggle]");
const desktopLayout = window.matchMedia('(min-width: 1024px)');

let savedTheme = 'light';
try {
    if (localStorage.getItem('theme') === 'dark') {
        savedTheme = 'dark';
    }
} catch {
    // El sitio sigue funcionando cuando el navegador bloquea el almacenamiento.
}

function openMenu() {
    if (desktopLayout.matches) return;

    navigation.inert = false;
    navigation.classList.add('site-nav--open');
    overlay.classList.add('menu-overlay--visible');

    menuButton.setAttribute('aria-expanded', 'true');
    document.addEventListener('click', clickAfueraDelHandler);
    document.body.classList.add('no-scroll');
    menuCloseButton.focus();
}

function closeMenu(restoreFocus = true) {
    const wasOpen = navigation.classList.contains('site-nav--open');
    navigation.classList.remove('site-nav--open');
    navigation.inert = !desktopLayout.matches;
    overlay.classList.remove('menu-overlay--visible');

    menuButton.setAttribute('aria-expanded', 'false');
    document.removeEventListener('click', clickAfueraDelHandler);
    document.body.classList.toggle('no-scroll', Boolean(document.querySelector('dialog[open]')));
    if (wasOpen && restoreFocus && !desktopLayout.matches) {
        menuButton.focus();
    }
}

function clickAfueraDelHandler  (event) {
    if (!navigation.contains(event.target) && !menuButton.contains(event.target)) {
        closeMenu();
    }   
}

if (menuButton && menuCloseButton && navigation && overlay) {
    navigation.inert = !desktopLayout.matches;
    menuButton.addEventListener('click', openMenu);
    menuCloseButton.addEventListener('click', () => closeMenu());
    overlay.addEventListener('click', () => closeMenu());
    navigation.addEventListener('click', (event) => {
        if (event.target.closest('a[href]') && !desktopLayout.matches) {
            closeMenu();
        }
    });
    document.addEventListener('keydown', (event) => {
        if (!navigation.classList.contains('site-nav--open') || document.querySelector('dialog[open]')) return;

        if (event.key === 'Escape') {
            event.preventDefault();
            closeMenu();
        }

        if (event.key === 'Tab') {
            const focusable = [...navigation.querySelectorAll('a[href], button:not([disabled])')]
                .filter((element) => element.getClientRects().length > 0);
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && (document.activeElement === first || !navigation.contains(document.activeElement))) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && (document.activeElement === last || !navigation.contains(document.activeElement))) {
                event.preventDefault();
                first.focus();
            }
        }
    });

    desktopLayout.addEventListener('change', () => {
        const focusWasInNavigation = navigation.contains(document.activeElement);
        closeMenu(false);
        if (focusWasInNavigation) {
            const target = desktopLayout.matches
                ? navigation.querySelector('[aria-current="page"], a[href]')
                : menuButton;
            target?.focus();
        }
    });
}

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    themeToggles.forEach((toggle) => {
        toggle.setAttribute('aria-label', theme === 'dark' ? 'Activar tema claro' : 'Activar tema oscuro');
        toggle.setAttribute('aria-pressed', String(theme === 'dark'));
    });
}

applyTheme(savedTheme);
themeToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
        const newTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        try {
            localStorage.setItem('theme', newTheme);
        } catch {
            // El tema seleccionado se conserva durante esta visita.
        }
    });
});
