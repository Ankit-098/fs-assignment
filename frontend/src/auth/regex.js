function checkEmail(mail){
    let reg=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
return reg.test(mail); 
}

function isNumber(num){
    let reg= /^[0-9]+$/
    return reg.test(num);
}

export{isNumber,checkEmail}