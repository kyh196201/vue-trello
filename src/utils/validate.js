const REGEX = {
    num: /[0-9]/,
    eng: /[a-zA-z]/,
    spc: /[~!@#$%^&*()_+|<>?:{}]/, // 특수문자
    kor: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/,
};

const validator = (value, type) => {
    const checkList = {
        boardTitle: () => {
            //value의 길이가 없으면 false를 return, 그렇지 않으면 REGEX[type].test(value)를 실행한다.
            //정규식 결과가 true => 특수문자가 있다는 뜻이므로 !을 붙여서 false가 되도록 한다.
            return !value.length ? false : !REGEX["spc"].test(value);
        },
    };

    return checkList[type]();
};

//1. 제목을 입력한다
//2. 특수문자가 들어간다
//3. 오류를 알려주고, 제목을 초기화한다/특수문자를 지운다.

const validate = (str, type) => {
    return validator(str, type);
};

export default validate;
