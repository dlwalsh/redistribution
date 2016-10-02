const mapshaper = require('mapshaper');
const fs = require('fs');
const minimist = require('minimist');

const argv = minimist(process.argv.slice(2));

const inFileOld = argv.in1;
const inFileNew = argv.in2;
const idField1 = argv.idField1;
const idField2 = argv.idField2;
const nameField1 = argv.nameField1;
const nameField2 = argv.nameField2;
const pairFile = argv.pairs;
const outFile = argv.out;

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

fs.readFile(pairFile, 'utf8', (error, content) => {
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
    idField: idField1,
    nameField: nameField1,
    overlaps: overlapOld,
  });

  const newEach = propertiesExpression({
    idField: idField2,
    nameField: nameField2,
    overlaps: overlapNew,
  });

  mapshaper.runCommands(`
    -i ${inFileOld} ${inFileNew} combine-files
    -simplify 0.15
    -rename-layers old,new
    -each '${oldEach}' target=old
    -each '${newEach}' target=new
    -clip bbox=113,-44,154,-9
    -o force format=topojson ${outFile}
  `, (err) => {
    if (err) {
      throw err;
    }
  });
});
