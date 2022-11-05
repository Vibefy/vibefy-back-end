import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Playlist from "./playlist.entity";
import User from "./user.entity";

@Entity("playlists_users")

class PlaylistsUsers
{
    @PrimaryGeneratedColumn("uuid")
    id : string

    @Column("int")
    users_count : number

    @ManyToOne(()=> User)
    user : User[]

    @ManyToOne(()=> Playlist)
    playlist: Playlist[]

    @Column("date")
    created_At : Date

}
export default PlaylistsUsers