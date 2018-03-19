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
