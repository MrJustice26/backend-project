import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Comment } from 'src/comment/entities/comment.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  body: string;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  updatedAt: string;

  @ManyToOne(() => User, (user) => user.posts)
  creator: number;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @ManyToMany(() => User, (user) => user.likedPosts)
  @JoinTable()
  likedBy: User[];

  @Column({ type: 'integer', default: 0 })
  readingTime: number;
}
