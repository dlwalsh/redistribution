import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UI from '../components/UI';
import * as Actions from '../actions';
import geodataNSWPre from '../data/nsw-pre.json';
import geodataNSWPost from '../data/nsw-proposed.json';
import transformNSW from '../data/nsw-transform.json';

function mapStateToProps(state) {

    const selected = state.divisions.selected;

    const comparison = transformNSW
        .filter((pair) => pair.id === selected)
        .reduce((array, pair) => [ ...array, ...pair.corresponding ], []);

    return Object.assign({}, {
        oldGeodata: geodataNSWPre,
        geodata: geodataNSWPost,
        transform: transformNSW,
        selected,
        comparison
    });

}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UI);
