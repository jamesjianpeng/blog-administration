import $ from 'jquery'
import { History } from 'history'
import { IUrlQuery } from 'src/help/request'
export const scrollTop = () => {
  $('#main-container_srcoll-top').animate({scrollTop:0},100);
  window.scrollTo(0,0)
}

export const delNullData = (data: any) => {
  Object.keys(data).map((item: string) => {
    if (!data[item]){
      delete data[item]
    }
  })
}

export const splitUrl = <T>(url: string): T => {
  const index: number = url.indexOf('?')
  url = url.slice(index + 1)
  const result: any = {}
  url.split('&').map((item: any) => {
      const newItem: any = item.split('=')
      result[newItem[0]] = decodeURIComponent(newItem[1])
      return item
  })
  return result
}

export const toolbar: any = [
  ['bold', 'italic', 'underline'],        // toggled buttons

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': ['#448aff', 'red'] }, { 'background': ['#448aff', 'red'] }],          // dropdown with defaults from theme

  ['clean'],
  ['image']                                      // remove formatting button
];

export const changeURL = (history: History, location: any, option: any) => {
  const query: IUrlQuery = splitUrl(location.search)
  const newPath: string = buildURL(location.pathname, { ...query, ...(option || {}) })
  history.push(newPath)
}

export const handleObj = (data: any) => {
  const list: any[] = []
  for(const value in data) {
    list.push({
      text: data[value],
      value
    })
  }
  return list
}

export const getBase64 = (img: any, callback: any) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

const type = ( (): any => {
  const typeList: string[] = ['String', 'Number', 'Boolean', 'Undefined', 'Null', 'Array', 'Object', 'Function', 'Arguments']
  const tt: any = {};
  for (let i = 0;i < typeList.length;i++) {
    const t = typeList[i];
    ((typeInner) => {
      tt['is' + typeInner] = (options: any) => {
        return Object.prototype.toString.call(options) === '[object ' + typeInner + ']'
      }
    })(t)
  }
  return tt;
})();

/**
 * froEach Iterator
 *
 * @param {Object} obj Traversing objects
 * @param {Function} callback Callback
 *
 */

const forEach = (obj: any, callback: (k: any, v: any, o: any) => void) => {
  'use strict';

  if (obj == null) {
    throw new TypeError('obj is null or undefined');
  }

  if (typeof obj !== 'object') {
    throw new TypeError('obj is not object');
  }

  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not function');
  }

  if (type.isObject(obj)) {
    for (const prop in obj) {
      const value = obj[prop];
      callback(value, prop, obj);
    }
  }

  if (type.isArray(obj)) {
    for(let i = 0; i < obj.length; i++){
      const value = obj[i];
      callback(value, i, obj);
    }
  }
}

function encode(val: any) {   // encodeURIComponent 转义除了字母、数字、(、)、.、!、~、*、'、-和_之外的所有字符
  val = val ? val : ''
  val = typeof val !== 'string' ? val.toString().trim() : val.trim()
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * addURLParam is a function that connects each url parameter
 *
 * @param {String} url
 * @param {String} key
 * @param {String|Number|Boolean} value
 *
 */

const addURLParam = (url: string, key: string, value: string) => {
  'use strict';

  url += url.indexOf('?') === -1 ? '?' : '&'
  url += encode(key) + '=' + encode(value)
  return url
}

/**
 *
 * buildURL is used '?' Or '&' splicing the full url
 *
 * @param {String} url
 * @param {Object} options
 *
 */

export function buildURL (url: string, options: any) {
  if (!options) {
    return url
  }
  const newOptions = {}
  Object.keys(options).map((it: string) => {
    if (it) {
      newOptions[it] = options[it]
    }
  })
  forEach(newOptions, (value: string, key: string) => {
    url = addURLParam(url, key, value);
  })
  return url;
}
