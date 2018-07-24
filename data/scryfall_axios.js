var axios = require('axios');
var fs = require('fs');

var pageCounter = 643;//now needs to be 901 to 1092`
var finalPage = 900; //1092
console.log(pageCounter);

async function scryfallCall (){

    var getRequest = 'https://api.scryfall.com/cards?page=' + pageCounter + '&format=json';
    var response = await axios.get(getRequest);

    let MTG = response.data.data;
    let finalString = '';
    for (let i = 0; i < 175; i++){
        let dataString = `{
            "id":"${MTG[i].id}",
            "name":"${MTG[i].name}",
            "image_uris":${JSON.stringify(MTG[i].image_uris)},
            "cmc":${MTG[i].cmc},
            "colors":${JSON.stringify(MTG[i].colors)},
            "legalities":${JSON.stringify(MTG[i].legalities)}
        },`

        finalString += dataString;
  
    }
    
    fs.appendFile('./data/mtg_cards3.json', finalString , function (err) {
        if (err) throw err;
    });

    pageCounter++;
    console.log(pageCounter);
    if (pageCounter <= finalPage){
        setTimeout(scryfallCall, 2000);
    }else{
        return;
    }

}

//set up loop per card

//set recursive settimeout to call function again and continue writing.
//if we hit the  last call at 1092 then return out and finish all calls.

//1-1092 pages.


scryfallCall();