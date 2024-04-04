import { getData } from './mainMarvelAPI.js';

// ---------- ALL FUNCTIONS BELOW ------------- // 

const searchAndPopulate = async (value) => {
    if (!value) {
        return;
    }
    console.log(await getData(value));
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