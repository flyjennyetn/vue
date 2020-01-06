import {Toast} from 'antd-mobile';
import axios from 'axios';
import Qs from 'qs';

let config = {
    headers: {'Content-Type': 'application/json;charset=UTF-8'},
    timeout: 10000,
    responseType: 'json',
    withCredentials: true,
    changeOrigin:true,//允许跨域
    transformRequest: [(data) => {
        return Qs.stringify(data);
    }],
    transformResponse: [(json)=> {
        return json;
    }]
};

// axios.interceptors.response.use(function (res) {
//     //相应拦截器
//     return res;
// });

export function axiosJs(api, data, rawMethod, dataType) {

    let newUrl = 'http://' + api;
    config.method = rawMethod;
    config.data = data;
    config.responseType = dataType ? dataType : 'json';
    return axios(newUrl,config)
    .then(function(res){
        let data = res;
        if(res.status && res.status == '200'){
            data = res.data
        }
        return data;
    }).catch(function(err){
        Toast.fail('网络请求异常，请检查网络');
        return false;
    })

}

