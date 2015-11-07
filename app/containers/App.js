import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UI from '../components/UI';
import * as Actions from '../actions';

function mapStateToProps({ geodata, divisions, ui }) {

    const selected = divisions.selected;

    const comparison = geodata.relationship
        ? geodata.relationship
            .filter((pair) => pair.id === selected)
            .reduce((array, pair) => [ ...array, ...pair.corresponding ], [])
        : null;

    return Object.assign({}, {
        oldGeodata: geodata.legacy,
        geodata: geodata.latest,
        selected,
        comparison,
        loading: ui.loading
    });

}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UI);
