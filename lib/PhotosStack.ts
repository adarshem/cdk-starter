import * as cdk from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class PhotosStack extends cdk.Stack {
  private stackSuffix: string;
  public readonly photosBucketArn: string;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    this.initializeStackSuffix();

    const bkt = new Bucket(this, 'PhotosBucket', {
      bucketName: `photos-bucket-${this.stackSuffix}`
    });
    
    // export the bucket name so it can be used in other stacks
    this.photosBucketArn = bkt.bucketArn;

    // new cdk.CfnOutput(this, 'cfn-output-for-photos-bucket', {
    //   value: bkt.bucketName,
    //   exportName: 'photos-bucket' // This is the name that will be used to import the bucket in other stacks
    // });
  }

  private initializeStackSuffix() {
    const shortStackId = cdk.Fn.select(2, cdk.Fn.split('/', this.stackId));
    this.stackSuffix = cdk.Fn.select(4, cdk.Fn.split('-', shortStackId));
  }
}
