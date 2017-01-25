import React  from 'react';
// import UserInput from '../components/UserInput';
import helper from '../Helper';
import { browserHistory } from 'react-router'

export default class Top extends React.Component {
	toEdit(el) {
		let {vid,did} = this.props.params;
		browserHistory.push(`/user/edit/${vid}/${did}/${el.ID}`);
	}
	render() {
		let keys = ['NAME','STATUS_NAME','EXEMPT_NAME','PROPIS','DATE_OUT','DATE_IN','BIRTHDATE','ABONENT_ID','MODIFYUSER','MODIFYDATE','EXEMPT_DOC'];
		// let Input = UserInput.apply(this);
		return (
			<div className="col l7 m12 pr-0">
				<div style={{height:370,overflow:'auto'}}>
					<table className="table-custom-hover table-custom-border table-sm-top-margin">
					  <thead>
						<tr>
							<th>#</th>
							<th>ФИО</th>
							<th>Статус</th>
							<th>Льгота</th>
							<th>Регистрация</th>
							<th>Убытие</th>
							<th>Прибыте</th>
							<th>Рожд.</th>
							<th>Абон.</th>
							<th>Пользователь</th>
							<th>Дата изм.</th>
							<th>Док. льготы</th>
						</tr>
					  </thead>
					  <tbody>
						{this.props.data&&this.props.data.residents&&this.props.data.residents.map((el,ndx) => 
							<tr key={'p'+ndx} onClick={this.toEdit.bind(this,el)}>
								<th scope="row">{ndx+1}</th>
								{keys.map((k,sx)=><td key={'c'+sx}>{/date|propis/i.test(k)?helper.getDate(el[k]):el[k]}</td>)}
							</tr>
						)}
					  </tbody>
					</table>
				</div>
				{false&&<fieldset disabled={this.props.data===false}>
					<div className="row mt-1">
						{false&&<div className="form-check col-sm-4 mb-0">
							<label className="col-form-label form-check-label">
								<input className="form-check-input" type="checkbox"/><small> Показать выписанных</small>
							</label>
						</div>}
						{false&&<div className="col-sm-6 offset-sm-4 col-xs-12">
							<div className="col-xs-12 pr-0">
								<label htmlFor="_zhk" className="col-xs-6 px-0 col-form-label text-xs-right"><small>Жильцов</small></label>
								<div className="col-xs-6 pr-0"> 
									<input className="form-control" id="_zhk" disabled value={(this.props.data&&this.props.data.residents&&this.props.data.residents.length)||0}/>
								</div>
							</div>
						</div>}
					</div>
				</fieldset>}
			</div> 
		);
	}
}