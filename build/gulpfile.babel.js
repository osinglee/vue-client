import gulp from 'gulp'
import del from 'del'

/**
 * 清理编译目录
 */
gulp.task('clean', function () {
  return del.sync(['../dist'], {force: true});
});

