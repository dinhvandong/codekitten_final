var request = require("request")
const fs = require("fs") 

const root = "http://128.199.145.159:8080";
var url_costumes = root + "/api/asset/getByType/sprite";
 var url_sprites =  root + "/api/sprite/getAll";
var url_backdrops = root + "/api/asset/getByType/backdrop";

request({

    url: url_costumes,
    json: true,
}, function (error, response, jsonContent) {
    console.log(jsonContent);
    if (!error && response.statusCode === 200) {
        // console.log(jsonContent) // Print the json response
        jsonCont = JSON.stringify(jsonContent);

        fs.writeFile('./costumes.json', jsonCont, 'utf8', (err) => {

            if (err) {
                console.log(`Error writing file: ${err}`);
            } else {
                console.log(`url_costumes File is written successfully!`);
            }
        
        });
    }
    
}
);

  request({

    url: url_sprites,
    json: true,
}, function (error, response, jsonContent) {
    console.log(jsonContent);
    if (!error && response.statusCode === 200) {
        // console.log(jsonContent) // Print the json response
        jsonCont = JSON.stringify(jsonContent);

        fs.writeFile('./sprites.json', jsonCont, 'utf8', (err) => {

            if (err) {
                console.log(`Error writing file: ${err}`);
            } else {
                console.log(`url_costumes File is written successfully!`);
            }
        
        });
    }
    
}
);



request({

    url: url_backdrops,
    json: true,
}, function (error, response, jsonContent) {
    console.log(jsonContent);
    if (!error && response.statusCode === 200) {
        // console.log(jsonContent) // Print the json response
        jsonCont = JSON.stringify(jsonContent);

        fs.writeFile('./backdrops.json', jsonCont, 'utf8', (err) => {

            if (err) {
                console.log(`Error writing file: ${err}`);
            } else {
                console.log(`url_costumes File is written successfully!`);
            }
        
        });
    }
    
}
);



