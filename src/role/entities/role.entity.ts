import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {

    @PrimaryGeneratedColumn({type: 'integer'})
    id: number;

    @Column({type: 'varchar', length: 50})
    title: string;

    @ManyToOne(() => User, user => user.role)
    users: User[];

}
