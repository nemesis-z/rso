import React from 'react';
import helper from './Helper';
import UserInput from './components/UserInput';
import AutoComplete from './components/AutoComplete';
import Button from './components/Button';

export default class UserEditBlock extends React.Component {
	constructor(props) {
		super(props);
		this.data = {};
		this.state = {
			canSavePass:false
		};
		let {vid:aid,cid} = this.props.params;
		if(aid&&cid) {
			helper.req({aid,cid}, d => {
				this.data = d;
				this.setState({canSavePass:true});  // recheck
			});
		}
	}
	componentDidUpdate() {
		const that = this;
		window.$('.welfn').on('change',function(e) {
			const $this = window.$(this);
			that._handleChange($this.val(), $this.data('type'));
		}).material_select();
		window.$('ul.tabs').tabs();
		window.Materialize.updateTextFields();
	}
	render() {
		let Input = UserInput.call(this);
		return (
			<div>
				<div className="row" style={{marginTop:20}}>
					<div className="col s12 input-field">
						<label>ФИО</label>
						<Input id="_fio" type="NAME"/>
					</div>
				</div>
				<fieldset className="custom-fieldset row">
					<legend>Статус</legend>
					<div className="col l3 s12 input-field">
						<Input type="STATUS" select={this.data.stats} selected={this.data.STATUS}/>
					</div>
					<div className="clearfix hide-on-large-only"/>
					<div className="col l4 s6 input-field">
						<label>Прописан</label> 
						{false&&<input type="RBEG_DATE"/>}
					</div>
					<div className="col l4 s6 input-field">
						<label>Выписан</label>
						{false&&<input type="REND_DATE"/>}
					</div>
					<div className="col l1 s12">
						<div className="button--add"/>
					</div>
				</fieldset> 
				<div className="row mt-1">
					<div className="input-field col l6 s12">
						<label>Дата рождения</label>
						{false&&<Input id="_dob" type="BIRTHDATE"/>}
					</div>
					<div className="input-field col l6 s12">
						<label>УИН гражданина</label>
						<Input id="_uin" readonly/> 
					</div>
				</div>
				<div className="row">   
					<div className="input-field col l6 s12">
						<label htmlFor="_sgps" className="col-sm-4 col-form-label text-sm-right">СГПС</label>
						<Input id="_sgps" type="SGPS"/> 
					</div>
					<div className="input-field col l6 s12">
						<label>Должность</label>
						<Input id="_a1" type="RANK"/> 
					</div>
					<div className="input-field col l6 s12">
						<Input id="_a2" type="WORKPLACE_ID" select={this.data.works||[]} selected={this.data["WORKPLACE_ID"]||0}/>
						<label>Место работа</label>
					</div>
					<div className="input-field col l6 s12">
						<label>Социальный номер</label>
						<Input id="_a3" type="SOC_NUM" readonly/> 
					</div> 
				</div>
				<div className="row">
					<div className="col s12 z-depth-1">
				      <ul className="tabs">
				        <li className="tab col s3"><a className="waves-effect waves-red" href="#history">История прописки</a></li>
				        <li className="tab col s3"><a className="waves-effect waves-red" href="#passport">Паспортные данные</a></li>
				      </ul>
				    </div>
					<div className="col s12" id="history" role="tabpanel" style={{overflow:'auto'}}>
						<table className="bordered">
						  <thead>
							<tr>
								<th>#</th>
								<th>Статус</th>
								<th>Дата</th>
								<th>Создан</th>
								<th>Адрес</th>
								<th>Создатель</th>
							</tr>
						  </thead>
						  <tbody>
							{this.data.history&&this.data.history.map((el,ndx) =>
								<tr key={el.RID}>
									<th scope="row">{ndx+1}</th>
									<td>{el.ROPER_STATUS}</td>
									<td>{helper.getDate(el.RBEG_DATE)}</td>
									<td>{helper.getDate(el.RCREATEDATE)}</td>
									<td>{el.RADDRESS}</td>
									<td>{el.RCREATEUSER}</td>
								</tr>
							)}
						  </tbody>
						</table>
					</div>
					<div className="col s12" id="passport" role="tabpanel">
						<div className="input-field col s12 m6 l3">
							<label>Документ</label>
							<Input type="passport"/>
						</div>
						<div className="input-field col s12 m6 l3">
							<label>Место выдачи</label>
							<Input type="passport"/>
						</div>
						<div className="input-field col s12 m6 l3">
							<label>Серия</label>
							<Input type="passport"/>
						</div>
						<div className="input-field col s12 m6 l3">
							<label>Номер</label>
							<Input type="passport"/>
						</div>
						<div className="input-field col s12 m6 l3">
							<label>Орган выдачи</label>
							<Input type="passport"/>
						</div>
						<div className="input-field col s12 m6 l3">
							<label>Дата выдачи</label>
							<Input type="passport"/>
						</div>
						<AutoComplete top label="Основания" data={this.data.reasons} className="m6 l3" onChange={this._handleChange.bind(this)} type="passport"/>
						<div className="col s12 m6 l3" style={{paddingTop:24}}>
							<Button value="Сохранить" className="s12" disabled={!this.state.canSavePass}/>
						</div>
					</div> 
				</div>
			</div>
		);
	}
}