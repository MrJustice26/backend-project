import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {

    @PrimaryGeneratedColumn({type: 'integer'})
    id: number;

    @Column({type: 'varchar', length: 255})
    title: string;

    @Column({type: 'text'})
    body: string;

    @Column({type: 'integer'})
    creator: number;

    @Column({type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: string;

    @Column({type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: string;

}
