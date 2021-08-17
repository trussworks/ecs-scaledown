const configAwsCreds = require('./configAwsCreds')
const decrementServiceCount = require('./decrementServiceCount')

async function run() {
  await configAwsCreds()
  await decrementServiceCount()
}

module.exports = run;

if (require.main === module) {
    run();
}
