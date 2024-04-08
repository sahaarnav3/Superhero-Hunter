import { storeFavouriteHero, deleteFavouriteHero, favouriteHeroes } from "./script.js";

const moreInfoID = JSON.parse(sessionStorage.getItem('moreInfoID'));

//Below function is used to render the contents of add/remove to/from the main favourites list..
const renderFavBtn = (value) => {
    if(value) {
        document.querySelector(".toggle-fav-btn").innerHTML =
        `
            <img class="invert"
            src="https://cdn.hugeicons.com/icons/heart-remove-solid-rounded.svg"
            alt="heart-remove" width="32" height="32">Remove From Favourites
        `
    } else {
        document.querySelector(".toggle-fav-btn").innerHTML =
        `
        <img class="invert"
        src="https://cdn.hugeicons.com/icons/heart-add-solid-rounded.svg"
        alt="heart-add" width="32" height="32">Add To Favourites
        `
    }
} 

if (moreInfoID) {
    document.querySelector(".img-and-description").innerHTML =
        `
    <img id="hero-img" src="${moreInfoID.thumbnail.path}/standard_fantastic.jpg"
    alt="card-image">
    <div class="name-and-desc">
        <h1>${moreInfoID.name}</h1>
        <p id="hero-description">"${moreInfoID.description ? `${moreInfoID.description}` : 'Decription Not Available'}"</p>
    </div>
    `;
    document.getElementById("hero-id").textContent = moreInfoID.id;
    document.getElementById("hero-comics").textContent = moreInfoID.comics.available;
    document.getElementById("hero-events").textContent = moreInfoID.events.available;
    document.getElementById("hero-series").textContent = moreInfoID.series.available;
    document.getElementById("hero-stories").textContent = moreInfoID.stories.available;
    renderFavBtn(Object.keys(favouriteHeroes).includes(String(moreInfoID.id)));
}

// ---------- ALL EVENTS BELOW ------------- //
document.querySelector(".favourites").addEventListener("click", () => {
    window.location.href = '../html/favourites.html';
});
document.querySelector(".logo").addEventListener("click", () => {
    window.location.href = '../index.html';
});
document.querySelector(".logo2").addEventListener("click", () => {
    window.location.href = '../index.html';
});
document.querySelector(".toggle-fav-btn").addEventListener("click", async (e) => {
    const heroID = document.getElementById("hero-id").innerText;
    if (Object.keys(favouriteHeroes).includes(String(heroID))) {
        deleteFavouriteHero(heroID);
        renderFavBtn(false);
    } else {
        storeFavouriteHero(heroID);
        renderFavBtn(true);
    }
})