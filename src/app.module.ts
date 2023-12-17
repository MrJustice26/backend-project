import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '1qazXSW@',
      username: 'postgres',
      database: 'forum',
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    }),
    PostModule,
    RoleModule,
    UserModule,
    CommentModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
