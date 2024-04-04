import { secretKey } from './secretkey.js';
const marvelAPI = secretKey.marvelAPI;
const mainURL = "https://gateway.marvel.com/v1/public/";
const mainURLHeader = `&apikey=${marvelAPI.apiKey}&hash=${marvelAPI.hash}?ts=1`;

export let getData = async (value) => {
    let response = await fetch(`${mainURL}characters?nameStartsWith=${value}${mainURLHeader}`)
    // .then(data => data.json());
    response = await response.json()
    return response.data.results;
}
