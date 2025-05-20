import * as cdk from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

class L3Bucket extends Construct {
  constructor(scope: Construct, id: string, expiration: number) {
    super(scope, id);
    // Create an S3 bucket using the L3 construct
    new Bucket(this, 'MyL3Bucket', {
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(expiration)
        }
      ]
    });
  }
}

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create an S3 bucket 3 ways:
    // 1. Using the L1 construct
    new CfnBucket(this, 'MyL1Bucket', {
      lifecycleConfiguration: {
        rules: [
          {
            expirationInDays: 30,
            status: 'Enabled'
          }
        ]
      }
    });


    const duration = new cdk.CfnParameter(this, 'duration', {
      type: 'Number',
      default: 10,
      maxValue: 20,
      minValue: 1
    });

    //2. Using the L2 construct
    const l2Bucket = new Bucket(this, 'MyL2Bucket', {
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(duration.valueAsNumber)
        }
      ]
    });

    new cdk.CfnOutput(this, 'L3BucketName', {
      value: l2Bucket.bucketName
    });

    // 3. Using the L3 construct
    new L3Bucket(this, 'MyL3Bucket', 30);
  }
}
