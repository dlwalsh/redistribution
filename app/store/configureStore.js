import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import reducer from '../reducers';

console.log(process.env);

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(logger)(createStore);

export default function configureStore(initialState) {

    return createStoreWithMiddleware(reducer, initialState);

}
