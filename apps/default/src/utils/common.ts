/**
 * 테이블에서 값을 찾아 인덱스 반환
 * @param list 테이블 리스트
 * @param id 아이디로 사용할 키
 * @param val 찾을 값
 * @returns 찾은 값의 인덱스 (없을 경우 null)
 * @exam  const index = getTableIndex([{ id: 1, name: 'Alice' },{ id: 2, name: 'Bob' }], 'id', 2) => 1
 */
function COMM_get_table_index<T>(list: T[], id: keyof T, val: any): number | null {
  let index: number | null = null;
  list.find((o, i) => {
    const propValue = o[id];
    if (propValue === undefined || propValue === null) return false;
    if (propValue.toString() === val.toString()) {
      index = i;
      return true;
    }
    return false;
  });
  return index;
}

/**
 * 컴포넌트가 존재하는지 여부 확인
 * @param middlepath 컴포넌트 경로 (@/제외)
 * @param compFileName 컴포넌트 파일 이름
 * @returns boolean
 */
async function COMM_is_comp(middlepath: string, compFileName: string) {
  try {
    await import(`@/${middlepath}/${compFileName}.vue`);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * 객체 깊은 복사 함수
 *
 * @param {Object} obj - 복사할 객체
 * @returns {Object} - 복사된 객체
 */
function COMM_deepclone_obj(obj: Record<string, any>): Record<string, any> {
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) return obj;
  const objCopy: Record<string, any> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      objCopy[key] = COMM_deepclone_obj(obj[key]);
    }
  }
  return objCopy;
}

/**
 * 배열 깊은 복사 함수
 *
 * @param {Array} arr - 복사할 배열
 * @returns {Array} - 복사된 배열
 */
function COMM_deepclone_arr(arr: any[]): any[] {
  if (!Array.isArray(arr)) return arr;
  const arrCopy: any[] = [];
  for (let i = 0; i < arr.length; i++) {
    arrCopy[i] = COMM_deepclone_obj(arr[i]);
  }
  return arrCopy;
}

export { COMM_get_table_index, COMM_is_comp, COMM_deepclone_obj, COMM_deepclone_arr };
