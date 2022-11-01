import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn,OneToMany} from "typeorm";
import Music from "./music.entity";
import PlaylistsMusics from "./playlists_musics.entity";
import PlaylistsUsers from "./playlists_users.entity";
import User from "./user.entity";

@Entity("playlist")
class Playlist
{
    @PrimaryGeneratedColumn("uuid")
    id : string

    @Column("varchar")
    name : string

    @Column("varchar")
    link_playlist : string

    @OneToMany(()=> PlaylistsMusics,(playlists_musics)=> playlists_musics.music)
    music : Music[]

    @OneToMany(()=> PlaylistsUsers,(PlaylistsUsers)=> PlaylistsUsers.user)
    user : User[]

    @Column("date",{default : new Date()})
    created_At : Date

    @Column("date",{default : new Date()})
    updated_At : Date
}
export default Playlist