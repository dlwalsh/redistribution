import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Page from '../components/Page';
import * as Actions from '../actions';

function mapStateToProps({ geodata, divisions, ui }) {
  return {
    oldGeodata: geodata.legacy,
    geodata: geodata.latest,
    selected: divisions.selected,
    loaded: ui.loaded,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);
