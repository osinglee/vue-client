const gulp = require('gulp');
const del = require('del');
const fs = require('fs');
const path = require('path');
const request = require('request');
const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const iconUrl = [
  '//at.alicdn.com/t/font_587370_fqxgw941r6r.css',
  // '//at.alicdn.com/t/font_587370_f1lko9qirkep14i.js',
];

function path__dime(expath) {
  return path.join(__dirname, expath)
}

/**
 * 更新图标库
 */
gulp.task('updateIcon', ['clean:icon', 'down:icon'], function () {
  fs.readFile(path__dime('../src/assets/icon/iconfont.css'), 'utf8', function (err, data) {
    const regexp = /url\(('\/\/at.alicdn.com\/(\S+)'\))/g;
    console.log(data.toString().match(regexp));
  });
});

/**
 *  清空图标
 */
gulp.task('clean:icon', function (cb) {
  del.sync(['../src/assets/icon/**.{js,css}'], {force: true});
  return cb()
});

/**
 * 下载图标
 */
gulp.task('down:icon', function () {
  for (let i = 0; i < iconUrl.length; i++) {
    const fileUrl = `http:${iconUrl[i]}`;
    const filename = path__dime(`../src/assets/icon/iconfont${fileUrl.match(/\.(css|js)/)[0]}`);
    request(fileUrl).pipe(fs.createWriteStream(filename)).on('close', function () {
      console.log('更新完成')
    });
  }
});

/**
 * 更新 api
 */
gulp.task('update:api', async function () {
  await rl.question("请输入更新模块:\n", async (answer) => {
    /** api 地址 */
    const apiPath = 'http://192.168.199.215:3000/api/swagger_doc';
    /** 存放路径 */
    const writePath = path__dime(`../src/store/${answer}/api.js`);
    await writeApi(apiPath, writePath, answer.replace(/-([a-z])/, (a, b) => b.toLocaleUpperCase()));
    rl.close();
  });
});


function getApi(path) {
  return axios.get(path).then(res => res)
}

async function writeApi(apiPath, writePath, fileName) {
  try {
    const res = await getApi(apiPath);
    const list = renderList(res.data.paths, fileName);
    const className = `import {${fileName}Server} from '@/tools/servers'\n
/**
 * ${res.data.info.title}
 * ${new Date()}
 */
export class ${fileName.replace(/\w/, function (a) {
      return a.toLocaleUpperCase()
    })}Api {\n${list}}\n`;
    fs.writeFileSync(writePath, className);
    console.log('更新成功');
    return process.exit(1)
  } catch (e) {
    console.error('更新失败' + e);
    return process.exit(3);
  }
}

function renderList(paths, fileName) {
  let li = '';
  const pathy = Object.keys(paths);
  for (let i = 0; i < pathy.length; i++) {
    const d = paths[pathy[i]];
    const mothed = Object.keys(d)[0].toLocaleUpperCase();
    const body = mothed === 'GET' ? 'search' : 'data';
    li += `  /**
   * ${d[Object.keys(d)[0]].summary}
   * string
   */
  static ${pathy[i]
      .replace(/\/([a-z])/g, (a, b) => b.toLocaleUpperCase())
      .replace(/\/(\{\w+\})/g, '')
      .replace(/_([a-z])/g, (a, b) => b.toLocaleUpperCase())
      .replace(/\//g, '')
      }(${ body + ' = {}'}${/(\{(\w+)\})/.test(pathy[i]) ? ', id' : ''}) {
    return ${fileName}Server.connection('${mothed}', !${pathy[i].replace(/(\{\w+\})/, (a, b) => '$' + b)}!, ${body})\n  }\n\n`
  }
  return li.replace(/!/g, '`')
}
