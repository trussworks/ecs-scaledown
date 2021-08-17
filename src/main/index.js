const configAwsCreds = require('./configAwsCreds')

async function run() {
  await configAwsCreds()
  await deployTaskDefinition(newTaskDef)
}

module.exports = run;

if (require.main === module) {
    run();
}
