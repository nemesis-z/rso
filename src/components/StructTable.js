import React from 'react';
import { browserHistory } from 'react-router';

export default class InfoTable extends React.Component {
	handle(el) {
		browserHistory.push(`/structure/${el.ID}`);
	}
	render() {
		return (
			<div>
				<table className="table-custom-hover bordered table-sm-top-margin responsive-table">
				  <thead>
					<tr>
						<th className="align-middle text-xs-center">#</th>
						<th className="align-middle text-xs-center">Кад. номер</th>
						<th className="align-middle text-xs-center">Улица</th>
						<th className="align-middle text-xs-center">Дом</th>
						<th className="align-middle text-xs-center">Корпус</th>
						<th className="align-middle text-xs-center">Коэф. тек. содерж.</th>
						<th className="align-middle text-xs-center">Выс. потолка</th>
						<th className="align-middle text-xs-center">Участок</th>
						<th className="align-middle text-xs-center">Материал стен</th>
						<th className="align-middle text-xs-center">LIFT_START</th>
						<th className="align-middle text-xs-center">Manag</th>
						<th className="align-middle text-xs-center">ИД района</th>
					</tr>
				  </thead>
				  <tbody>
					{this.props.data.map((el,ndx) =>
						<tr onClick={this.handle.bind(this,el)} key={el.ID}>
							<th scope="row">{ndx+1}</th>
							<td>{el.REGNUM}</td>
							<td>{el.STREET}</td>
							<td>{el.HOUSE}</td>
							<td>{el.CORPS}</td>
							<td>{el.MAINTKOEF}</td>
							<td>{el.HEIGHT}</td>
							<td>{el.ZKX_NAME}</td>
							<td>{el.MAT_NAME}</td>
							<td>{el.LIFT_START}</td>
							<td>{el.MANAG}</td>
							<td>{el.REGION_ID}</td>
						</tr>
					)}
					
				  </tbody>
				</table>
			</div>
		);
	}
}