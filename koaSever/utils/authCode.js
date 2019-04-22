/**
 * 加密解密
 */

const crypto = require('crypto');
const key = Buffer.from('aitschool!@#$123', 'utf8');
const iv = Buffer.from('FnJL7EDzjqWjcaY9', 'utf8');

const authcode = function (str, operation){
    operation ? operation : 'DECODE';
    if (operation == 'DECODE') {
        let src = '';
        let cipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
        src += cipher.update(str, 'hex', 'utf8');
        src += cipher.final('utf8');
        return src;
    }else {
        let sign = '';
        let cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
        sign += cipher.update(str, 'utf8', 'hex');
        sign += cipher.final('hex');
        return sign;
    }
}

module.exports = authcode;