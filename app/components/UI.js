import React from 'react';
import Map from './Map';
import ChoiceControl from './ChoiceControl';

export default function UI({
    selected,
    comparison,
    oldGeodata,
    geodata,
    actions
}) {

    const options = geodata.features.map((feature) => ({
        label: feature.properties.name,
        value: feature.properties.id
    }));

    return (
        <div className="ui">
            <Map
                oldGeodata={oldGeodata}
                geodata={geodata}
                selected={selected}
                comparison={comparison}
            />
            <ChoiceControl
                options={options}
                value={selected}
                onSelect={actions.selectDivision}
            />
        </div>
    );

};
