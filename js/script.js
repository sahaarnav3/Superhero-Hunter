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
export const storeFavouriteHero = async (heroID) => {
    //After getting the id I will make an API call to fetch all the details and store it as key value pair in the favouriteHeroes array.
    let heroKeys = Object.keys(favouriteHeroes);
    if (!heroKeys.includes(heroID))
        favouriteHeroes[heroID] = (await getDataWithID(heroID))[0];
    localStorage.setItem("favouriteHeroes", JSON.stringify(favouriteHeroes));
}
//Below function will be used to delete hero from fav list and persist it as well.
export const deleteFavouriteHero = (heroID) => {
    let heroKeys = Object.keys(favouriteHeroes);
    if (heroKeys.includes(heroID)) {
        delete favouriteHeroes[heroID];
        localStorage.setItem("favouriteHeroes", JSON.stringify(favouriteHeroes));
    } else
        return;
}

//Below function will redirect to more info page with all the details if the hero clicked.
export const moreInfoClicked = async (heroID) => {
    const data = (await getDataWithID(heroID))[0];
    sessionStorage.setItem('moreInfoID', JSON.stringify(data));
    window.location.href = '/html/moreInfo.html';
}

//Below function will be used for populating all the results from searching into the .search-results class..
const populateSearchResults = (arr) => {
    arr.forEach(element => {
        const presentInFav = Object.keys(favouriteHeroes).includes(String(element.id)) ? true : false;

        document.querySelector(".search-results").innerHTML +=
            `   
                <div class="result-cards" id="${element.id}">
                    <img src="${element.thumbnail.path}/portrait_medium.jpg"
                        alt="result-image">
                    <p>${element.name}</p>
                    <button class="fav-button fav-button-${element.id}" id="${element.id}"><img class="invert"
                                src="https://cdn.hugeicons.com/icons/${presentInFav ? "heart-remove-solid-rounded" : "heart-add-solid-rounded"}.svg"
                                alt="heart-add" width="28" height="28">${presentInFav ? "Remove From Favourites" : "Add To Favourites"}
                    </button>
                </div>
            `;
    });
    //Below is the functionality for the add/remove favourite button in search results.
    document.querySelectorAll(".fav-button").forEach(elem => {
        elem.addEventListener("click", async (e) => {
            const id = e.target.parentElement.id
            if (Object.keys(favouriteHeroes).includes(id)) {
                deleteFavouriteHero(id);
                document.querySelector(`.fav-button-${id}`).innerHTML =
                `
                    <img class="invert" src="https://cdn.hugeicons.com/icons/heart-add-solid-rounded.svg"
                    alt="heart-add" width="28" height="28">Add To Favourites
                `
            }
            else {
                await storeFavouriteHero(id);
                document.querySelector(`.fav-button-${id}`).innerHTML =
                `
                    <img class="invert" src="https://cdn.hugeicons.com/icons/heart-remove-solid-rounded.svg"
                    alt="heart-add" width="28" height="28">Remove From Favourites
                `
            }
        });
    });
    //Adding click functionality so that when any search result is presses it shows more info about the hero...
    document.querySelectorAll(".result-cards p, img").forEach(elem => {
        elem.addEventListener("click", e => {
            moreInfoClicked(e.target.parentElement.id);
        })
    })
}

//Below function is being used  to make the actual API Call...
const searchAndPopulate = async (value) => {
    if (!value) {
        document.querySelector(".search-results").innerHTML = "";
        return;
    }
    document.querySelector(".search-results").innerHTML = "";
    populateSearchResults(await getData(value));
}



// ---------- ALL EVENTS BELOW ------------- // 
document.querySelector(".favourites").addEventListener("click", () => {
    window.location.href = '/html/favourites.html';
    //Remember these href will be appended after the port or project Name in github so adding .. will take it off the project in the github right..
});
document.querySelector(".logo").addEventListener("click", () => {
    window.location.href = '/index.html';
});
document.querySelector(".logo2").addEventListener("click", () => {
    window.location.href = '/index.html';
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