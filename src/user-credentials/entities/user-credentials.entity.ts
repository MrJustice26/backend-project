import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserCredentials {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'varchar', length: '100' })
  email: string;

  @Column({ type: 'varchar', length: '255' })
  password: string;
}
