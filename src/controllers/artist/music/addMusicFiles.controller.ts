import multer from "multer"
import multerS3 from "multer-s3"
import { ConnectAws } from "../../../utils/s3Storage"
import {Response,Request} from "express"
import { AppDataSource } from "../../../data-source"
import Music from "../../../entities/music.entity"
import { AppError } from "../../../error/appError"
import { s3ImageUrl, s3MusicUrl } from "../../../utils/s3Url"

export const addMusicFilesController = async (req : Request,res : Response)=>
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
                            cb(null,`musics/${id}/${musicName}.mp3`)
                            saveNameMusic = `${id}/${musicName}.mp3`
                        }
                    }
                    if(file.fieldname === "image")
                    { 
                        if(file.mimetype === "image/jpg")
                        {
                            cb(null,`musics/${id}/${musicName}.jpg`)
                            saveNameImage = `${id}/${musicName}.jpg`
                        }
                        if(file.mimetype === "image/jpeg")
                        {
                            cb(null,`musics/${id}/${musicName}.jpeg`)
                            saveNameImage = `${id}/${musicName}.jpeg`
                        }
                        if(file.mimetype === "image/png")
                        {
                            cb(null,`musics/${id}/${musicName}.png`)
                            saveNameImage = `${id}/${musicName}.png`
                        }
                    }
                })
    
            })
        })
        const music = upload.fields([{name : "image",maxCount : 1},{name : "music",maxCount : 1}])
    
        return music(req,res,async()=>
        {
            try
            {
                const musicField = req.files["music"][0]
                const imageField = req.files["image"][0]
                if(musicField.mimetype !== "audio/mpeg")
                {
                    return res.status(400).json({"message": "Music only in mp3 format"})
                }
                if(imageField.mimetype !== "image/png" && imageField.mimetype !== "image/jpg" && imageField.mimetype !== "image/jpeg")
                {
                    return res.status(400).json({"message": "Image only in png,jpg or jpeg format"})
                }
                IsFindMusic.image_url = s3ImageUrl(saveNameImage)
                IsFindMusic.music_url = s3MusicUrl(saveNameMusic)
    
                await musicRepository.save(IsFindMusic)
                return res.status(200).json(IsFindMusic)
            }
            catch(err)
            {
                return res.status(400).json({"message" : "music and image are required files"})
            }
        })
}