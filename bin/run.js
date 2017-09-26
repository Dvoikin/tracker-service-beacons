let BeaconsProcess = require('../obj/src/container/BeaconsProcess').BeaconsProcess;

try {
    new BeaconsProcess().run(process.argv)
} catch (ex) {
    console.error(ex);
}