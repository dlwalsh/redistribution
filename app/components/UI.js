import React from 'react';
import Map from './Map';
import ChoiceControl from './ChoiceControl';

export default function UI({
  oldGeodata,
  geodata,
  actions,
  selected,
}) {
  const options = geodata ? geodata.features.map((feature) => ({
    label: feature.properties.name,
    value: feature.properties.id,
  })) : [];

  return (
    <div className="ui">
      <Map
        oldGeodata={oldGeodata}
        geodata={geodata}
        selected={selected}
      />
      <ChoiceControl
        options={options}
        value={selected}
        onSelect={actions.selectDivision}
      />
    </div>
  );
}
