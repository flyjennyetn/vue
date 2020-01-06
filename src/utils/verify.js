
export const verifyPwd = (str) =>{
    let result = 'success';
    let pwd_reg_space = /\s+/g;
    if (pwd_reg_space.test(str)) {
        result = '密码不能使用空格';
    }

    let reg = /^[a-zA-Z0-9]*$/;
    if (str.length < 6 || str.length > 16 || !reg.test(str)) {
        result = '请输入6-16位数字和字母';
    }

    return result;
}

export const verifyTel = (str) =>{
    let result = 'success';

    if(str == ""){
        result = '手机号不能为空';
    }

    let pax = /^(13[0-9]|15[0-9]|18[0-9]|14[0-9]|17[0-9])\d{8}$/;
    if (result == "success" && !pax.test(str)) {
        result = '请填写正确的手机号';
    }
    return result;
}

export const verifyTelCode = (str)=> {
    let result = 'success';
    let pax = /^[0-9]{6}$/;
    if (!pax.test(str)) {
        result = '请填写正确短信验证码';
    }
    return result;
}

export const verifyImgCode = (str)=> {
    let result = 'success';
    let reg = /^[a-zA-Z0-9]{4}$/;
    if (!reg.test(str)) {
        result = '请填写正确的图形验证码';
    }
    return result;
}