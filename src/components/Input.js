import React from 'react';

export default class Input extends React.Component {
	constructor(props) {
		super(props); 
		this.state = {
			value:''
		}
	}
	handleChange(e) {
		let v = e.target.value;
		if(this.props.regex&&!this.props.regex.test(v))return;
		this.props.onChange(v);
		this.setState({value:v});
	}
	render() {
		let genId = 'd'+Date.now();
		if(this.props.labeled)return (
			<div className="input-field col s12">
				<label htmlFor={genId}>{this.props.label}</label>
				<input id={genId} type="text" value={this.state.value} disabled={this.props.disabled} onChange={this.handleChange.bind(this)}/>
			</div>
		);
		return (
			<fieldset className="custom-fieldset">
				<legend>{this.props.label}</legend> 
				<div className="input-field col s12">
					<label htmlFor={genId}>{this.props.label}</label>
					<input type="text" id={genId} value={this.state.value} disabled={this.props.disabled} onChange={this.handleChange.bind(this)}/>
				</div>
			</fieldset>
		);
	}
} 