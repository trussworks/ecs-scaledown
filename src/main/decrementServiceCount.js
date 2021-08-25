const core = require('@actions/core');
const aws = require('aws-sdk');

async function run() {
  const service = core.getInput('service', { required: true });
  const cluster = core.getInput('cluster', { required: true });
  try {
    // Connect to ecs and pull the task definition
    const ecs = new aws.ECS({
      customUserAgent: 'amazon-ecs-deploy-task-definition-for-github-actions'
    });
    await ecs.updateService({ service, cluster, desiredCount: 0 }).promise();
  } catch (error) {
    throw new Error(`Could not connect to ECS service. Please check your action inputs: ${error.message}`);
  }
}

module.exports = run;