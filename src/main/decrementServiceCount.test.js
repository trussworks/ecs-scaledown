const core = require('@actions/core');
const run = require('./decrementServiceCount.js');

jest.mock('@actions/core');

const FAKE_SERVICE = 'fake-service'
const FAKE_CLUSTER = 'fake-cluster'

function mockGetInput(requestResponse) {
  return function (name, options) { // eslint-disable-line no-unused-vars
      return requestResponse[name]
  }
}

const NO_INPUTS = {}
const SERVICE_ONLY = {
  service: FAKE_SERVICE
}
const CLUSTER_ONLY = {
  cluster: FAKE_CLUSTER
}

describe('Decrement Service Count', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  test('action fails when service and cluster are not set', async () => {
    core.getInput = jest
      .fn()
      .mockImplementation(mockGetInput(NO_INPUTS))
    await run();

    expect(core.setFailed)
  })

  test('action fails when cluster is not set', async () => {
    core.getInput = jest
      .fn()
      .mockImplementation(mockGetInput(SERVICE_ONLY))
    await run();

    expect(core.setFailed)
  })

  test('action fails when service is not set', async () => {
    core.getInput = jest
      .fn()
      .mockImplementation(mockGetInput(CLUSTER_ONLY))
    await run();

    expect(core.setFailed)
  })
});