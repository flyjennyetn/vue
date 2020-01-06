import {Toast} from 'antd-mobile';
import fetchJsonp from 'fetch-jsonp';
import Qs from 'qs';

export function fetchs(api, data, rawMethod, dataType) {
    let newUrl = 'http://' + api;
    if(JSON.stringify(data) != "{}"){
        let queryStr = '?'+Qs.stringify(data);
        newUrl += queryStr;
    }
    return fetchJsonp(newUrl)
    .then(response => response.json()
        .then(json => ({json,response})))
    .then(({json, response}) => {
        return json;
    }).catch((err)=>{
        if(api != 'data.ssports.ptqy.gitv.tv/logs/ott/tv'){
            Toast.fail('网络请求异常，请检查网络');
        }
        return false;
    })
}
