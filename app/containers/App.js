import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Page from '../components/Page';
import * as Actions from '../actions';

function mapStateToProps({ geodata, divisions, ui }) {

    const selected = divisions.selected;

    const relationship = geodata.relationships
        ? geodata.relationships.find((rel) => rel.id === selected)
        : null;

    return Object.assign({}, {
        oldGeodata: geodata.legacy,
        geodata: geodata.latest,
        selected,
        comparison: relationship ? relationship.corresponding : null,
        loaded: ui.loaded
    });

}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);
