import React from 'react';
import { connect } from 'react-redux';

class Button extends React.Component {
	render() {
		return <button className={"btn waves-light col waves-effect "+(this.props.className||"")} type={this.props.type} disabled={this.props.loading||this.props.disabled}>{this.props.value||"ok"}</button>;
	}
}

export default connect(state => ({
	loading:state.loader
}))(Button);