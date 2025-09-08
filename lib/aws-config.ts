
import { S3Client } from "@aws-sdk/client-s3";

interface BucketConfig {
  bucketName: string;
  folderPrefix: string;
}

export function getBucketConfig(): BucketConfig | null {
  const bucketName = process.env.AWS_BUCKET_NAME;
  if (!bucketName) {
    return null;
  }
  
  return {
    bucketName,
    folderPrefix: process.env.AWS_FOLDER_PREFIX || ""
  };
}

export function createS3Client(): S3Client {
  return new S3Client({});
}
