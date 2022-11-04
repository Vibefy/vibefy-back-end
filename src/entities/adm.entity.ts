import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("adm")
class Adm {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  name: string;

  @Column("varchar", { unique: true })
  email: string;

  @Column("varchar", {
    default:
      "https://www.lance.com.br/files/article_main/uploads/2022/04/29/626c07807ccfa.jpeg",
  })
  avatar_img: string;

  @Column("varchar")
  @Exclude()
  password: string;
}
export default Adm;
