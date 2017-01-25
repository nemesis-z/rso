import React from 'react';
import Input from './components/Input';
import Select from './components/Select';
import Table from './components/InfoTable'; 
import Shared from './SharedBlock';
import helper from './Helper';
import Button from './components/Button';

export default class InfoBlock extends Shared {
	constructor(props) {
		super(props);
		this.codes = ['regions','streets','nums'];
		this.names = ['Нас. пункт','Улица','Дом'];
		this.icodes = ['flat','lc','fio'];
		this.inames = ['Лицевой счет','ФИО'];
		this.init();
		helper.req({get:'regions',id:-1},({elems:regions}) => {
			this.data.regions = regions;
			this.setState({
				sels:{regions}
			});
		}); // ---------------
	}
	onSubmit(e) {
		e.preventDefault();
		if(this.cancel)return;
		helper.req(this.send, data=> {
			this.setState({data});
			this.cancel = true;
		});
	}
	render() {
		return ( 
			<div>
				<div className="row">
					<form onSubmit={this.onSubmit.bind(this)}>
						<div className="col s12 m6">
							<fieldset className="custom-fieldset">
								<legend>Адрес</legend> 
								{this.codes.map((c,ndx)=><Select elements={this.state.sels[c]} label={this.names[ndx]} key={ndx} onChange={this.onChange.bind(this,c)}/>)} 
								<Input label="Квартира" regex={/^\d+$/} labeled onChange={this.inputChange.bind(this,'flat')}/>
							</fieldset>
						</div>
						<div className="col s12 m6">
							{this.icodes.slice(1).map((c,ndx)=><Input regex={c==="lc"?/^\d+$/:false} label={this.inames[ndx]} key={ndx} onChange={this.inputChange.bind(this,c)}/>)}
							<div style={{marginTop:10}}>
								<div className="col s6">
									<Button type="submit" className="s10 offset-s2" value="Поиск"/>
								</div>
								<div className="col s6">
									<button type="button" className="btn waves-light waves-effect col s10" onClick={this.clear.bind(this)}>Очистить</button>
								</div>
							</div> 
						</div>
					</form>
				</div>
				<div className="row my-2">
					<Table data={this.state.data}/>
				</div>
			</div>
		);
	}
} 