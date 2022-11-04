import { Exclude } from "class-transformer";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Music from "./music.entity";
import Payment from "./payment_user.entity";
import Playlist from "./playlist.entity";
import PlaylistsUsers from "./playlists_users.entity";

@Entity("user")
class User
{
    @PrimaryGeneratedColumn("uuid")
    id : string

    @Column("varchar")
    name : string

    @Column("varchar",{unique : true})
    email : string

    @Column("varchar",{default : "https://www.lance.com.br/files/article_main/uploads/2022/04/29/626c07807ccfa.jpeg"})
    avatar_img : string

    @Column("varchar")
    @Exclude()
    password: string;
  
    @Column("boolean",{default : true})
    isActive : boolean

    @OneToOne(()=> Payment,{eager : true,nullable : true})
    @JoinColumn()
    payment : Payment

    @OneToMany(()=> PlaylistsUsers,(PlaylistsUsers)=> PlaylistsUsers.playlist)
    playlist : Playlist[]

    @Column("timestamp",{default : new Date()})
    created_At : Date

    @Column("timestamp",{default : new Date()})
    updated_At : Date
}
export default User