'use strict'

import {fetchs} from 'utils/fetch'
import * as CONFIG from 'utils/config'

/**
 * 登录注册
 * @param { Object } 
	tel	string(16)	Y	手机号
	smsCode	String(6)	Y	短信验证码
	deviceId	String(64)	Y	设备ID
 */
export function ottRegister (query) {
  return fetchs(CONFIG.DOMAIN_PREFIX.ott + '/ott/v1.0.0/user/register', query, 'GET')
}

/**
 *  获取图形验证码接口
 * @param { Object } 
 */
export function getImgCode (query) {
  return fetchs(CONFIG.DOMAIN_PREFIX.ott + '/ott/v1.0.0/user/get/imgCode', query, 'GET')
}
