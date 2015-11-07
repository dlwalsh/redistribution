import React, { Component } from 'react';
import Loader from 'react-loader';
import UI from './UI';

export default class Page extends Component {

    render() {

        const { loaded, ...props } = this.props;

        return (
            <Loader loaded={loaded}>
                <UI {...props} />
            </Loader>
        );

    }

}
