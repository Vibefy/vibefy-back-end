import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn,OneToMany, JoinColumn, JoinTable} from "typeorm";
import Music from "./music.entity";
import User from "./user.entity";

@Entity("playlist")
class Playlist
{
    @PrimaryGeneratedColumn("uuid")
    id : string

    @Column("varchar")
    name : string

    @ManyToMany(()=> Music,{eager : true})
    @JoinTable()
    music : Music[]

    @Column("date")
    created_At : Date

    @Column("date")
    updated_At : Date
}
export default Playlist