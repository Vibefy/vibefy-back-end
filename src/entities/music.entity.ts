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

  @Column("date")
  created_At : Date

  @Column("date")
  updated_At : Date
  @OneToMany(
    () => PlaylistsMusics,
    (playlists_musics) => playlists_musics.playlist
  )
  playlist: Playlist[];


}
export default Music;
