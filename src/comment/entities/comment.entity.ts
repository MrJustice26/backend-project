import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {

    @PrimaryGeneratedColumn({type: 'integer'})
    id: number;

    @Column({type: 'text'})
    body: string;

    @Column({type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: string;

    @Column({type: 'timestamp with time zone', nullable: true})
    updatedAt: string;

    @ManyToOne(() => User, user => user.comments)
    creator: number;

    @ManyToOne(() => Post, post => post.comments)
    post: number;
}
