# ecs-scaledown

The purpose of this repository is to provide a GitHub Action to
scale down an ECS service's desired count to zero.

This action leverages the aws-actions/configure-aws-credentials action.

## What it does

1. Configure AWS credentials. Uses existing action:
 [aws-actions/configure-aws-credentials](https://github.com/aws-actions/configure-aws-credentials)
2. Uses the AWS SDK for JavaScript to decrement the
 specified ECS Service's `desired count` attribute to 0.

## Modifications made to existing AWS actions

No modifications made. the `index.js` and `cleanup.js` files from
 the configure-aws-credentials action were copied into
  `src/main/configAwsCreds.js` and `src/cleanup/configAwsCreds.js`.

## Use Case and Usage

This action was developed as a way to scale down an ECS Service after the tasks no longer need to be run.
Specifically, this is designed to work following a workflow using Self-Hosted GitHub Runners that are stood up by the [trussworks/ecs-scaleup](https://github.com/trussworks/ecs-scaleup) action.

```yaml
ecs-scaledown:
  name: Scale down ECS Service
  needs: [ecs-scaleup, ALL_OTHER_JOBS]
  runs-on: ubuntu-latest
  steps:
    - name: ecs-scaledown
      uses: trussworks/ecs-scaledown
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: "us-east-1"
        service: github-actions-runner
        cluster: github-runner
```

**NOTE**: When using this to deprovision Self-Hosted GitHub runners, you must populate the `needs` argument in the YAML above with all other jobs that are using self-hosted runners.