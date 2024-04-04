import { getData } from './mainMarvelAPI.js';
let favouriteHeroes = [];


// ---------- ALL FUNCTIONS BELOW ------------- // 

//to fetch all favourite heroes from previous session(s) -- 
(function () {
    favouriteHeroes = JSON.parse(localStorage.getItem("favouriteHeroes")) || null;
    if (favouriteHeroes === null)
        return;
})();


//Below function will be used for populating all the results from searching into the .search-results class..
const populateSearchResults = (arr) => {

    arr.forEach(element => {
        document.querySelector(".search-results").innerHTML +=
            `   
                <div class="result-cards" id="${element.id}">
                    <img src="${element.thumbnail.path}/portrait_medium.jpg"
                        alt="result-image">
                    <p>${element.name}</p>
                    <button class="fav-button" id="${element.id}"><img class="invert"
                                src="https://cdn.hugeicons.com/icons/heart-add-solid-rounded.svg"
                                alt="heart-add" width="28" height="28">Add to Favourites
                    </button>
                </div>
            `;
        });
    document.querySelectorAll(".fav-button").forEach(elem => {
        elem.addEventListener("click", (e) => {
            console.log(e.target.parentElement.id);
        })
    });
}

const searchAndPopulate = async (value) => {
    if (!value) {
        document.querySelector(".search-results").innerHTML = "";
        return;
    }
    document.querySelector(".search-results").innerHTML = "";
    let fetchedResults = [];
    populateSearchResults(await getData(value));
}



// ---------- ALL EVENTS BELOW ------------- // 
document.querySelector(".favourites").addEventListener("click", () => {
    window.location.href = '../html/favourites.html';
})
document.querySelector(".logo").addEventListener("click", () => {
    window.location.href = '../index.html';
})
document.querySelector(".logo2").addEventListener("click", () => {
    window.location.href = '../index.html';
})
document.querySelector(".start-button").addEventListener("click", () => {
    document.querySelector(".over-main").style.left = 0;
    document.querySelector(".start-button").classList.add("hidden");
    document.querySelector(".background").style.filter = "blur(7px)";
})


//below I am addfing an event listener to get the value typed in input box, and  then fire the relevant function
document.querySelector(".search-hero input").addEventListener("keyup", (e) => {
    searchAndPopulate(e.target.value);
})