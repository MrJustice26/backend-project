import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment } from './entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  controllers: [CommentController],
  imports: [
    TypeOrmModule.forFeature([Comment, Post, User])
  ],
  providers: [CommentService],
})
export class CommentModule {}
