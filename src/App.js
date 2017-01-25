import React from 'react'; 
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import InfoBlock from './InfoBlock';
import ConnectBlock from './ConnectBlock';
import UserBlock from './UserBlock';
import UserEditBlock from './UserEditBlock'; 
import StructEditBlock from './StructEditBlock';
import helper from './Helper'; 

import StructBlock from './StructBlock';
import { Provider, connect } from 'react-redux';
import { store } from './reducers';

// recheck entrance

let Loader = connect(
	state => ({
		loading:state.loader
	})
)(
	(props) => (
		<div className="progress" style={{display:props.loading?'block':'none'}}>
			<div className="indeterminate"></div>
		</div>
	)
);

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			loading:true,
		}
		helper.req({check:1}, (d) => {
			helper.logged = !d.err&&d.ok;
			this.setState({loading:false});
		}, e => this.setState({loading:false}));
		helper.subscribe('login', function() {
			helper.logged = true;
			browserHistory.push('/');
		});
		helper.subscribe('logout', () => {
			helper.logged = false;
			browserHistory.push('/login');
		});
	}
	checkAuth(nextState,replace) { 
		if(!helper.logged) {
			if(nextState.routes[0].path!=='/login')replace('/login');
		} else if(nextState.routes[0].path!=='/') replace('/');
	}
	render() {
		if(this.state.loading)return <div className="loader"></div>;
		return (
			<Provider store={store}>
				<div>
					<Loader/>
					<Router history={browserHistory}>
						<Route path="/login" onEnter={this.checkAuth.bind(this)} component={ConnectBlock}/>
						<Route path="/" onEnter={this.checkAuth.bind(this)}>
							<IndexRoute component={InfoBlock}/> 
							<Route path="/structure" component={StructBlock}>
								<Route path="/structure/:sid" component={StructEditBlock}/>
							</Route>
							<Route path="/user/:vid/:did" component={UserBlock}>
								<Route path="/user/edit/:vid/:did/:cid" component={UserEditBlock}/>
							</Route>
						</Route>
					</Router>
				</div>
			</Provider>
		);
	}
} 
