import React from 'react';
import helper from './Helper';

export default class SharedBlock extends React.Component { 
	init(is_struct = !1) {
		this.ifs = is_struct?'sget':'get';
		this.data = {};
		this.last = false;
		this.send = this.clearSend();
		this.cancel = false;
		this.state = {
			sels:{},
			data:[]
		}; 
	}
	clearSend() {
		let send = this.codes.reduce((p,c)=>{p[c]=-1;return p;},{});
		this.icodes.forEach(el=>send[el]='');
		return send;
	}
	clear() {
		helper.cancel();
		this.send = this.clearSend();
		this.setState({sels:{}});
		setTimeout(()=>this.setState({sels:{region:this.data.region}}),1); 
	}
	componentWillUnmount() {
		helper.cancel();
	}
	inputChange(code,value) {
		if(this.cancel)this.cancel = false;
		this.send[code] = value;
		//setTimeout(()=>console.log(this.state),1);
	}
	onChange(l,code) {
		if(this.cancel)this.cancel = false;
		let sels = this.state.sels, ndx = this.codes.findIndex(el => el===l)+1, lc = l+code, next = code<0;
		if(!ndx)return console.error('index not found');
		if(code>=0&&ndx<this.codes.length) {
			let cl = this.codes[ndx];
			if(this.data[lc])sels[cl] = this.data[lc];
			else {
				next = true;
				if(this.last&&!this.data[this.last])this.data[this.last] = true;
				this.last = lc;
				helper.req({[this.ifs]:cl,id:code}, d => {
					if(this.data[lc]!==true) {
						let sels = this.state.sels;
						sels[cl] = d.elems
						this.setState({sels});
					}
					this.data[lc] = d.elems;
				});
			}
		}
		if(ndx<this.codes.length)this.codes.slice(!next?ndx+1:ndx,this.codes.length).forEach(el => sels[el] = []);
		this.send[l] = code;
		this.setState({sels}); 
	}
}