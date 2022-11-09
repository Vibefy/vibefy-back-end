import multer from "multer"
import multerS3 from "multer-s3"
import { ConnectAws } from "../../../utils/s3Storage"
import {Response,Request} from "express"
import { AppDataSource } from "../../../data-source"
import Music from "../../../entities/music.entity"
import { AppError } from "../../../error/appError"
import { s3ImageUrl, s3MusicUrl } from "../../../utils/s3Url"

export const addMusicFilesAws = async (req : Request,res : Response)=>
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
                    if(file.fieldname === "music")
                    {
                        if(file.mimetype === "audio/mpeg")
                        {
                            saveNameMusic = `${id}/${musicName}.mp3`
                            cb(null,`musics/${id}/${musicName}.mp3`)
                        }
                        else
                        {
                            return res.status(400).json({"message": "music only in mp3 format"})
                        }
                    }
                    else
                    {
                        if(file.fieldname === "image")
                        {
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
                            else
                            {
                                return res.status(400).json({"message" : "image can only be a png, jpg or jpeg"})
                            }
                        }
                    }
                }),
    
            })
        })
        const music = upload.fields([{name : "image",maxCount : 1},{name : "music",maxCount : 1}])
    
        return music(req,res,async()=>
        {
            console.log(req.files)
            if(!saveNameMusic || !saveNameImage)
            {
                return res.status(400).json({"message": "music and image are required files"})
            }

            IsFindMusic.music_url = s3MusicUrl(saveNameMusic)
            IsFindMusic.image_url = s3ImageUrl(saveNameImage)
            
            await musicRepository.save(IsFindMusic)
            return res.status(200).json(IsFindMusic)
        })
}