const egg = require('egg');
const PORT_FLAG = 'PORT=';
let eggPort = 7001;

if (process && process.argv) {
  process.argv.forEach((val, index, arrayValue) => {
    if (val.indexOf(PORT_FLAG) != -1) {
      eggPort = val.replace(PORT_FLAG, '');
    }
  });
}

egg.startCluster({
  port: eggPort,
  baseDir: __dirname,
});