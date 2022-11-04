import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Music from "./music.entity";
import Playlist from "./playlist.entity";

@Entity("playlists_musics")
class PlaylistsMusics
{
    @PrimaryGeneratedColumn("uuid")
    id : string

    @Column("int")
    music_count : number

    @Column("timestamp")
    created_At : Date

    @ManyToOne(()=> Playlist)
    playlist : Playlist[]
    
    @ManyToOne(()=> Music)
    music : Music[]

}
export default PlaylistsMusics