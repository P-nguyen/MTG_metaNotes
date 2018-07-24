var axios = require('axios');
var fs = require('fs');


async function scryfallCall (){

    var getRequest = 'https://api.scryfall.com/cards?page=' + 1 + '&format=json';
    var response = await axios.get(getRequest);

    //let jsonString = JSON.stringify(response.data.data[0].name);
    let MTG = response.data.data;

    let dataString = `{
        "id":"${MTG[80].id}",
        "name":"${MTG[80].name}",
        "image_uris":${JSON.stringify(MTG[80].image_uris)},
        "cmc":${MTG[80].cmc},
        "colors":${JSON.stringify(MTG[80].colors)},
        "legalities":${JSON.stringify(MTG[80].legalities)}
    },`

    fs.appendFile('./testFile4.json', dataString , function (err) {
        if (err) throw err;
    });

}

//set up loop per card

//set recursive settimeout to call function again and continue writing.
//if we hit the  last call at 1092 then return out and finish all calls.


scryfallCall();