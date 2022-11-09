import { S3Client } from "@aws-sdk/client-s3";

export const ConnectAws = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: "sa-east-1",
});
