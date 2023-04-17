// 实现一个用于生成主题色的工具函数，包括生成色值表、获取默认样式表、替换默认样式表中的颜色值等功能。同时还有写入新样式到 style 的函数和生成最新的样式表的函数。

/**
 * 1、color这个对象中{primary:#123456}，将json文件中的属性的值中的primary替换为传递进来的16进制色值，并将改变后的属性值依次转为16进制并添加入colors对象中
 * 2、拿取到elememt-plus中所有的css样式表，将包含colorMap对象中的属性的所有内容替换为值(变量)
 * 3、遍历colors对象，利用正则匹配到:primary(colors中的key)的值变为对应的属性值{el-munBg:primary} ——> {el-munBg:#123456}
 */

// 引入所需的依赖
import formula from '@/constant/formula.json' // 引入颜色计算公式
import rgbHex from 'rgb-hex' // 引入将rgb颜色转为16进制颜色的工具函数
import axios from 'axios'
import color from 'css-color-function' // 引入用于计算颜色的库

// 定义颜色计算公式的类型
interface IColor {
  [key: string]: string
}
// 将颜色计算公式转为typescript的类型
const formulas: IColor = formula

/**
 * 根据主题色，生成最新的样式表
 */
export const generateNewStyle = async (
  primaryColor: string
): Promise<string> => {
  // 1、根据主题色生成色值表
  const colors = generateColors(primaryColor)
  // 2、获取当前的element-plus 的默认样式表，并且把需要进行替换的色值打上标记
  let cssText = await getOriginalStyle()
  // 3、遍历生成的色值表，在默认样式表里进行全局替换
  Object.entries(colors).forEach(([key, value]) => {
    cssText = cssText.replace(new RegExp('(:|\\s+)' + key, 'g'), '$1' + value)
  })
  return cssText
}

/**
 * 生成主题色对应的色值表
 * @param {*} primary 主题色
 * @returns {Object} 包含主题色和其他颜色的对象
 */
export const generateColors = (primary: string): { [key: string]: string } => {
  const colors: { [key: string]: string } = {
    primary // 将传入的主题色添加到颜色表中
  }
  // 遍历颜色计算公式，将primary替换为实际的主题色，并计算出对应的颜色值
  Object.entries(formulas).forEach(([key, value]) => {
    colors[key] =
      '#' + rgbHex(color.convert(value.replace(/primary/g, primary))) // 将计算出的颜色值转为16进制
  })
  return colors // 返回生成的颜色表
}

/**
 * 获取当前 element-plus 的默认样式表
 * @returns {Promise<string>} 返回获取到的默认样式表
 */
export const getOriginalStyle = async (): Promise<string> => {
  // 使用当前package.json的版本
  const version = require('element-plus/package.json').version
  const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
  const { data } = await axios(url) // 使用axios获取element-plus的默认样式表
  // 将获取到的样式表中的颜色值替换为对应的变量名
  return getStyleTemplate(data)
}

/**
 * 将获取到的样式表中的颜色值替换为对应的变量名
 * @param {string} data 获取到的样式表
 * @returns {string} 替换后的样式表
 */
const getStyleTemplate = (data: string): string => {
  // element-plus 默认色值
  const colorMap: { [key: string]: string } = {
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
  // 遍历颜色表，将样式表中的颜色值替换为对应的变量名
  Object.keys(colorMap).forEach((key) => {
    const value = colorMap[key]
    data = data.replace(new RegExp(key, 'ig'), value)
  })
  return data // 返回替换后的样式表
}

/**
 * 将新样式写入到style标签中
 * @param {string} elNewStyle 新样式
 */
export const writeNewStyle = (elNewStyle: string): void => {
  const style = document.createElement('style')
  style.innerText = elNewStyle
  document.head.appendChild(style) // 将新样式添加到head标签中
}
