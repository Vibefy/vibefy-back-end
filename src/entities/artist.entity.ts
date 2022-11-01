import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Music from "./music.entity";

@Entity("artist")
class Artist
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
    password : string

    @Column("varchar",{default : true})
    isActive : boolean

    @OneToMany(()=> Music,(music)=> music.artist)
    @JoinColumn()
    music : Music[]

    @Column("date",{default : new Date()})
    created_At : Date

    @Column("date",{default : new Date()})
    updated_At : Date
}
export default Artist