import formula from '@/constant/formula.json'
import rgbHex from 'rgb-hex'
import axios from 'axios'
import color from 'css-color-function'

/**
 * 1、color这个对象中{primary:#123456}，将json文件中的属性的值中的primary替换为传递进来的16进制色值，并将改变后的属性值依次转为16进制并添加入colors对象中
 * 2、拿取到elememt-plus中所有的css样式表，将包含colorMap对象中的属性的所有内容替换为值(变量)
 * 3、遍历colors对象，利用正则匹配到:primary(colors中的key)的值变为对应的属性值{el-munBg:primary} ——> {el-munBg:#123456}
 */

/**
 * 写入新样式到 style
 * @param {*} elNewStyle  element-plus 的新样式
 * @param {*} isNewStyleTag 是否生成新的 style 标签
 */
export const writeNewStyle = (elNewStyle) => {
  const style = document.createElement('style')
  style.innerText = elNewStyle
  document.head.appendChild(style)
}

/**
 * 根据主题色，生成最新的样式表
 */
export const generateNewStyle = async (parimaryColor) => {
  // 1、根据主题色生成色值表
  const colors = generateColors(parimaryColor)
  // 2、获取当前的element-plus 的默认样式表，并且把需要进行替换的色值打上标记
  let cssText = await getOriginalStyle()
  // 3、遍历生成的色值表，在默认样式表里进行全局替换
  Object.keys(colors).forEach((key) => {
    cssText = cssText.replace(
      new RegExp('(:|\\s+)' + key, 'g'),
      '$1' + colors[key]
    )
  })

  return cssText
}

export const generateColors = (primary) => {
  if (!primary) return
  const colors = {
    primary
  }
  Object.keys(formula).forEach((key) => {
    const value = formula[key].replace(/primary/g, primary)
    colors[key] = '#' + rgbHex(color.convert(value)) //转换为16进制色值
  })
  return colors
}

/**
 * 获取当前 element-plus 的默认样式表
 */
export const getOriginalStyle = async () => {
  // 使用当前package.json的版本
  const version = require('element-plus/package.json').version
  const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
  const { data } = await axios(url)
  // 把获取到的数据筛选为原样式模板
  return getStyleTemplate(data)
}

/**
 * 返回 style 的 template
 */
const getStyleTemplate = (data) => {
  // element-plus 默认色值
  const colorMap = {
    '#3a8ee6': 'shade-1',
    '#409eff': 'primary',
    '#53a8ff': 'light-1',
    '#66b1ff': 'light-2',
    '#79bbff': 'light-3',
    '#8cc5ff': 'light-4',
    '#a0cfff': 'light-5',
    '#b3d8ff': 'light-6',
    '#c6e2ff': 'light-7',
    '#d9ecff': 'light-8',
    '#ecf5ff': 'light-9'
  }
  // 根据默认色值为要替换的色值打上标记
  Object.keys(colorMap).forEach((key) => {
    const value = colorMap[key]
    // 比如将data中#409eff 替换为primary
    data = data.replace(new RegExp(key, 'ig'), value)
  })
  return data
}
