import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("payment_user")
class Payment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  name: string;

  @Column({ type: "numeric", precision: 16 })
  card_number: number;

  @Column("date")
  due_date: Date;

  @Column({ type: "numeric", precision: 16 })
  card_cv: number;
}
export default Payment;
