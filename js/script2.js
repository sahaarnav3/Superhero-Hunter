import { favouriteHeroes, deleteFavouriteHero } from "./script.js";

(function () {
    if (Object.keys(favouriteHeroes).length <= 0) {
        document.querySelector(".over-main2").innerHTML =
            `
                <p class="start">Start Adding Your Favourite Heroes to the list..</p>
            `;
            return;
    }
    document.querySelector(".over-main2").innerHTML = "";
    for (const key in favouriteHeroes) {
        // console.log(key, favouriteHeroes[key].thumbnail.path);
        document.querySelector(".over-main2").innerHTML +=
            `
            <div class="fav-card">
                <img src="${favouriteHeroes[key].thumbnail.path}/standard_fantastic.jpg"
                    alt="card-image">
                <div class="card-details">
                    <h1 id="hero-name">${favouriteHeroes[key].name}</h1>
                    <p>id <span id="hero-id">${favouriteHeroes[key].id}</span></p>
                    <p>comic <span id="hero-comic">${favouriteHeroes[key].comics.available}</span></p>
                    <p>series <span id="hero-series">${favouriteHeroes[key].series.available}</span></p>
                    <p>stories <span id="hero-stories">${favouriteHeroes[key].stories.available}</span></p>
                </div>
                <div class="card-buttons">
                    <button class="more-info"><img class="invert" src="https://cdn.hugeicons.com/icons/information-diamond-solid-rounded.svg"
                            alt="information-diamond" width="28" height="28">More Info</button>
                    <button class="delete-hero" id=${favouriteHeroes[key].id}><img class="invert" src="https://cdn.hugeicons.com/icons/heart-remove-solid-rounded.svg"
                            alt="heart-remove" width="28" height="28">Remove From Favourites</button>
                </div>
            </div>
            `;
    }
    document.querySelectorAll(".delete-hero").forEach(element => {
        element.addEventListener("click", (e) => {
            console.log(e.target.id);
            deleteFavouriteHero(e.target.id);
            location.reload();
        })
    });
})();

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