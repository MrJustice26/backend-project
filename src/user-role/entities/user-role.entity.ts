import { Column, PrimaryGeneratedColumn } from "typeorm";

export class UserRole {

    @PrimaryGeneratedColumn({type: 'integer'})
    id: number;

    @Column({type: 'integer'})
    userId: number;

    @Column({type: 'integer'})
    roleId: number;
}
