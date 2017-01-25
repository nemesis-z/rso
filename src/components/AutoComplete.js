import React from 'react';

export default class AutoComplete extends React.Component {
	componentDidUpdate() {
		if(!Array.isArray(this.props.data))return;
		let data = {};
		this.props.data.forEach((tmp) => {
			data[tmp["NAME"]]=null
		});
		const ac = window.$(this.refs.ac);
		ac.autocomplete({
			data
		});
		setTimeout(() => {
			if(this.props.top)ac.next().css({position:'absolute',bottom:'100%'});
			if(this.props.right)ac.next().css({position:'absolute',right:0});
		}, 1);
	}
	render() {
		return (
			<div className={"col s12 input-field "+(this.props.className||"")}>
				{this.props.label&&<label>{this.props.label}</label>}
				<input type="text" ref="ac" onBlur={(e)=>this.props.onChange(e.target.value,this.props.type)}/>
			</div>
		);
	}
} 