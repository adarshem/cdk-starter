import * as cdk from 'aws-cdk-lib';
import { CfnBucket } from 'aws-cdk-lib/aws-s3';
import { IConstruct } from 'constructs';

export class TaggerAspect implements cdk.IAspect {
  private readonly key: string;
  private readonly value: string;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }

  public visit(node: IConstruct): void {
    console.log(`Visiting node: ${node.node.id}`);
    if (node instanceof CfnBucket) {
      node.tags.setTag(this.key, this.value);
    }
  }
}
