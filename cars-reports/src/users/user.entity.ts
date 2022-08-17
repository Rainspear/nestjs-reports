// import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
} from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  // @Exclude()
  @Column()
  password: string;

  @AfterInsert()
  logWhenInserted() {
    console.log("insert", this.id);
  }

  @AfterUpdate()
  logWhenUpdated() {
    console.log("update", this.id)
  }

  @AfterRemove()
  logWhenRemove() {
    console.log("deleted", this.id)
  }
}