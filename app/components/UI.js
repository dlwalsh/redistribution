import React, { Component } from 'react';
import Map from './Map';
import ChoiceControl from './ChoiceControl';

export default class UI extends Component {

    render() {

        const {
            selected,
            comparison,
            oldGeodata,
            geodata,
            actions
        } = this.props;

        const options = geodata ? geodata.features.map((feature) => ({
            label: feature.properties.name,
            value: feature.properties.id
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

}
