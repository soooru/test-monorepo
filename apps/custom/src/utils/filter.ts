/**
 * 이메일 유효성 검사
 * @param email 이메일 주소
 * @returns 유효성 여부 (true: 유효, false: 유효하지 않음)
 */
function FILTER_valid_mail(email: string): boolean {
  const format: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return format.test(email);
}

/**
 * 휴대폰 유효성 검사
 * @param mobile 휴대폰 번호
 * @returns 유효성 여부 (true: 유효, false: 유효하지 않음)
 */
function FILTER_valid_mobile(mobile: string): boolean {
  const format: RegExp = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
  return format.test(mobile);
}

/**
 * 1000 단위로 콤마를 찍는 함수
 * @param num 숫자
 * @returns 1000 단위로 콤마가 찍힌 문자열
 */
function FILTER_comma(num: number | string): string {
  if (typeof num === 'string') num = Number(num);
  const resultNum = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return resultNum || '';
}

export { FILTER_valid_mail, FILTER_valid_mobile, FILTER_comma };
