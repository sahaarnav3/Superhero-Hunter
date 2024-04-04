document.querySelector(".favourites").addEventListener("click", () => {
    window.location.href = 'favourites.html';
})
document.querySelector(".logo").addEventListener("click", () => {
    window.location.href = 'index.html';
})
document.querySelector(".logo2").addEventListener("click", () => {
    window.location.href = 'index.html';
})
document.querySelector(".start-button").addEventListener("click", () => {
    document.querySelector(".over-main").style.left = 0;
    document.querySelector(".start-button").classList.add("hidden");
    document.querySelector(".background").style.filter = "blur(7px)";
})