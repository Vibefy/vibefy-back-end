import {S3Client,S3} from "@aws-sdk/client-s3"
import "dotenv/config"
import multer from "multer"
import multer3 from "multer-s3"

const s3Client = new S3({credentials : 
    {
        accessKeyId : process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY
    },  region : "sa-east-1"})

const upload = multer
(
    {
        storage : multer3(
            {
                s3 : s3Client,
                bucket : "vibefy", 
                key : ((req,file,cb)=>
                {
                    const fieldname = file.fieldname
                    if(fieldname == "music")
                    {
                        const nameFile = file.originalname
                        cb(null,`musics/${nameFile}`)
                    }
                    if(fieldname == "image")
                    {
                        const nameFile = file.originalname
                        cb(null,`logos/${nameFile}`)
                    }
                }),
            }),
    }
)
async function aws()
{
    console.log(await s3Client.deleteObjects({Bucket : "vibefy",Delete : {}}))
}
aws()
export  {upload,s3Client}