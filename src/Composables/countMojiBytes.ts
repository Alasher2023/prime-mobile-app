/**
 * 计算字符串中包含的日文字符的字节数
 * @param text 要计算的字符串
 * @returns 日文字符的字节数
 */
const countMojiBytes = (text: string) => {
  let result: number = 0
  for (const c of text) {
    const charCode = c.charCodeAt(0)
    if (
      (charCode >= 0x0 && charCode < 0x81) ||
      charCode === 0xf8f0 ||
      (charCode >= 0xff61 && charCode < 0xffa0) ||
      (charCode >= 0xf8f1 && charCode < 0xf8f4)
    ) {
      result += 1
    } else {
      result += 2
    }
  }
  return result
}

export default countMojiBytes

//eg
//yup.test('mustBeLongerThan3', 'Text must be longer than 3 characters', (value) => countMojiBytes(value) > 3)
