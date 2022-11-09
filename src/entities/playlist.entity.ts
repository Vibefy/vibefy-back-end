import Music from "./music.entity";
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from "typeorm";

@Entity("playlist")
class Playlist {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  name: string;

  @ManyToMany(() => Music, { eager: true })
  @JoinTable()
  music: Music[];

  @Column("date")
  created_At: Date;

  @Column("date")
  updated_At: Date;
}
export default Playlist;
