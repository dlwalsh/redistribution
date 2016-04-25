const mapshaper = require('mapshaper');
const fs = require('fs');
const path = require('path');

const inFileOld = '/Users/david/Documents/Geodata/Federal/NSW_2008/final/NSW_ELB_region.shp';
const inFileNew = '/Users/david/Documents/Geodata/Federal/NSW_2014/final/' +
  'NSW_electoral_boundaries_25-02-2016.shp';
const outFile = '/Users/david/Development/redistribution/app/data/nsw.json';

function propertiesExpression(args) {
  const idField = args.idField;
  const nameField = args.nameField;
  const overlapsStr = JSON.stringify(args.overlaps);
  return `$.properties = {
    id: $.properties.${idField},
    name: $.properties.${nameField},
    overlap: ${overlapsStr}[$.properties.${idField}]
  }`;
}

fs.readFile(path.resolve(__dirname, '../pairs/nsw2014.txt'), 'utf8', (error, content) => {
  if (error) {
    throw error;
  }

  const pairs = content.split(/\r?\n/)
    .filter(x => x.trim())
    .map(x => x.split(' '));

  const overlapOld = pairs.reduce((map, pair) => {
    const prev = pair[0];
    const next = parseInt(pair[1], 10);
    const list = map[prev] || [];
    return Object.assign({}, map, {
      [prev]: [...list, next],
    });
  }, {});

  const overlapNew = pairs.reduce((map, pair) => {
    const prev = parseInt(pair[0], 10);
    const next = pair[1];
    const list = map[next] || [];
    return Object.assign({}, map, {
      [next]: [...list, prev],
    });
  }, {});

  const oldEach = propertiesExpression({
    idField: 'DIV_NUMBER',
    nameField: 'ELECT_DIV',
    overlaps: overlapOld,
  });

  const newEach = propertiesExpression({
    idField: 'E_div_numb',
    nameField: 'Elect_div',
    overlaps: overlapNew,
  });

  mapshaper.runCommands(`
    -i ${inFileOld} ${inFileNew} combine-files
    -simplify 0.1
    -rename-layers old,new
    -clip bbox=113,-44,154,-9
    -each '${oldEach}' target=old
    -each '${newEach}' target=new
    -o force format=topojson ${outFile}
  `, (err) => {
    if (err) {
      throw err;
    }
  });
});
