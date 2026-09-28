const stepButtons = [
    ...document.querySelectorAll("button[data-step-target]"),
];
const stepPanels = [...document.querySelectorAll("[data-step-panel]")];
const progressTrack = document.querySelector("#steps-progress-track");
const progressLabel = document.querySelector("#steps-progress-label");
const progressPercentage = document.querySelector(
    "#steps-progress-percentage",
);
const progressBar = document.querySelector("#steps-progress-bar");
const heroTitle = document.querySelector("#steps-hero-title");
const footerBack = document.querySelector(".steps-footer__back");
const footerBackLabel = document.querySelector("[data-step-back-label]");
const footerNext = document.querySelector("[data-step-next]");
const footerNextLabel = document.querySelector("[data-step-next-label]");
const stepIndicators = [
    ...document.querySelectorAll("[data-step-indicator]"),
];
const stepPlaceholders = new Map(
    [...document.querySelectorAll("[data-step-placeholder]")].map(
        (placeholder) => [
            Number(placeholder.dataset.stepPlaceholder),
            placeholder.querySelector(".steps-nav__label")?.textContent.trim(),
        ],
    ),
);
const siteNavigation = document.querySelector("#main-navigation");
const stepMenuCloseButton = document.querySelector("#menu-close");

const steps = new Map();

stepPanels.forEach((panel) => {
    const stepId = Number(panel.dataset.stepPanel);
    const button = stepButtons.find(
        (candidate) => Number(candidate.dataset.stepTarget) === stepId,
    );
    const title = panel.dataset.stepTitle;

    if (Number.isInteger(stepId) && stepId > 0 && button && title) {
        steps.set(stepId, { button, panel, title });
    }
});

const configuredTotal = Number(progressTrack?.dataset.totalSteps);
const totalSteps =
    Number.isInteger(configuredTotal) && configuredTotal >= steps.size
        ? configuredTotal
        : steps.size;
let currentStepId;

function showStep(stepId, shouldScroll = true) {
    const step = steps.get(stepId);

    if (!step) {
        return;
    }

    currentStepId = stepId;
    stepPanels.forEach((panel) => {
        panel.hidden = panel !== step.panel;
    });

    stepButtons.forEach((button) => {
        const isActive = button === step.button;
        button.classList.toggle("steps-nav__link--active", isActive);

        if (isActive) {
            button.setAttribute("aria-current", "step");
        } else {
            button.removeAttribute("aria-current");
        }
    });

    if (heroTitle) {
        heroTitle.textContent = step.title;
    }

    const percentage = Math.round((stepId / totalSteps) * 100);

    if (progressLabel) {
        progressLabel.textContent = `Paso ${stepId} de ${totalSteps}`;
    }

    if (progressPercentage) {
        progressPercentage.textContent = `${percentage}%`;
    }

    if (progressTrack) {
        progressTrack.setAttribute("aria-valuenow", String(percentage));
        progressTrack.setAttribute(
            "aria-valuetext",
            `Paso ${stepId} de ${totalSteps}: ${percentage}%`,
        );
    }

    if (progressBar) {
        progressBar.style.width = `${percentage}%`;
    }

    stepIndicators.forEach((indicator) => {
        const isActive =
            Number(indicator.dataset.stepIndicator) === stepId;
        indicator.classList.toggle("steps-footer__indicator--active", isActive);
    });

    const previousStep = steps.get(stepId - 1);

    if (footerBack && footerBackLabel) {
        footerBack.href = previousStep
            ? `#${previousStep.panel.id}`
            : "../conoce-tu-kit/";
        footerBackLabel.textContent = previousStep
            ? `Paso anterior: ${previousStep.title}`
            : "Volver a Conocé tu kit";
    }

    const nextStep = steps.get(stepId + 1);

    if (footerNext && footerNextLabel) {
        footerNext.disabled = !nextStep;
        footerNext.setAttribute("aria-disabled", String(!nextStep));
        footerNextLabel.textContent = nextStep
            ? `Continuar: ${nextStep.title}`
            : `Próximamente: ${stepPlaceholders.get(stepId + 1) ?? "siguiente paso"}`;
    }

    if (shouldScroll) {
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        window.scrollTo({
            top: 0,
            behavior: reduceMotion ? "auto" : "smooth",
        });
    }
}

stepButtons.forEach((button) => {
    button.addEventListener("click", () => {
        showStep(Number(button.dataset.stepTarget));

        if (siteNavigation?.classList.contains("site-nav--open")) {
            stepMenuCloseButton?.click();
        }
    });
});

footerBack?.addEventListener("click", (event) => {
    const previousStep = steps.get(currentStepId - 1);

    if (previousStep) {
        event.preventDefault();
        showStep(currentStepId - 1);
    }
});

footerNext?.addEventListener("click", () => {
    if (currentStepId && steps.has(currentStepId + 1)) {
        showStep(currentStepId + 1);
    }
});

const initialStepId = Number(
    document.querySelector("[data-step-target][aria-current='step']")
        ?.dataset.stepTarget,
);
showStep(
    steps.has(initialStepId) ? initialStepId : steps.keys().next().value,
    false,
);
