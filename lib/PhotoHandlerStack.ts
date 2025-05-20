import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  Function as LambdaFunction,
  Runtime,
  Code
} from 'aws-cdk-lib/aws-lambda';

interface PhotoHandlerStackProps extends cdk.StackProps {
  targetBucketArn: string;
}

export class PhotoHandlerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: PhotoHandlerStackProps) {
    super(scope, id, props);
    // Import the bucket name from the PhotosStack
    // This is the bucket name that was exported from the PhotosStack
    // and can be used in this stack
    // The bucket name is passed as an environment variable to the Lambda function
    const targetBucket = cdk.Fn.importValue('photos-bucket');

    new LambdaFunction(this, 'PhotoHandler', {
      functionName: 'PhotoHandler',
      runtime: Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: Code.fromInline(`
        exports.handler = async (event) => {
          console.log('Hello:' + process.env.TARGET_BUCKET);
        };
        `),
      environment: {
        TARGET_BUCKET: props.targetBucketArn
      }
    });
  }
}
