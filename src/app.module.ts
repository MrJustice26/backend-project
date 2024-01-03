import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { UserCredentialsModule } from './user-credentials/user-credentials.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
    AuthModule,
    UserCredentialsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
