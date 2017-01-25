import React from 'react';
import UserInput from '../components/UserInput';

export default class Top extends React.Component {
	componentDidUpdate() {
		const that = this;
		window.$('.welfn').on('change',function(e) {
			const $this = window.$(this);
			that._handleChange($this.val(), $this.data('type'));
		}).material_select();
	}
	componentDidMount() {
		window.$(this.refs.select).material_select();
	}
	render() {
		this.data = this.props.data||{};
		const Input = UserInput.apply(this);
		return (
			<div className="row">
				<fieldset className="col s12" disabled={this.props.data===false}>
					<div className="row"> 
						<div className="input-field col l2 m4 s6">
							<label htmlFor="_lc">Лицевой счет</label>
							<Input id="_lc" type="main.G_LICSCHET"/>
						</div>
						<div className="input-field col l2 m4 s6">
							<Input type="main.UETS_LIC"/>
						</div> 
						<div className="hide-on-large-only clearfix"></div>
						<div className="input-field col l4 offset-l1">
							<label htmlFor="_phn">Телефон</label>
							<Input id="_phn" type="main.PHONE"/>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<label htmlFor="_oks">Отв. квартиросъемщик</label>
							<Input id="_oks" type="main.CLIENT_NAME"/>
						</div>
					</div>
					<div className="row">
						<div className="col s4 input-field">
							<Input id="_dnv" select={this.props.data.o_doc||[]} type="main.DOC_OWNER_TYPE"/>
							<label>Документ на владение</label>
						</div>
						<div className="col s3 input-field">
							<label htmlFor="_dd">Дата док.</label>
							<Input id="_dd" type="main.DATA_DOC"/>
						</div>
					</div> 
				</fieldset>
			</div>
		);
	}
}