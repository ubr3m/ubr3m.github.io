const mapButtons = document.querySelectorAll(".atlas-map-item");
const activeMapFrame = document.getElementById("activeMapFrame");
const activeMapTitle = document.getElementById("activeMapTitle");
const activeMapTag = document.getElementById("activeMapTag");
const activeMapDescription = document.getElementById("activeMapDescription");
const activeMapLink = document.getElementById("activeMapLink");
const mapLoader = document.getElementById("mapLoader");
const mapStartMessage = document.getElementById("mapStartMessage");
const atlasDisplay = document.querySelector(".atlas-display");

let activeLoadToken = 0;
let loaderTimer = null;
let currentMapSource = "";

function showLoader() {
    if (!mapLoader || !activeMapFrame) {
        return;
    }

    if (mapStartMessage) {
        mapStartMessage.classList.add("is-hidden");
    }

    activeMapFrame.classList.add("is-loading");
    mapLoader.classList.remove("is-hidden");
    mapLoader.classList.add("is-visible");
}

function hideLoader(loadToken) {
    if (!mapLoader || !activeMapFrame) {
        return;
    }

    if (loadToken !== activeLoadToken) {
        return;
    }

    activeMapFrame.classList.remove("is-loading");
    mapLoader.classList.remove("is-visible");
    mapLoader.classList.add("is-hidden");
}

function updateActiveButton(selectedButton) {
    mapButtons.forEach((button) => {
        button.classList.remove("is-active");
        button.setAttribute("aria-pressed", "false");
    });

    selectedButton.classList.add("is-active");
    selectedButton.setAttribute("aria-pressed", "true");
}

function scrollToMapOnMobile() {
    const isMobile = window.matchMedia("(max-width: 700px)").matches;

    if (!isMobile || !atlasDisplay) {
        return;
    }

    setTimeout(() => {
        atlasDisplay.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }, 120);
}

function updateMapContent(button) {
    const title = button.dataset.title;
    const tag = button.dataset.tag;
    const description = button.dataset.desc;
    const source = button.dataset.src;
    const link = button.dataset.link;
    const loadingDuration = Number(button.dataset.loaderDuration || 5000);

    activeLoadToken += 1;
    const currentLoadToken = activeLoadToken;

    activeMapTitle.textContent = title;
    activeMapTag.textContent = tag;
    activeMapDescription.textContent = description;
    activeMapLink.href = link;
    activeMapLink.classList.remove("is-disabled");
    activeMapLink.removeAttribute("aria-disabled");
    activeMapFrame.title = title;

    activeMapFrame.setAttribute("allow", "geolocation; fullscreen; clipboard-read; clipboard-write");

    scrollToMapOnMobile();

    clearTimeout(loaderTimer);

    if (currentMapSource === source) {
        activeMapFrame.classList.remove("is-loading");
        mapLoader.classList.remove("is-visible");
        mapLoader.classList.add("is-hidden");
        return;
    }

    currentMapSource = source;

    showLoader();

    activeMapFrame.src = source;

    loaderTimer = setTimeout(() => {
        hideLoader(currentLoadToken);
    }, loadingDuration);
}

mapButtons.forEach((button) => {
    button.addEventListener("click", () => {
        updateActiveButton(button);
        updateMapContent(button);
    });
});