import multer from "multer";
import multerS3 from "multer-s3";
import { ConnectAws } from "../../utils/s3Storage";
import { Response, Request } from "express";
import { AppDataSource } from "../../data-source";
import User from "../../entities/user.entity";
import { AppError } from "../../error/appError";
import { s3AvatarUserUrl } from "../../utils/s3Url";

export const addAvatarFile = async (req: Request, res: Response) => {
  const id = req.user.id;

  let saveAvatarImage: string;

  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id });

  if (!user) {
    throw new AppError(404, "User is not found");
  }
  const userName = user.name
        
  const upload =  multer(
  {
      storage : multerS3(
  {
      bucket : "vibefy",
      s3 : ConnectAws,
      key : (async(req : Request,file,cb)=>
      {
        if(file.fieldname === "avatar")
        { 
            if(file.mimetype === "image/jpg")
            {
                cb(null,`avatar/user/${userName}.jpg`)
                saveAvatarImage = `${userName}.jpg`
            }
            else if(file.mimetype === "image/jpeg")
            {
                cb(null,`avatar/user/${userName}.jpeg`)
                saveAvatarImage = `${userName}.jpeg`
            }
            else if(file.mimetype === "image/png")
            {
                cb(null,`avatar/user/${userName}.png`)
                saveAvatarImage = `${userName}.png`
            }
            else
            {
                return res.status(400).end("Avatar only in png,jpg or jpeg format")
            }
        }
          else
          {
              return res.status(400).end("avatar field is required")
          }
      })

  })
})
        const avatarUpload = upload.single("avatar")
    
        return avatarUpload(req,res,async()=>
        {
          try
          {
              const imageField = req.file
              if(imageField.mimetype !== "image/png" && imageField.mimetype !== "image/jpg" && imageField.mimetype !== "image/jpeg")
              {
                  return res.status(400).end("Avatar only in png,jpg or jpeg format")
              }
              const avatarUrl = s3AvatarUserUrl(saveAvatarImage);

              user.avatar_img = avatarUrl

              await userRepository.save(user)

              return res.status(200).json({avatar_img : avatarUrl})
          }
          catch(err)
          {
              return res.status(400).end("avatar is required file")
          }
      })
}
