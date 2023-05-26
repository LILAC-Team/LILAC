const maxFileSize = 100 * 1024 * 1024;

export const fileSizeValidator = (file) => {
  if (file.size > maxFileSize) {
    alert("Too Large File");
    return false;
  }
  return true;
};

export const imageSizeValidator = (file) => {
  if (file && file.size > maxFileSize) {
    return false;
  }
  return true;
};

export const pageNameValidator = (pageName) => {
  const pageNameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
  if (pageNameRegex.test(pageName)) {
    return true;
  }
  return false;
};

export const nicknameValidator = (nickname) => {
  const nicknameRegex =
    /^[\w\d\s~`!@#$%^&*()\-_+=\[\]{}\\|:;"'<>,.?/ㄱ-ㅎㅏ-ㅣ가-힣]{1,100}$/;
  if (nicknameRegex.test(nickname)) {
    return true;
  }
  return false;
};

/**
 * 1. 영문 대소문자, 한글, 숫자, 공백, 특수문자 등을 포함하여
 *    최소 1자 이상, 최대 100자까지 입력 가능.
 */

export const titleValidator = (title) => {
  const titleRegex =
    /^[\w\d\s~`!@#$%^&*()\-_+=\[\]{}\\|:;"'<>,.?/ㄱ-ㅎㅏ-ㅣ가-힣]{0,100}$/;
  if (titleRegex.test(title)) {
    return true;
  }
  return false;
};

/**
 * 1. 소수점 아래 3자리까지
 * 2. 0으로 시작 가능
 */

export const priceValidator = (price) => {
  const priceRegex = /^(\$)?(\d{1,3})(,\d{3})*(\.\d{1,3})?$/;
  if (priceRegex.test(price)) {
    return true;
  }
  return false;
};
