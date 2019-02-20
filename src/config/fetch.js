import {
	baseUrl
} from './env'
import axios from 'axios'
import {Message} from 'mint-ui'

axios.interceptors.request.use(config=> {
  return config;
}, err=> {
  Message.error({message: '请求超时!'});
  return Promise.resolve(err);
})
export  const loginPostRequest = (url, params) => {              //不用发送userId,token
	return axios({
	    method: 'GET',
	    url: baseUrl+`${url}`,
	    data: params,
	    transformRequest: [function (data) {
	    	  let ret = ''
		      for (let it in data) {
		        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
		      }
		      return ret
	    }],
	    headers: {
	      'Content-Type': 'application/x-www-form-urlencoded'
	    },
	    async:false,
	    dataType : "json",
        jsonp: "callback",
        jsonpCallback:"success_jsonpCallback",
        mode: "no-cors",
		cache: "force-cache"
  	});
}

export const getDataRequest = (url, params) =>{
	return axios({
			    method: 'post',
			    url: baseUrl+`${url}`,
			    data: params,
			    transformRequest: [function (data) {
			      let ret = ''
			      for (let it in data) {
			        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
			      }
			      return ret
			    }],
			    headers: {
			      'Content-Type': 'application/x-www-form-urlencoded',
			      "X-Auth-UserId" : parseInt(localStorage.getItem("userId")),
				  "X-Auth-Token" : localStorage.getItem("token")
			    },
			    mode: "no-cors",
			    cache: "force-cache"
		  	});
}