import axios from 'axios';
import { stringify } from 'querystring';
import { acts } from './reducers';
import { browserHistory } from 'react-router';
import swal from 'sweetalert2';

class Helper {
	constructor() {
		this.logged = false;
		this.c = false;
		this.createAxios();
		this.handlers = [];
	}
	showReload(func) {
		swal({
			titleText:'Не удалось загрузить данные',
			text:'Необходимо повторить запрос',
			type:'error',
			allowOutsideClick:false,
			allowEscapeKey:false,
			showLoaderOnConfirm: true,
			preConfirm: function (email) {
				return func();
			},
		}).then(() => console.log(123),()=>console.log(345));
	}
	getDate(d) {
		if(!d)return '';
		let tmp = new Date(d);
		return [tmp.getDate(),tmp.getMonth()+1,tmp.getFullYear()].map(el => el<10?'0'+el:el).join('.');
	}
	createAxios(reject = false) {
		this.axios = axios.create({
			headers: {'X-Requested-With': 'XMLHttpRequest'},
			baseURL:'http://188.0.183.146:8789/rso/',
			cancelToken: new axios.CancelToken((cancel) => {
				this.c = cancel;
			})
		});
	}
	cancel() {
		this.c('cancelled');
		this.createAxios();
	}
	req(params, success, fail) {
		if(!success)return console.error('no success function in request');
		acts.loader();
		return this.axios.post('/req',stringify(params)).then((r) => {
			acts.loader(false);
			if(r.data.logout) {
				this.logged = false;
				browserHistory.push('/login');
				return Promise.reject(true);
			}
			if(r.data.err)return Promise.reject(r.data.err);
			success(r.data);
		}).catch(e => {
			acts.loader(false);
			e = typeof e==="string"?e:"Проблема с соединением"
			if(fail) {
				window.Materialize.toast(e, 3000);
				if(fail!==true)fail();
			} else if(fail!==false)this.showReload(() => this.req(params, success, false));
			else return Promise.reject(typeof e==="string"?e:null);
		});
	}
	subscribe(event, handler) {
		this.handlers.push({event,handler});
	}

	publish(event, ...args) {
		let f = false;
		this.handlers.forEach(topic => {
			if(topic.event === event) {
				f = true;
				topic.handler.apply(topic,args);
			}
		});
		return f;
	}
}

export default new Helper();