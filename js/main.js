const menuButton = document.querySelector('#menu-button');
const menuCloseButton = document.querySelector('#menu-closed');
const navigation = document.querySelector('#main-navigation');
const overlay = document.querySelector('#menu-overlay');

const componentCards = document.querySelectorAll('.component-card');
const componentDialog = document.querySelector('#component-dialog');
const dialogTitle = document.querySelector('#dialog-title');
const dialogImage = document.querySelector('#dialog-image');
const dialogDescription = document.querySelector('#dialog-description');
const dialogUse = document.querySelector('#dialog-use');
const dialogDocumentation = document.querySelector('#dialog-documentation');
const dialogDocumentationText = document.querySelector('#dialog-documentation-text');

const componentDialogClose = document.querySelector('#component-dialog-close');
const componentDialogCloseButton = document.querySelector('#component-dialog-close-button');

const components = {

    "raspberry-pi-pico-2": {
        title: "Raspberry Pi Pico 2",
        image: "../assets/images/raspberry-pi-pico-2-wh.png",
        description:
            "La Raspberry Pi Pico 2 es la placa principal del kit.",
        use:
            "La vamos a utilizar para ejecutar programas y conectar los distintos componentes del kit.",
        documentationText: "Documentación de la Raspberry Pi Pico 2",
        documentation:
            "https://www.raspberrypi.com/documentation/microcontrollers/pico-series.html"
    },

    "protoboard": {
        title: "Protoboard",
        image: "../assets/images/protoboard.jpg",
        description:
            "La protoboard permite construir circuitos sin necesidad de soldar.",
        use:
            "La vamos a utilizar para conectar la placa con LEDs, resistencias, sensores y otros componentes.",
        documentationText: "Guía de uso de la protoboard",
        documentation: "https://learn.sparkfun.com/tutorials/how-to-use-a-breadboard/all"
    },

    "mpu6050": {
        title: "MPU6050",
        image: "../assets/images/MPU6050.png",
        description:
            "El MPU6050 combina un acelerómetro y un giroscopio.",
        use:
            "Lo vamos a utilizar para medir movimiento, aceleración y orientación.",
        documentationText: "Documentación del MPU6050",
        documentation: "https://product.tdk.com/en/search/sensor/mortion-inertial/imu/info?part_no=MPU-6050"
    },

    "dupont-macho-macho": {
        title: "Cables Dupont macho-macho",
        image: "../assets/images/dupont-macho-macho.jpg",
        description:
            "Cables Dupont macho-macho utilizados para conectar componentes en la protoboard.",
        use:
            "Los vamos a utilizar para establecer conexiones entre la placa y los distintos componentes del kit.",
        documentationText: null,
        documentation: null
    },

    "led-rojo": {
        title: "LED rojo",
        image: "../assets/images/led-rojo.jpg",
        description:
            "LED de color rojo utilizado para indicación visual en proyectos electrónicos.",
        use:
            "Lo vamos a utilizar para crear indicadores de estado o señales visuales.",
        documentationText: "Guía sobre LEDs y su funcionamiento",
        documentation: "https://learn.sparkfun.com/tutorials/light-emitting-diodes-leds/all"
    },
    "resistencias": {
        title: "Resistencias",
        image: "../assets/images/resistencias.jpg",
        description:
            "Resistencias utilizadas para controlar el flujo de corriente en los circuitos.",
        use:
            "Las vamos a utilizar para limitar la corriente que fluye a través de los componentes del kit.",
        documentationText: "Guía sobre resistencias y su funcionamiento",
        documentation: "https://learn.sparkfun.com/tutorials/resistors/all"
    },

    "boton-pulsador": {
        title: "Botón pulsador",
        image: "../assets/images/boton-pulsador.png",
        description:
            "Botón pulsador utilizado para interactuar con los circuitos.",
        use:
            "Lo vamos a utilizar para activar o desactivar funciones en nuestros proyectos.",
        documentationText: "Guía sobre botones y su funcionamiento",
        documentation: "https://learn.sparkfun.com/tutorials/button-and-switch-basics/all"
    }

};

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

function openComponentDialog(componentId) {
    const component = components[componentId];
    if (!component) return;

    dialogTitle.textContent = component.title;
    dialogImage.src = component.image;
    dialogImage.alt = component.title;
    dialogDescription.textContent = component.description;
    dialogUse.textContent = component.use;
    if (component.documentation) {
        dialogDocumentation.href = component.documentation;
        dialogDocumentationText.textContent = component.documentationText;
        dialogDocumentation.style.display = "flex";
    } else {
        dialogDocumentation.style.display = "none";
    }

    componentDialog.showModal();
    document.body.classList.add('no-scroll');
}
function closeComponentDialog() {
    componentDialog.close();
    document.body.classList.remove('no-scroll');
}

componentCards.forEach((card) => {
    card.addEventListener('click', () => {
        openComponentDialog(card.dataset.component);
    });
});
componentDialogClose.addEventListener('click', closeComponentDialog);
componentDialogCloseButton.addEventListener('click', closeComponentDialog);
componentDialog.addEventListener('click', (event) => {
    if (event.target === componentDialog) {
        closeComponentDialog();
    }
});

menuButton.addEventListener('click', openMenu);
menuCloseButton.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);   