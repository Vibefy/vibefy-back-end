import multer, { MulterError } from "multer"
import multerS3 from "multer-s3"
import { ConnectAws } from "../../../utils/s3Storage"
import {Response,Request} from "express"
import { AppDataSource } from "../../../data-source"
import Music from "../../../entities/music.entity"
import { AppError } from "../../../error/appError"
import { s3ImageUrl, s3MusicUrl } from "../../../utils/s3Url"

export const addMusicFilesAws = async (req : Request,res : Response)=>
{
    try
    {
        const id = req.params.id
    
        let saveNameMusic: string
        let saveNameImage : string

        const musicRepository = AppDataSource.getRepository(Music)
    
        const IsFindMusic = await musicRepository.findOneBy({id})
    
        if(!IsFindMusic)
        {
            throw new AppError(404,"Music not found")
        }
        const musicName = IsFindMusic.name
        
        const upload =  multer(
            {
                storage : multerS3(
            {
                bucket : "vibefy",
                s3 : ConnectAws,
                key : (async(req : Request,file,cb)=>
                {
                    try
                    {
                        if(file.fieldname === "music")
                        {
                            if(file.mimetype !== "audio/mpeg")
                            {
                                throw new AppError(400,"music only in mp3 format")
                            }
                            saveNameMusic = `${id}/${musicName}.mp3`
                            cb(null,`musics/${id}/${musicName}.mp3`)
                        }
                        else
                        {
                            if(file.fieldname === "image")
                            {
                                if(file.mimetype !== "image/jpg" && file.mimetype !== "image/jpeg" && file.mimetype !== "image/png")
                                {
                                    throw new AppError(400,"image can only be a png, jpg or jpeg")
                                }
                                if(file.mimetype === "image/jpg")
                                {
                                    saveNameImage = `${id}/${musicName}.jpg`
                                    cb(null,`musics/${id}/${musicName}.jpg`)
                                }
                                else if(file.mimetype === "image/jpeg")
                                {
                                    saveNameImage = `${id}/${musicName}.jpeg`
                                    cb(null,`musics/${id}/${musicName}.jpeg`)
                                }
                                else if(file.mimetype === "image/png")
                                {
                                    saveNameImage = `${id}/${musicName}.png`
                                    cb(null,`musics/${id}/${musicName}.png`)
                                }
                            }
                        }
                    }
                    catch(err)
                    {
                        if(err instanceof AppError)
                        {
                            return res.status(err.statusCode).end(err.message)
                        }
                        return res.status(500).json({"message" : "Error"})
                    }
                }),
    
            })
        })
        const music = upload.fields([{name : "image",maxCount : 1},{name : "music",maxCount : 1}])
    
        return music(req,res,async()=>
        {
            try
            {
                if(!saveNameMusic || !saveNameImage)
                {
                    throw new AppError(400,"music and image are required files")
                }
                else
                {
                    IsFindMusic.music_url = s3MusicUrl(saveNameMusic)
                    IsFindMusic.image_url = s3ImageUrl(saveNameImage)
                    await musicRepository.save(IsFindMusic)

                    return res.status(200).json(IsFindMusic)
                }
            }
            catch(err)
            {
                if(err instanceof AppError)
                {
                    return res.status(err.statusCode).end(err.message)
                }
                return res.status(500).json("Error")
            }
            
        })
    }
    catch(err)
    {
        if(err instanceof AppError)
        {
            return res.status(err.statusCode).json({"message" : err.message})
        }
        return res.status(400).json(err.message)
    }
}