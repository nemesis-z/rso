import React, { Component } from 'react';
import helper from './Helper';

export default class ConnectBlock extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name:'',
			pass:'',
			dangers: {
				name:false,
				pass:false
			}
		};
	}
	onSubmit(e) {
		e.preventDefault();
		let name = !/^\w*$/.test(this.state.name), pass = !/^\w*$/.test(this.state.pass);
		if(name||pass) {
			this.setState({
				dangers: {
					name,pass
				}
			});
			return;
		}
		helper.req({name:this.state.name,pass:this.state.pass}, (d)=> {
			helper.publish('login');
		}, !0);
	}
	handleInput(e) {
		let target = e.target, name = target.name, dangers = [...this.state.dangers];
		if(!target.value)dangers[name] = true;
		this.setState({
			[name]:target.value,
			dangers
		}, true);
	}
	render() {
		return (
			<div className="row">
				<div className="col s4 offset-s4">
					<form className="card" method="post" onSubmit={this.onSubmit.bind(this)}>
						<div className="card-content">
							<span className="card-title">Форма входа</span>
							<div className="divider"/>
							<div className="input-field">
								<label htmlFor="inputEmail">Логин</label>
								<input type="text" id="inputEmail" className={"validate"+(this.state.dangers.name?' invalid':'')} required autoFocus name="name" onChange={this.handleInput.bind(this)}/>
							</div>
							<div className="input-field">
								<label htmlFor="inputPassword">Пароль</label>
								<input type="password" id="inputPassword" className={"validate"+(this.state.dangers.name?' invalid':'')} required name="pass" onChange={this.handleInput.bind(this)}/>
							</div>
						</div>
						<div className="card-action">
							<button className="btn btn-flat waves-effect" type="submit">Войти</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}