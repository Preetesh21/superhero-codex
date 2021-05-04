console.log("You are here..");
const container = document.getElementById('app');

document.getElementById("myDIV").style.fontSize = "xxx-large";
document.getElementById("myDIV").style.textAlign = "center";

let button = document.querySelector('#button')
button.addEventListener('click', sayhello);


async function data(id) {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = `https://superheroapi.com/api/830451297820471/${id}`; // site that doesn’t send Access-Control-*
    const response = await fetch(proxyurl + url); // https://cors-anywhere.herokuapp.com/https://example.com
    const data = await response.json();
    //console.log(data.work);
    const transformedhero = {
        id: data.id,
        name: data.name,
        strength: data.powerstats.strength,
        publisher: data.biography.publisher,
        type: data.appearance.race,
        image: data.image.url,
        align: data.biography.alignment,
    };

    showhero(transformedhero);
};


const showhero = (poke) => {
    let output = `

            <div class="card" id='card'>
              <span class="card--id">#${poke.publisher}</span>
              <img class="card--image" src=${poke.image} alt=${poke.name} onclick="window.open(this.src)" />
              <h1 class="card--name">${poke.name}</h1>
              <span class="card--details">${poke.type}</span>
              <h3> affiliations towards::${poke.align }</h3>
              <h5> strength=${poke.strength }</h5>
            </div>
      `;
    document.getElementById('app').innerHTML += output;
};


async function fetchData(number) {
    var i = 1;
    while (i < number) {
        data(i);
        i++;
    }
};


function removeDummy() {
    var elem = document.getElementById('app');
    elem.parentNode.removeChild(elem);
    var div = document.createElement("div");
    div.id = "app";
    document.getElementById("main").appendChild(div);
    //container = document.getElementById('app');

}


function search() {
    var elem = document.getElementById('name');
    console.log(elem.value);
    removeDummy();
    showhero2(elem.value);
}


async function showhero2(id) {
    const url = 'https://superheroapi.com/api/830451297820471/search/' + id;
    
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    //const url = `https://superheroapi.com/api/1132798347100433/search/${id}`; // site that doesn’t send Access-Control-*
    const response = await fetch(proxyurl + url); // https://cors-anywhere.herokuapp.com/https://example.com
   
    const data = await response.json();
    
    //console.log(data.length);
    if (data.response !== 'error') {
        console.log(data.results.length);

        for (var i = 0; i < data.results.length; i++) {

            //console.log(data.Results.length);
            console.log(data.results[i]);
            console.log(data.results[i].id);
            const transformedhero = {
                id: data.results[i].id,
                name: data.results[i].name,
                strength: data.results[i].powerstats.strength,
                publisher: data.results[i].biography.publisher,
                type: data.results[i].appearance.race,
                image: data.results[i].image.url,
                align: data.results[i].biography.alignment,
            };

            showhero(transformedhero);
        }
    } else {
        alert('Please Write a correct Name.')
    }
};


function sayhello() {
    var txt;
    if (confirm("If You Confirm then the cards will start generating 730 superheros.")) {
        fetchData(730);
    } else {
        txt = "You pressed Cancel!";
    }
}