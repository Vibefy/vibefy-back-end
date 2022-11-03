import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Artist from "./artist.entity";
import Playlist from "./playlist.entity";
import PlaylistsMusics from "./playlists_musics.entity";

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

  @Column("varchar")
  description: string;

  @Column("float")
  duration: number;

  @ManyToOne(() => Artist, (artist) => artist.music)
  artist: Artist;

  @OneToMany(
    () => PlaylistsMusics,
    (playlists_musics) => playlists_musics.playlist
  )
  playlist: Playlist[];

  @Column("date", { default: new Date() })
  created_At: Date;

  @Column("date", { default: new Date() })
  updated_At: Date;
}
export default Music;
