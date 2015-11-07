import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import L from 'leaflet';

export default class Map extends Component {

    componentDidMount() {
        this.init();
        this.addOverlays();
    }

    componentDidUpdate() {
        this.removeOverlays();
        this.addOverlays();
    }

    init() {

        const node = findDOMNode(this);

        this.map = L.map(node, {
            zoomControl: false
        });

        L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(this.map);

        L.control.zoom({
            position: 'bottomleft'
        }).addTo(this.map);

    }

    addOverlays() {

        const { oldGeodata, geodata, selected, comparison } = this.props;

        if (!geodata) {
            return;
        }

        if (typeof selected === 'number') {

            this.overlay1 = L.featureGroup([
                L.geoJson(geodata, {
                    filter: (feature) => feature.properties.id === selected,
                    style: {
                        color: '#000080',
                        opacity: 0.5,
                        weight: 2,
                        zIndex: 10
                    }
                })
            ]);

            this.map.addLayer(this.overlay1)
                .fitBounds(this.overlay1.getBounds());

            if (oldGeodata && comparison) {

                this.control = L.control.layers({}, {}, { collapsed: false });

                this.overlay2 = L.geoJson(oldGeodata, {
                    filter: (feature) => comparison.indexOf(feature.properties.id) > -1,
                    onEachFeature: (feature, layer) => this.control.addOverlay(layer, feature.properties.name),
                    style: {
                        color: '#800000',
                        opacity: 0.5,
                        weight: 2,
                        zIndex: 5
                    }
                });

                this.map.addLayer(this.overlay2)
                    .addControl(this.control);

            }

        } else {

            this.map.fitBounds(
                L.featureGroup([
                    L.geoJson(geodata)
                ]).getBounds()
            );

        }


    }

    removeOverlays() {
        if (this.overlay1) {
            this.map.removeLayer(this.overlay1);
            this.overlay1 = null;
        }
        if (this.overlay2) {
            this.map.removeLayer(this.overlay2);
            this.overlay2 = null;
        }
        if (this.control) {
            this.map.removeControl(this.control);
            this.control = null;
        }
    }

    render() {
        return (
            <div className="map" />
        );
    }

}
