import React from 'react'; 
import Input from './components/Input';
import Select from './components/Select';
import Table from './components/StructTable'; 
import Shared from './SharedBlock';
import Button from './components/Button';
import helper from './Helper';

export default class StructBlock extends Shared {
	constructor(props) {
		super(props); 
		this.codes = ['locality','regions','streets','nums'];
		this.names = ['Район','Нас. пункт','Улица','Дом'];
		this.icodes = ['manager','comment'];
		this.inames = ['Управляющая компания','Комментарий'];
		this.init(!0);
		helper.req({sget:'locality',id:-1}, ({elems:locality}) => {
			this.data.locality = locality;
			this.setState({
				sels:{locality}
			});
		});
	}
	onSubmit(e) {
		e.preventDefault(); 
		if(this.cancel)return;
		helper.req(this.send,data=> {
			this.setState({data});
			this.cancel = true;
		});
	}
	render() { 
		return this.props.children?this.props.children:(
			<div> 
				<div className="row"> 
					<form onSubmit={this.onSubmit.bind(this)}>
						<div className="col s12 m6">
							<fieldset className="custom-fieldset">
								<legend>Адрес</legend> 
								{this.codes.map((c,ndx)=><Select elements={this.state.sels[c]} label={this.names[ndx]} key={ndx} onChange={this.onChange.bind(this,c)}/>)}  
							</fieldset>
						</div>
						<div className="col s12 m6">
							{this.icodes.map((c,ndx)=><Input label={this.inames[ndx]} key={ndx} onChange={this.inputChange.bind(this,c)} disabled/>)}
							 
							<div className="mt-1">
								<div className="col s6">
									<Button type="submit" className="btn waves-light col waves-effect s10 offset-s2">Поиск</Button>
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