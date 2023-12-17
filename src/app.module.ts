import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { Post } from './post/entities/post.entity';
import { RoleModule } from './role/role.module';
import { Role } from './role/entities/role.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/entities/comment.entity';
import { UserRoleModule } from './user-role/user-role.module';
import { UserRole } from './user-role/entities/user-role.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '1qazXSW@',
      username: 'postgres',
      entities: [
        Post, 
        Role,
        User,
        Comment,
        UserRole
      ],
      database: 'forum',
      synchronize: true,
      logging: true,
    }),
    PostModule,
    RoleModule,
    UserModule,
    CommentModule,
    UserRoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
