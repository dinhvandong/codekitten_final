var request = require("request")
const fs = require("fs") 

const root ="http://staging.teky.asia";
// "http://128.199.145.159:8080";
var url_costumes = root + "/v1/code_kittens_api/costumes";
 var url_sprites =  root + "/v1/code_kittens_api/sprites";
var url_backdrops = root + "/v1/code_kittens_api/backdrops";

// request({
//     url: url_costumes,
//     json: true,
// }, function (error, response, jsonContent) {
//     console.log(jsonContent);
//     if (!error && response.statusCode === 200) {
//          console.log(jsonContent) // Print the json response
//         jsonCont = JSON.stringify(jsonContent);

//         fs.writeFile('./costumes.json', jsonCont, 'utf8', (err) => {

//             if (err) {
//                 console.log(`Error writing file: ${err}`);
//             } else {
//                 console.log(`url_costumes File is written successfully!`);
//             }
        
//         });
//     }
    
// }
// );

  request({

    url: url_sprites,
    json: true,
}, function (error, response, jsonContent) {
    console.log(jsonContent);
    if (!error && response.statusCode === 200) {
        // console.log(jsonContent) // Print the json response
        jsonCont = JSON.stringify(jsonContent.data);

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



// request({

//     url: url_backdrops,
//     json: true,
// }, function (error, response, jsonContent) {
//     console.log(jsonContent);
//     if (!error && response.statusCode === 200) {
//         // console.log(jsonContent) // Print the json response
//         jsonCont = JSON.stringify(jsonContent.data);

//         fs.writeFile('./backdrops.json', jsonCont, 'utf8', (err) => {

//             if (err) {
//                 console.log(`Error writing file: ${err}`);
//             } else {
//                 console.log(`url_costumes File is written successfully!`);
//             }
        
//         });
//     }
    
// }
// );



