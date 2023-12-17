import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {

    @PrimaryGeneratedColumn({type: 'integer'})
    id: number;

    @Column({type: 'varchar', length: 50})
    title: string;

}
