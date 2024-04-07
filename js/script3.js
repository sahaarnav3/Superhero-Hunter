const moreInfoID = JSON.parse(sessionStorage.getItem('moreInfoID'));
console.log(moreInfoID);

// ---------- ALL EVENTS BELOW ------------- //
document.querySelector(".favourites").addEventListener("click", () => {
    window.location.href = '../html/favourites.html';
    console.log("fav clicked");
});
document.querySelector(".logo").addEventListener("click", () => {
    window.location.href = '../index.html';
    console.log("home clicked");
});
document.querySelector(".logo2").addEventListener("click", () => {
    console.log("home clicked");
    window.location.href = '../index.html';
});