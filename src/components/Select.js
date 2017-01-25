import React from 'react';

export default class Select extends React.Component {
	componentDidUpdate() {
		window.$(this.refs.select).on('change',this.onChange.bind(this)).material_select();;
	}
	componentDidMount() {
		window.$(this.refs.select).material_select();
	}
	onChange(e) {
		this.props.onChange(e.target.value);
	}
	render() {
		let elements = Array.isArray(this.props.elements)?this.props.elements:[];
		return (
			<div className="input-field col s12">
				<select ref="select" disabled={!elements.length} onChange={this.onChange.bind(this)}>
					{elements.map((el,ndx) => <option value={el.code} key={ndx}>{el.name}</option>)}
				</select>
				<label>{this.props.label}</label>
			</div>
		);
	}
}