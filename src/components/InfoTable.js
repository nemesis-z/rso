import React from 'react';
import { browserHistory } from 'react-router';

export default class InfoTable extends React.Component {
	handle(el) {
		browserHistory.push(`/user/${el.VID}/${el.DID}`);
	}
	render() {
		return (
			<div className="col s12">
				<table className="table-custom-hover bordered table-sm-top-margin responsive-table">
				  <thead>
					<tr>
						<th>#</th>
						<th>ФИО</th>
						<th>Адрес</th>
						<th>Лиц. счет</th>
						<th>Баланс</th>
					</tr>
				  </thead>
				  <tbody>
					{this.props.data.map((el,ndx) =>
						<tr onClick={this.handle.bind(this,el)} key={el.VID}>
							<th scope="row">{ndx+1}</th>
							<td>{el.NAME}</td>
							<td>{el.ADDRESS}</td>
							<td>{el.G_LICSCHET}</td>
							<td className="text-xs-right">{el.BALANCE}</td>
						</tr>
					)}
					
				  </tbody>
				</table>
			</div>
		);
	}
}