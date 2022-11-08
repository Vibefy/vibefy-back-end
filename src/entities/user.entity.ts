import { Exclude } from "class-transformer";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Payment from "./payment_user.entity";
import Playlist from "./playlist.entity";

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

    @ManyToMany(()=> Playlist,{eager : true})
    @JoinTable()
    playlist : Playlist[]

    @Column("date")
    created_At : Date

    @Column("date")
    updated_At : Date
}
export default User