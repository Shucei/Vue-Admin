export const treeData = (rows: any, pid: string) => {
  const arr: any = []
  rows.forEach((element: any) => {
    if (element.pid === pid) {
      element.children = treeData(rows, element._id)
      // arr.forEach(item => {
      //   if (item.pid === element._id) {
      //     element.children.push(item)
      //   }
      // })
      arr.push(element)
    }
  })
  return arr
}
