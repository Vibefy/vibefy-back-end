import { classToPlain } from "class-transformer";
import { AppDataSource } from "../../../data-source";
import Artist from "../../../entities/artist.entity";
import Music from "../../../entities/music.entity";
import { AppError } from "../../../error/appError";
import { IMusicRequest } from "../../../interfaces/artist/music";

export const createArtistService = async ({ name, artist, gener, description, duration }: IMusicRequest) => {
    const musicRepository = AppDataSource.getRepository(Music);
    const musisExist = await musicRepository.findOne({
        where: {
            name: name!
        }
    });
    const artistRepository = await  AppDataSource.getRepository(Artist);
    const artists = await artistRepository.findOne({
        where: {
            name: artist!
        }
    });

    if(!artists){
        new AppError(400, "Not Find Artist")
    }
    if(!musisExist){
        new AppError(400, "music exist")
    }

    const music = new Music()
    music.artist = artists;
    music.name = name;
    music.artistName = artist
    music.description = description ? description : null
    music.duration = duration ? +duration : null
    music.genre = gener

  
    return classToPlain(music);
};
