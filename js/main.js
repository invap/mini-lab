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
const dialogImportantDataSection = document.querySelector('#dialog-important-data-section');
const dialogImportantData = document.querySelector('#dialog-important-data');
const dialogActivitiesSection = document.querySelector('#dialog-activities-section');
const dialogActivities = document.querySelector('#dialog-activities');
const dialogHelpSection = document.querySelector('#dialog-help-section');
const dialogHelp = document.querySelector('#dialog-help');

const themeToggle = document.querySelector('#theme-toggle');
const savedTheme = localStorage.getItem('theme') || 'light';

const componentDialogClose = document.querySelector('#component-dialog-close');
// const componentDialogCloseButton = document.querySelector('#component-dialog-close-button');

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
            "https://www.raspberrypi.com/documentation/microcontrollers/pico-series.html",
        importantData: ["Es la placa principal del kit", "Trabaja con lógica de 3.3V", "Microcontrolador RP2040", "Memoria Flash de 2 MB", "Conectividad USB 1.1", "Conectividad wireless Bluetooth 5.2 y Wi-Fi 4", "Velocidad de reloj de hasta 133 MHz", "40 pines GPIO"],
        activities: ["Construcción de circuitos", "Programación de microcontroladores", "Desarrollo de proyectos electrónicos"],
        help: "Si necesitas ayuda para utilizar la Raspberry Pi Pico 2, puedes consultar la documentación oficial o buscar tutoriales en línea." //ACA VA EL LINK A LA SECCION DE AYUDA Y PROBLEMAS
    },

    "protoboard": {
        title: "Protoboard",
        image: "../assets/images/protoboard.jpg",
        description:
            "La protoboard permite construir circuitos sin necesidad de soldar.",
        use:
            "La vamos a utilizar para conectar la placa con LEDs, resistencias, sensores y otros componentes.",
        documentationText: "Guía de uso de la protoboard",
        documentation: "https://learn.sparkfun.com/tutorials/how-to-use-a-breadboard/all",
        importantData: ["Material: Fibra de vidrio", "Dimensiones: 83,3 mm x 53,3 mm", "Puntos de conexión: 80"]
    },

    "mpu6050": {
        title: "MPU6050",
        image: "../assets/images/MPU6050.png",
        description:
            "El MPU6050 combina un acelerómetro y un giroscopio.",
        use:
            "Lo vamos a utilizar para medir movimiento, aceleración y orientación.",
        documentationText: "Documentación del MPU6050",
        documentation: "https://product.tdk.com/en/search/sensor/mortion-inertial/imu/info?part_no=MPU-6050",
        importantData: ["Acelerómetro: 16 bits", "Giroscopio: 16 bits", "Comunicación I2C"]
    },

    "dupont-macho-macho": {
        title: "Cables Dupont macho-macho",
        image: "../assets/images/dupont-macho-macho.jpg",
        description:
            "Cables Dupont macho-macho utilizados para conectar componentes en la protoboard.",
        use:
            "Los vamos a utilizar para establecer conexiones entre la placa y los distintos componentes del kit.",
        documentationText: null,
        documentation: null,
        importantData: ["Cantidad: 40 cables", "Longitud: 20 cm", "Conectores: Macho en ambos extremos"]
    },

    "led-rojo": {
        title: "LED rojo",
        image: "../assets/images/led-rojo.jpg",
        description:
            "LED de color rojo utilizado para indicación visual en proyectos electrónicos.",
        use:
            "Lo vamos a utilizar para crear indicadores de estado o señales visuales.",
        documentationText: "Guía sobre LEDs y su funcionamiento",
        documentation: "https://learn.sparkfun.com/tutorials/light-emitting-diodes-leds/all",
        importantData: ["Color: Rojo", "Tensión directa: 2V", "Corriente directa: 20 mA", "Ángulo de visión: 30°", "Pata larga: Ánodo (+), Pata corta: Cátodo (-)"]
    },
    "resistencias": {
        title: "Resistencias",
        image: "../assets/images/resistencias.jpg",
        description:
            "Resistencias utilizadas para controlar el flujo de corriente en los circuitos.",
        use:
            "Las vamos a utilizar para limitar la corriente que fluye a través de los componentes del kit.",
        documentationText: "Guía sobre resistencias y su funcionamiento",
        documentation: "https://learn.sparkfun.com/tutorials/resistors/all",
        importantData: ["Valores: 220Ω, 1kΩ, 4.7kΩ, 10kΩ", "Potencia nominal: 1/4 vatios" ]
    },

    "boton-pulsador": {
        title: "Botón pulsador",
        image: "../assets/images/boton-pulsador.png",
        description:
            "Botón pulsador utilizado para interactuar con los circuitos.",
        use:
            "Lo vamos a utilizar para activar o desactivar funciones en nuestros proyectos.",
        documentationText: "Guía sobre botones y su funcionamiento",
        documentation: "https://learn.sparkfun.com/tutorials/button-and-switch-basics/all",
        importantData: ["Tipo: Momentáneo", "Tensión máxima: 12V", "Corriente máxima: 50 mA"]
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
    dialogImportantData.innerHTML = '';
    dialogActivities.innerHTML = '';

    if (component.activities && component.activities.length > 0) {
        component.activities.forEach((activity) => {
            const listItem = document.createElement('li');
            listItem.textContent = activity;
            dialogActivities.appendChild(listItem);
        });
        dialogActivitiesSection.style.display = "block";
    } else {
        dialogActivitiesSection.style.display = "none";
    }

    if (component.importantData && component.importantData.length > 0) {
        component.importantData.forEach((data) => {
            const listItem = document.createElement('li');
            listItem.textContent = data;
            dialogImportantData.appendChild(listItem);
        });
        dialogImportantDataSection.style.display = "block";
    } else {
        dialogImportantDataSection.style.display = "none";
    }

    if (component.documentation) {
        dialogDocumentation.href = component.documentation;
        dialogDocumentationText.textContent = component.documentationText;
        dialogDocumentation.style.display = "flex";
    } else {
        dialogDocumentation.style.display = "none";
    }

    if (component.help) {
        dialogHelp.href = component.help;
        dialogHelpSection.style.display = "block";
    } else {
        dialogHelpSection.style.display = "none";
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
// componentDialogCloseButton.addEventListener('click', closeComponentDialog);
componentDialog.addEventListener('click', (event) => {
    if (event.target === componentDialog) {
        closeComponentDialog();
    }
});

document.documentElement.dataset.theme = savedTheme;
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.dataset.theme;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);
});

menuButton.addEventListener('click', openMenu);
menuCloseButton.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);   