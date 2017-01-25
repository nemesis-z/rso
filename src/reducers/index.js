import { createStore, combineReducers } from 'redux';

function loader(state, action) {
	if(action.type === 'LOADER_ON')return true;
	if(action.type === 'LOADER_OFF')return false;
	return false;
}

const reducers = combineReducers({
	loader
});

export const store = createStore(reducers);
export const acts = {
	loader(on = true) {
		store.dispatch({type:on?'LOADER_ON':'LOADER_OFF'});
	}
}