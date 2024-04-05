import { getData } from './mainMarvelAPI.js';
import { getDataWithID } from './mainMarvelAPI.js';
export let favouriteHeroes = {};


// ---------- ALL FUNCTIONS BELOW ------------- // 

//to fetch all favourite heroes from previous session(s) -- 
(function () {
    favouriteHeroes = JSON.parse(localStorage.getItem("favouriteHeroes")) || {};
    if (!favouriteHeroes)
        return;
})();

//this function will be called when favourite button is pressed and will store the hero in both favouriteHero array and local storage --
// -- to persist the state itself..
const storeFavouriteHero = async (heroID) => {
    //After getting the id I will make an API call to fetch all the details and store it as key value pair in the favouriteHeroes array.
    // console.log(favouriteHeroes)
    let heroKeys = Object.keys(favouriteHeroes);
    if (!heroKeys.includes(heroID))
        favouriteHeroes[heroID] = (await getDataWithID(heroID))[0];
    console.log(favouriteHeroes);
    localStorage.setItem("favouriteHeroes", JSON.stringify(favouriteHeroes));
}
//Below function will be used to delete hero from fav list and persist it as well.
export const deleteFavouriteHero = (heroID) => {
    let heroKeys = Object.keys(favouriteHeroes);
    if(heroKeys.includes(heroID)){
        delete favouriteHeroes[heroID];
        localStorage.setItem("favouriteHeroes", JSON.stringify(favouriteHeroes));
    } else 
        return;
}

//Below function will be used for populating all the results from searching into the .search-results class..
const populateSearchResults = (arr) => {
    // console.log(arr[0]);
    arr.forEach(element => {
        const presentInFav = Object.keys(favouriteHeroes).includes(String(element.id)) ? true : false;

        document.querySelector(".search-results").innerHTML +=
            `   
                <div class="result-cards" id="${element.id}">
                    <img src="${element.thumbnail.path}/portrait_medium.jpg"
                        alt="result-image">
                    <p>${element.name}</p>
                    <button class="fav-button" id="${element.id}"><img class="invert"
                                src="https://cdn.hugeicons.com/icons/${presentInFav ? "heart-remove-solid-rounded" : "heart-add-solid-rounded"}.svg"
                                alt="heart-add" width="28" height="28">${presentInFav ? "Remove From Favourites" : "Add To Favourites"}
                    </button>
                </div>
            `;
    });
    document.querySelectorAll(".fav-button").forEach(elem => {
        elem.addEventListener("click", (e) => {
            // storeFavouriteHero(e.target.parentElement.id);
            const id = e.target.parentElement.id
            if(Object.keys(favouriteHeroes).includes(id)){
                deleteFavouriteHero(id);
            }
            else {
                storeFavouriteHero(id);
            }
        });
    });
}

//Below function is being used  to make the actual API Call...
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
    console.log("fav clicked");
});
document.querySelector(".logo").addEventListener("click", () => {
    window.location.href = '../index.html';
});
document.querySelector(".logo2").addEventListener("click", () => {
    window.location.href = '../index.html';
});
//This if here is too imp, see we are working in multi page website so what was happening was if you try exporting only the array, stil
//-- the whole scipt was soemhow invoked, so what if did was, this below func will only be invoked if it finds .start-button 
// -- in the current dom itself WOWWW.
if (document.querySelector(".start-button")) {
    document.querySelector(".start-button").addEventListener("click", () => {
        document.querySelector(".over-main").style.left = 0;
        document.querySelector(".start-button").classList.add("hidden");
        document.querySelector(".background").style.filter = "blur(7px)";
    });
}

//below I am addfing an event listener to get the value typed in input box, and  then fire the relevant function
if (document.querySelector(".search-hero input")) {
    document.querySelector(".search-hero input").addEventListener("keyup", (e) => {
        searchAndPopulate(e.target.value);
    });
}