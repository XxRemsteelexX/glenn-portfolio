
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createS3Client, getBucketConfig } from "./aws-config";

const s3Client = createS3Client();
const { bucketName, folderPrefix } = getBucketConfig();

export async function uploadFile(buffer: Buffer, fileName: string): Promise<string> {
  const key = `${folderPrefix}${fileName}`;
  
  try {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: buffer,
    });
    
    await s3Client.send(command);
    return key; // Return the S3 key as cloud_storage_path
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    throw new Error('Failed to upload file');
  }
}

export async function downloadFile(key: string): Promise<string> {
  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });
    
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1 hour
    return signedUrl;
  } catch (error) {
    console.error('Error generating signed URL:', error);
    throw new Error('Failed to generate download URL');
  }
}

export async function deleteFile(key: string): Promise<void> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });
    
    await s3Client.send(command);
  } catch (error) {
    console.error('Error deleting file from S3:', error);
    throw new Error('Failed to delete file');
  }
}

export async function renameFile(oldKey: string, newKey: string): Promise<string> {
  // S3 doesn't have a rename operation, so we need to copy and delete
  try {
    // First, get the object
    const getCommand = new GetObjectCommand({
      Bucket: bucketName,
      Key: oldKey,
    });
    
    const response = await s3Client.send(getCommand);
    
    if (!response.Body) {
      throw new Error('Failed to get file content');
    }
    
    // Convert the stream to buffer
    const chunks: Buffer[] = [];
    const stream = response.Body as any;
    
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    
    const buffer = Buffer.concat(chunks);
    
    // Upload to new location
    const putCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: newKey,
      Body: buffer,
    });
    
    await s3Client.send(putCommand);
    
    // Delete old file
    await deleteFile(oldKey);
    
    return newKey;
  } catch (error) {
    console.error('Error renaming file in S3:', error);
    throw new Error('Failed to rename file');
  }
}
