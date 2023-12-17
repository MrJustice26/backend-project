import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn({type: 'integer'})
    id: number;

    @Column({type: 'varchar', length: 50})
    username: string;

    @Column({type: 'varchar', length: 255})
    password: string;

    @Column({type: 'text', nullable: true})
    avatarUrl: string;

    @Column({type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: string;

    @Column({type: 'timestamp with time zone', nullable: true})
    updatedAt: string;

}
