import { Comment } from 'src/comment/entities/comment.entity';
import { Post } from 'src/post/entities/post.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { Role } from 'src/role/entities/role.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'text', nullable: true })
  avatarUrl: string;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  updatedAt: string;

  @OneToMany(() => Post, (post) => post.creator)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.creator)
  comments: Comment[];

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToOne(() => Profile, { eager: true })
  @JoinColumn()
  profile: Profile;

  @ManyToMany(() => Post, (post) => post.likedBy)
  @JoinTable()
  likedPosts: Post[];
}
