const os = require('os');

const getLocalIP = function () {
  const osType = os.type()
  const netInfo = os.networkInterfaces()

  try {
    switch(osType) {
      case 'Windows_NT':
        for (let dev in netInfo) {
          if (dev === '本地连接' || dev === '以太网') { //win7的网络信息中显示为本地连接，win10显示为以太网
            for (let i = 0; i < netInfo[dev].length; i++) {
              if (netInfo[dev][i].family === 'IPv4') {
                return netInfo[dev][i].address;
              }
            }
          }
        }
        break
      case 'Darwin':
        for (let i = 0; i < netInfo.en1.length; i++) {
          if (netInfo.en1[i].family === 'IPv4') {
            return netInfo.en1[i].address
          }
        }
        break
      case 'Linux':
        return netInfo.eth0[0].address
      default:
        throw Error('未知的设备类型')
    }
  } catch (e) {
    console.error(e)
  }

  return 'localhost'
}

module.exports = {
  getLocalIP
}