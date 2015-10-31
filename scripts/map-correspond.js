var fs = require('fs');
var async = require('async');
var turf = require('turf');

if (process.argv.length < 4) {
    throw Error('Usage: ' + process.argv[0] + ' FILE1 FILE2');
}

async.map(process.argv.slice(2, 4), fs.readFile, function (error, results) {

    if (error) {
        throw error;
    }

    const data1 = JSON.parse(results[0]);
    const data2 = JSON.parse(results[1]);

    var mappings = data1.features.map(function (feature1) {

        var secondaryIds = data2.features.reduce(function (sids, feature2) {

            try {

                var intersection = turf.intersect(feature1, feature2);

                if (intersection) {
                    console.error(feature1.properties.name, 'and', feature2.properties.name, 'intersect');
                    return sids.concat(feature2.properties.id);
                }

            } catch (e) {

            }

            return sids;

        }, []);

        return {
            id: feature1.properties.id,
            corresponding: secondaryIds
        };

    });

    console.log(JSON.stringify(mappings, null, 2));

});
