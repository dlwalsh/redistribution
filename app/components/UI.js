import React from 'react';
import Map from './Map';
import ChoiceControl from './ChoiceControl';

export default function UI({
    comparison,
    oldGeodata,
    geodata,
    actions,
    selected
}) {

    const options = geodata ? geodata.features.map((feature) => ({
        label: feature.properties.Elect_div,
        value: feature.properties.E_div_numb
    })) : [];

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

}
