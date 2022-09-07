import dotenv from 'dotenv';

dotenv.config();

export const config = {
  awsAccessKey: process.env.AWS_ACCESS_KEY as string,
  awsSecretKey: process.env.AWS_SECRET_KEY as string,
  awsRegion: process.env.AWS_REGION || 'eu-central-1',
  awsBucketName: process.env.AWS_BUCKET_NAME as string,
};
