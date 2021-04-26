var request = require("request")
const fs = require("fs") 
var url_costumes = "http://128.199.145.159:8080/api/asset/getByType/sprite";
var url_sprites = "http://128.199.145.159:8080/api/sprite/getAll";
var url_backdrops = "http://128.199.145.159:8080/api/asset/getByType/backdrop";

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



