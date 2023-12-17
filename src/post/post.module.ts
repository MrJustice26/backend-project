import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';

@Module({
  controllers: [PostController],
  imports: [
    TypeOrmModule.forFeature([Post])
  ],
  providers: [PostService],
})
export class PostModule {}
