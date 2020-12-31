//write a function to retrieve a blob of json
// make an ajax request! use 'fetch' function

//2015
// function fetchAlbums() {
//   fetch("https://rallycoding.herokuapp.com/api/music_albums")
//     .then((res) => res.json())
//     .then((json) => console.log(json));
// }
//fetchAlbums();

//2017
async function fetchAlbums() {
    const res = await fetch("https://rallycoding.herokuapp.com/api/music_albums");
    const json = await res.json();
    
    console.log(json);
  }

fetchAlbums();

//with arrow function
const fetchAlbums = async () => {
    const res = await fetch("https://rallycoding.herokuapp.com/api/music_albums");
    const json = await res.json();
    
    console.log(json);
}
fetchAlbums();


//Paste the code in the console with the homepage of
// http://rallycoding.herokuapp.com/api/music_albums

//Async Request: returns a promise
//.then() called if request is successful with the value returned from the async request

//fetch returns promise:
//.then(res => res.json()) fetch resolves its promis with an object representin the request. you can get the real json response by calling'.json()' on it
// this returns another promise

//.then(json => console.log(json)) //after getting the json, console.log it
