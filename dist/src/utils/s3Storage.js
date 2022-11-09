"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectAws = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
exports.ConnectAws = new client_s3_1.S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: "sa-east-1",
});
