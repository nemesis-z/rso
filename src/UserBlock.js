import React from 'react';
import Top from './user_blocks/Top';
import Left from './user_blocks/Left';
import Right from './user_blocks/Right';
import Bottom from './user_blocks/Bottom';
import helper from './Helper';

// повтор в конструкторе
export default class UserBlock extends React.Component {
	constructor(props) {
		super(props);
		this.data = false;
		this.hasChanges = false;
		let {vid,did} = this.props.params;
		helper.req({vid,did}, d => {
			let names = 'OCC_FULLSPACE OCC_LIVESPACE OCC_ADDSPACE BALKON POLIV'.split(' ');
			names.forEach(n=>{if(d[n])d[n] = parseInt(d[n],10);});
			this.data = d;
			this.forceUpdate();
		});
	}
	componentDidUpdate() {
		window.Materialize.updateTextFields();
	}
	render() {
		return this.props.children?this.props.children:(
			<div>
				<Top data={this.data}/>
				<div className="row">
					<Left data={this.data}/>
					<Right data={this.data} params={this.props.params}/>
				</div>
				<Bottom data={this.data}/>
			</div>
		);
	}
}