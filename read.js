var fs = require('fs');
var parse = require('csv-parse');

var csvData=[];
var inputdata = {};
fs.createReadStream("data.csv")
    .pipe(parse({delimiter: ':'}))
    .on('data', function(csvrow) {
        //console.log(csvrow);
        var aa = csvrow[0].split(';');
        //console.log(aa);
        var key = aa[0];
        var data = aa[1];
        inputdata[key] = data;
        //do something with csvrow
        csvData.push(csvrow);
    })
    .on('end',function() {
      //do something wiht csvData
      //console.log(inputdata);

      parseHtml(inputdata);
    });


function parseHtml(inputdata){
      var file = fs.createReadStream("./template/template.html", 'utf8');
      var newCss = '';

      file.on('data', function (chunk) {
          newCss += chunk.toString();//.replace(regexpFind, replace);
      });

      file.on('end', function () {
          // fs.writeFile(cssFileName, newCss, function(err) {
          //     if (err) {
          //         return console.log(err);
          //     } else {
          //         console.log('Updated!');
          //     }
          //console.log(newCss);
          fs.open('./new/en_.html', 'w+', function(err, data) {
              if (err) {
                  console.log("ERROR !! " + err);
              } else {
                  fs.write(data, newCss, 0, newCss.length, null, function(err) {
                      if (err)
                          console.log("ERROR !! " + err);
                      fs.close(data, function() {
                          console.log('written success');
                      })
                  });
              }
          });
      });


  for (var key in inputdata) {
   if (inputdata.hasOwnProperty(key)) {
      var obj = inputdata[key];


    }
  }
}
//
// function searchReplaceFile(regexpFind, replace, cssFileName) {
//     var file = fs.createReadStream(cssFileName, 'utf8');
//     var newCss = '';
//
//     file.on('data', function (chunk) {
//         newCss += chunk.toString().replace(regexpFind, replace);
//     });
//
//     file.on('end', function () {
//         fs.writeFile(cssFileName, newCss, function(err) {
//             if (err) {
//                 return console.log(err);
//             } else {
//                 console.log('Updated!');
//             }
//     });
// });
