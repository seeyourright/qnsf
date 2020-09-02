import '../assets/js/esdk-obs-browserjs-es5-3.19.9.min'
import http from '../api/http'

// http.get('').then(res => {
// //
// // })

export default new ObsClient({
  access_key_id: 'FLOFE7BY96XI'+'RARSVBLF',
  secret_access_key: '7daciLKdX5Uw3iW0f'+'v9X4UPC16AdSn3UlOKhC5B1',
  server : 'http://obs.cn-east-3.myhuaweicloud.com',
  timeout : 60 * 5,
});
