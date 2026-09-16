const componentsGrid = document.querySelector("#components-grid");
const componentDialog = document.querySelector("#component-dialog");
const componentDialogClose = document.querySelector("#component-dialog-close");
const dialogTitle =document.querySelector("#dialog-title");
const dialogImage = document.querySelector("#dialog-image");
const dialogDescription = document.querySelector("#dialog-description");
const dialogUse = document.querySelector("#dialog-use");
const dialogDocumentation = document.querySelector("#dialog-documentation");
const dialogDocumentationText = document.querySelector("#dialog-documentation-text");
const dialogImportantDataSection = document.querySelector("#dialog-important-data-section");
const dialogImportantData = document.querySelector("#dialog-important-data");
const dialogActivitiesSection = document.querySelector("#dialog-activities-section");
const dialogActivities = document.querySelector("#dialog-activities");
const dialogHelpSection = document.querySelector("#dialog-help-section");
const dialogHelp = document.querySelector("#dialog-help");

const currentScriptUrl= document.currentScript.src;
const componentsDataUrl = new URL("../../data/componentes.json", currentScriptUrl);
const imagesBaseUrl = new URL("../../assets/images/", currentScriptUrl);

let components = {};

function updateComponentsCount(){
    const countElement = document.querySelector('#components-count');
    const labelElement = document.querySelector('#components-count-label');
    const count = Object.keys(components).length;
    if (countElement){
        countElement.textContent = count;
    }
    if(labelElement){
        labelElement.textContent = count === 1 ? 'componente incluido' : 'componentes incluidos'
    } 
}

/* =========================
    CARGA DE IMÁGENES
   ========================= */

function getComponentImageUrl(imageFileName) {
    return new URL(imageFileName, imagesBaseUrl).href;
}

/* =========================
    CARGA DE DATOS
   ========================= */

async function loadComponents() {
    const response = await fetch(componentsDataUrl);
    if (!response.ok) {
        throw new Error( `Error al cargar componentes: ${response.status}`);
    }
    components = await response.json();
}

/* =========================
    GENERAR TARJETAS
   ========================= */

function renderComponentCards() {
    componentsGrid.innerHTML = "";
    Object.entries(components).forEach(([componentId, component]) => {
            const card = document.createElement("article");
            card.classList.add("component-card");
            card.tabIndex = 0;
            card.setAttribute("role", "button");
            card.setAttribute("aria-label", `Ver detalles de ${component.title}`);
            card.dataset.component =componentId;

            /* Imagen */
            const imageContainer = document.createElement("div");
            imageContainer.classList.add("component-card__image-container");
            const image = document.createElement("img");
            image.classList.add("component-card__image");
            image.src = getComponentImageUrl(component.image);
            image.alt = component.title;

            imageContainer.appendChild(image);

            /* Contenido */
            const content = document.createElement("div");
            content.classList.add("component-card__content");

            const title = document.createElement("h2");
            title.classList.add("component-card__title");
            title.textContent = component.title;

            const description = document.createElement("p");
            description.classList.add("component-card__description");
            description.textContent = component.cardDescription;

            const details = document.createElement("span");
            details.classList.add("component-card__button");
            details.textContent = "Ver detalles →";

            content.append(title, description, details);
            card.append(imageContainer, content);
            componentsGrid.appendChild(card);
        }
    );
}

/* =========================
    ABRIR MODAL
   ========================= */

function openComponentDialog(componentId) {
    const component = components[componentId];
    if (!component) return;

    dialogTitle.textContent = component.title;
    dialogImage.src = getComponentImageUrl(component.image);
    dialogImage.alt = component.title;
    dialogDescription.textContent = component.description;
    dialogUse.textContent = component.use;

    /* Datos importantes */
    dialogImportantData.innerHTML = "";
    if (component.importantData && component.importantData.length > 0) {
        component.importantData.forEach((data) => {
                const item = document.createElement("li");
                item.textContent = data;
                dialogImportantData.appendChild(item);
            }
        );
        dialogImportantDataSection.style.display = "block";
    } else {
        dialogImportantDataSection.style.display = "none";
    }

    /* Actividades */
    dialogActivities.innerHTML = "";
    if (component.activities && component.activities.length > 0) {
        component.activities.forEach((activity) => {
                const item = document.createElement("li");
                item.textContent = activity;
                dialogActivities.appendChild(item);
            }
        );
        dialogActivitiesSection.style.display = "block";
    } else {
        dialogActivitiesSection.style.display = "none";
    }

    /* Ayuda */
    if (component.help) {
        dialogHelp.href = component.help;
        dialogHelpSection.style.display = "block";
    } else {
        dialogHelpSection.style.display = "none";
    }

    /* Documentación */
    if (component.documentation) {
        dialogDocumentation.href = component.documentation;
        dialogDocumentationText.textContent = component.documentationText;
        dialogDocumentation.style.display = "flex";
    } else {
        dialogDocumentation.style.display = "none";
    }

    componentDialog.showModal();
    document.body.classList.add("no-scroll");
}

/* =========================
    CERRAR MODAL
   ========================= */

function closeComponentDialog() {
    componentDialog.close();
    document.body.classList.remove("no-scroll");
}

/* =========================
    EVENTOS DEL GRID
   ========================= */

componentsGrid.addEventListener("click", (event) => {
        const card = event.target.closest(".component-card");
        if (!card) return;
        card.blur();

        openComponentDialog(card.dataset.component);
    }
);

componentsGrid.addEventListener("keydown", (event) => {
        const card = event.target.closest(".component-card");
        if (!card) return;

        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openComponentDialog(card.dataset.component);
        }
    }
);

/* =========================
    EVENTOS DEL MODAL
   ========================= */

componentDialogClose.addEventListener("click", closeComponentDialog);
componentDialog.addEventListener("click", (event) => {
        if (event.target === componentDialog) {
            closeComponentDialog();
        }
    }
);

componentDialog.addEventListener("close", () => {
        document.body.classList.remove("no-scroll");
    }
);

/* =========================
    INICIALIZACIÓN
   ========================= */

async function initializeComponents() {
    try {
        await loadComponents();
        updateComponentsCount();
        renderComponentCards();
    } catch (error) {
        console.error("Error al inicializar los componentes:", error);
    }
}

initializeComponents();