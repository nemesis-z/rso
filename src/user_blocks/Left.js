import React from 'react';
import UserInput from '../components/UserInput';

export default class Left extends React.Component {
	render() {
		this.data = this.props.data||{};
		let Input = UserInput.apply(this);
		return (
			<div className="col m12 l5 pl-0">
				<fieldset className="custom-fieldset" disabled={this.props.data===false}>
					<legend>Площадь</legend>
					<div className="row">
						<div className="input-field col s6">
							<label htmlFor="_ovr">Общая</label>
							<Input id="_ovr" type="OCC_FULLSPACE"/>
						</div>
						<div className="input-field col s6">
							<label htmlFor="_lvn">Жилая</label>
							<Input id="_lvn" type="OCC_LIVESPACE"/>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s6">
							<label htmlFor="_add">Доп.</label>
							<Input id="_add" type="OCC_ADDSPACE"/>
						</div>
						<div className="input-field col s6">
							<label htmlFor="_blc">Балкон</label>
							<Input id="_blc" type="BALKON"/>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<label htmlFor="_plv">Поливная</label>
							<Input id="_plv" type="POLIV"/>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<label htmlFor="_vp">Высота пом.</label>
							<Input id="_vp" type="HEIGHT"/>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<label htmlFor="_lot">Участок</label>
							<Input id="_lot" type="ZNAME" readonly/>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<Input type="REALTYTYPE" select={this.props.data.types||[]}/>
							<label>Тип</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<label htmlFor="_strt">Улица</label>
							<Input id="_strt" type="STREET" readonly/>
						</div>
					</div>
					<div className="row">
						<div className="col s6 px-0">
							<div className="input-field col s6">
								<label htmlFor="_hs">Дом</label>
								<Input id="_hs" type="HOUSE" readonly/>
							</div>
							<div className="input-field col s6">
								<Input type="CORPS" readonly/>
							</div>
						</div>
						<div className="input-field col s6">
							<label htmlFor="_flr">Этаж</label>
							<Input id="_flr" type="FLOOR"/>
						</div>
					</div>
					<div className="row">
						<div className="col s6 px-0">
							<div className="input-field col s6">
								<label htmlFor="_num">№ кв.</label>
								<Input id="_num" type="APPARTS"/>
							</div>
							<div className="input-field col s6">
								<Input type="LETTER"/>
							</div>
						</div>
						<div className="input-field col s6">
							<label htmlFor="_rms">Комнат</label>
							<Input id="_rms" type="ROOMS"/>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<Input id="_qwe" type="OWNERSHIP" select={this.props.data.ownerships||[]}/>
							<label>Собственность</label>
						</div>
					</div>
				</fieldset>
			</div>
		);
	}
}