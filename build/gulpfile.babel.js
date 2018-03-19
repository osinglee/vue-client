import gulp from 'gulp'
import del from 'del'
import fs from 'fs'
import path from 'path'
import request from 'request'

const iconUrl = [
  '//at.alicdn.com/t/font_587370_tp7x8hrg53lerk9.css',
  '//at.alicdn.com/t/font_587370_tp7x8hrg53lerk9.js',
];

function path__dime(expath) {
  return path.join(__dirname, expath)
}

/**
 * 清理编译目录
 */
gulp.task('clean', function () {
  return del.sync(['../dist'], {force: true});
});

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
gulp.task('clean:icon', function () {
  return del.sync(['../src/assets/icon/**.{js,css}'], {force: true});
});

/**
 * 下载图标
 */
gulp.task('down:icon', function () {
  for (let i = 0; i < iconUrl.length; i++) {
    const fileUrl = `http:${iconUrl[i]}`;
    const filename = path__dime(`../src/assets/icon/iconfont${fileUrl.match(/\.(css|js)/)[0]}`);
    request(fileUrl).pipe(fs.createWriteStream(filename)).on('close', function () {
      console.log('更新完毕')
    });
  }
});

