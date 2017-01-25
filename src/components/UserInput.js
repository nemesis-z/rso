import React from 'react';

function getData(d,t,q="") {
	if(!d||!t)return q;
	let e = t.split('.');
	// if(e.length!==2)console.error(t);
	return e.length===1?d[e[0]]:d[e[0]]&&d[e[0]][e[1]];
}

export default function() {
	if(!this._handleChange)this._handleChange = function(v,t) {
		let e = t.split('.');
		if(e.length===2)this.data[e[0]][e[1]] = v;
		else if(e.length===1)this.data[e[0]] = v;
	}
	return (inner) => inner.select?
		(<select disabled={!inner.select.length} className="welfn" data-type={inner.type} id={inner.id} defaultValue={getData(this.data,inner.type,0)}>
			{Array.isArray(inner.select)&&inner.select.map(el => <option value={el.ID} key={el.ID}>{el.NAME}</option>)}
		</select>)
		:
		<input defaultValue={getData(this.data,inner.type)} type="text" onBlur={(e)=>this._handleChange(e.target.value,inner.type)}  id={inner.id} readOnly={inner.readonly}/>;
}