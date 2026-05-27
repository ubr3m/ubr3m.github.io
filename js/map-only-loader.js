const mapLoader = document.getElementById("mapLoader");
const mapFrame = document.getElementById("mapFrame");

if (mapLoader && mapFrame) {
    const loaderDuration = Number(mapFrame.dataset.loaderDuration || 6000);

    setTimeout(() => {
        mapLoader.classList.add("is-hidden");
    }, loaderDuration);
}