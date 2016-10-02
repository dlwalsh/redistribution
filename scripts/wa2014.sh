node redistribution.js \
  --in1 /Users/david/Documents/Geodata/Federal/WA_2008/final/wa2008.json \
  --in2 /Users/david/Documents/Geodata/Federal/WA_2014/final/wa2014.json \
  --idField1 E_div_number --nameField1 Elect_div \
  --idField2 E_div_numb --nameField2 Elect_div \
  --pairs ../config/wa2014-pairs.txt \
  --out /Users/david/Development/redistribution/app/data/wa.json
