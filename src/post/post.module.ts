import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [PostController],
  imports: [
    TypeOrmModule.forFeature([Post]),
    UserModule
  ],
  providers: [PostService],
})
export class PostModule {}
