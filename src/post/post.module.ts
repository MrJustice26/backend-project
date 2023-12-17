import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';

@Module({
  controllers: [PostController],
  imports: [
    TypeOrmModule.forFeature([Post, User]),
    UserModule
  ],
  providers: [PostService],
})
export class PostModule {}
