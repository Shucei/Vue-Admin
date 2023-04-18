import * as XLSX from 'xlsx'

/**
 * 获取表头（通用方式）
 * 这个方法，首先是解析出表格的范围，然后遍历每一列，获取每一列的值，然后放到一个数组中，最后返回这个数组。
 */
export const getHeaderRow = (sheet: XLSX.WorkSheet) => {
  const headers: string[] = []
  const range = sheet['!ref'] ? XLSX.utils.decode_range(sheet['!ref']) : null
  let C: number
  const R = range?.s.r ?? 0
  /* start in the first row */
  if (!range?.s) return []
  for (C = range?.s.c; C !== undefined && C <= range?.e.c; ++C) {
    /* walk every column in the range */
    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
    /* find the cell in the first row */
    let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
    headers.push(hdr)
  }
  return headers
}

export const isExcel = (file: File) => {
  return /\.(xlsx|xls|csv)$/.test(file.name)
}
