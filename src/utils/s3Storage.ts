import path from "path";
import fs from "fs";
import mime from "mime";
import aws, { S3 } from "aws-sdk";

import uploadConfig from "../config/upload";

class S3Storage {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: "sa-east-1",
    });
  }

  async saveFile(filename: string, pastName: string): Promise<void> {
    const originalPath = path.resolve(uploadConfig.directory, filename);

    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error("File not found");
    }

    const fileContent = await fs.promises.readFile(originalPath);

    this.client
      .putObject({
        Bucket: "testsmusics",
        Key: `${pastName}/${filename}`,
        ACL: "public-read",
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);
  }

  async deleteFile(
    filePast: string,
    fileNameMusic: string,
    fileNameImage: string
  ): Promise<void> {
    await this.client
      .deleteObjects({
        Bucket: "testsmusics",
        Delete: {
          Objects: [
            { Key: `${filePast}${fileNameMusic}`},
            { Key: `${filePast}${fileNameImage}` },
            { Key: filePast},
          ],
        },
      })
      .promise();
  }
}

export default S3Storage;
