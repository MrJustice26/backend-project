import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';
import { CommentModule } from 'src/comment/comment.module';
import { Comment } from 'src/comment/entities/comment.entity';

@Module({
  controllers: [PostController],
  imports: [
    TypeOrmModule.forFeature([Post, User, Comment]),
    UserModule,
    CommentModule,
  ],
  providers: [PostService],
})
export class PostModule {}
