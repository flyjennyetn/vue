
let isProduction = false;
if (JSON.stringify(process.env).indexOf('production') > -1) {
	isProduction = true;
}

// 主域名对象
const DOMAIN = {
  ott: isProduction ? "..." :'...'
};

// 接口域名对象
export const DOMAIN_PREFIX = {
  ott: process.env.NODE_ENV === 'development' ? window.location.host : DOMAIN.ott,
  location:'//location',
};
