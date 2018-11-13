/**
 *
 * @param file
 * @returns {Promise<any>}
 */
export function imageBase64(file) {
  const reader = new FileReader();
  const AllowImgFileSize = 2100000;
  if (file) {
    return new Promise((resolve, reject) => {
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        if (AllowImgFileSize !== 0 && AllowImgFileSize < reader.result.length) {
          reject(new Error(`请上传小于2M到图,${e}`))
        } else {
          resolve(reader.result)
        }
      }
    })
  }
}

/**
 * 判断数组里面的某个值是否存在另一个数组里
 * @param roles
 * @param meta
 * @returns {boolean}
 */
export function hasPermission(roles = [], meta = []) {
  return [...roles].some(v => meta.indexOf(v) > -1);
}

/**
 * 监听窗口变化
 * @param func
 * @param wait
 * @param immediate
 * @returns {function(...[*]=): *}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null
      }
    }
  };

  return function (...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null
    }

    return result
  }
}

/**
 * 删除对象中空属性
 * @param obj 对象
 * @returns {*} 结果
 */
export function deleteEmptyOption(obj) {
  let tempObj = { ...obj
  };
  if (!(tempObj instanceof Object)) {
    return;
  }
  for (let key in tempObj) {
    if (tempObj.hasOwnProperty(key) && (tempObj[key] === null || tempObj[key] === '' || tempObj[key] === undefined)) {
      delete tempObj[key]
    }
  }
  return tempObj;
}

/**
 * @author winer
 * 将对象中所有匹配的属性由自定义参数替代
 * @param obj 对象
 * @param tempVal 用于替代的统一值
 * @param deep 是否进行深度替换，默认值为false，即只替换第一层对象
 * @param equalVal 匹配的数据，里面包含所有用于匹配的特殊值，默认值为[undefined, null, '']
 * @returns {*} 结果
 */
export function replaceEmptyOption(obj, tempVal, deep = false, equalVal = [undefined, null, '']) {
  if (!(obj instanceof Object)) return obj;
  if (!(equalVal instanceof Array)) return obj;
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (equalVal.includes(obj[key])) {
        obj[key] = tempVal
      } else {
        if (deep) obj[key] = replaceEmptyOption(obj[key], tempVal, deep, equalVal)
      }
    }
  }
  return obj;
}

/**
 * 把数据为'-'的替换为null
 * 否则返回原数据
 */
export function replaceString(str) {
  if (str === '-') {
    str = ''
    return str
  } else {
    return str
  }
}

// 深拷贝（就是完全克隆一个新的对象，不会指向原来的地址）
export function cloneObj(obj) {
  var str;
  var newobj = obj.constructor === Array ? [] : {};
  if (typeof obj !== 'object') {
    return;
  } else if (window.JSON) {
    str = JSON.stringify(obj); // 系列化对象
    newobj = JSON.parse(str); // 还原
  } else {
    for (var i in obj) {
      newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
    }
  }
  return newobj;
}

/**
 * @param {*} money 需要格式化的金额
 * @param {*} type 需要保留的小数位
 * @returns 格式化后的金额
 */
export function formatMoney(money, type) {
  if (/[^0-9]\./.test(money)) return '-';
  if (money === null || money === '' || money === '-') return '-';
  money = money.toString().replace(/^(\d*)$/, '$1.');
  money = (money + '00').replace(/(\d*\.\d\d)\d*/, '$1');
  money = money.replace('.', ',');
  var re = /(\d)(\d{3},)/;
  while (re.test(money)) money = money.replace(re, '$1,$2');
  money = money.replace(/,(\d\d)$/, '.$1');
  if (type === 0) {
    // 不带小数位(默认是有小数位)
    var a = money.split('.');
    if (a[1] === '00') {
      money = a[0];
    }
  }
  return money;
}

export function idNumberFormat(idNumber) {
  if (!idNumber) { return '-'; }
  return idNumber.replace(/\s/g, '').replace(/(\d{6})(\d{9})(\d|[a-zA-Z]{3})/, '$1*********$3');
}

export function phoneFormat(phone) {
  if (!phone) { return '-'; }
  return phone.replace(/\s/g, '').replace(/(\d{3})(\d{6})(\d{2})/, '$1******$3');
}
