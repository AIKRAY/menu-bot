import S3 from 'aws-sdk/clients/s3';
import { config } from '../config';

export class S3Service {
  private s3: S3;

  constructor() {
    this.s3 = new S3({
      accessKeyId: config.awsAccessKey,
      secretAccessKey: config.awsSecretKey,
      region: config.awsRegion,
    });
  }

  uploadImage(buffer: Buffer, name: string) {
    return this.s3
      .upload({
        Bucket: config.awsBucketName,
        Key: name,
        Body: buffer,
      })
      .promise();
  }

  async getImage(key: string) {
    const result = await this.s3
      .getObject({
        Bucket: config.awsBucketName,
        Key: key,
      })
      .promise();

    return result.Body;
  }
}

export const s3ServiceInstance = new S3Service();
