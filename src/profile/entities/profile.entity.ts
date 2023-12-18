import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn({type: "integer"})
    id: number;

    @Column({type: "varchar", length: '100', nullable: true })
    fullName: string;

    @Column({type: "varchar", length: '15', nullable: true })
    phoneNumberWithCountryCode: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    street: string;

    @Column({ type: 'integer', nullable: true })
    houseNumber: number;

    @Column({ type: 'integer', nullable: true })
    apartmentNumber: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    city: string;

    @Column({ type: 'varchar', length: 10, nullable: true })
    postalCode: string;
}
