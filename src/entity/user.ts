import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Entity } from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn({ type: 'int8' })
  id!: string;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @Column()
  name!: string;
}
