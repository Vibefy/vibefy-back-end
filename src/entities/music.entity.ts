import { Exclude } from "class-transformer";
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Artist from "./artist.entity";
import Playlist from "./playlist.entity";

@Entity("music")
class Music {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  name: string;

  @Column("varchar")
  artistName: string;

  @Column("varchar")
  genre: string;

  @Column("varchar", { nullable: true })
  description: string;

  @Column("float", { nullable: true })
  @Exclude()
  duration: number;

  @Column("varchar", { nullable: true })
  music_url: string;

  @Column("varchar", { nullable: true })
  image_url: string;

  @ManyToOne(() => Artist, (artist) => artist.music)
  @Exclude()
  artist: Artist;

  @ManyToMany(() => Playlist)
  playlist: Playlist[];

  @Column("date")
  created_At: Date;

  @Column("date")
  updated_At: Date;
}
export default Music;
