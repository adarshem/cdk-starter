#!/opt/homebrew/opt/node/bin/node
import * as cdk from 'aws-cdk-lib';
import { CdkStarterStack } from '../lib/cdk-starter-stack';
import { PhotosStack } from '../lib/PhotosStack';
import { PhotoHandlerStack } from '../lib/PhotoHandlerStack';
import { Aspects, Tag } from 'aws-cdk-lib';
import { TaggerAspect } from './TaggerAspects';

const app = new cdk.App();

const photosStack = new PhotosStack(app, 'PhotosStack');
new PhotoHandlerStack(app, 'PhotoHandlerStack', {
  targetBucketArn: photosStack.photosBucketArn
});

// Add a tag to all resources in the stack
Aspects.of(app).add(new Tag('Project', 'CDK Starter'));

const tagger = new TaggerAspect('level', 'Test');
Aspects.of(app).add(tagger);
