var fs = require('fs');
var parse = require('csv-parse');
var f = fs.createReadStream("./template/template.html", 'utf8');
var template = '';

f.on('data', function(chunk) {
    template += chunk.toString();
});
f.on('end', function() {
    fs.readdir('./data/', (err, files) => {
        files.forEach(file => {
            var filename = file.replace(/.*\\|\..*$/g, '');

            generateHtml("./data/" + file, filename);
        });
    })
});

function generateHtml(file, filename) {
    var inputdata = {};
    fs.createReadStream(file)
        .pipe(parse({
            delimiter: ';'
        }))
        .on('data', function(csvrow) {
            inputdata[csvrow[0]] = csvrow[1];
        })
        .on('end', function() {
            //do something wiht csvData
            parseHtml(inputdata, filename);
        });
}

function parseHtml(inputdata, filename) {
    tmp = template.replace(/\<%=(.*?)\%>/g, function(match, property) {
        return inputdata[property];
    });
    fs.open('./new/' + filename + '.html', 'w+', function(err, data) {
        if (err) {
            console.log("ERROR !! " + err);
        } else {
            fs.write(data, tmp, 0, tmp.length, null, function(err) {
                if (err)
                    console.log("ERROR !! " + err);
                fs.close(data, function() {
                    console.log('written success');
                })
            });
        }
    });
}
