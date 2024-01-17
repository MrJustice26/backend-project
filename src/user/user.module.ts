import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import { ProfileModule } from 'src/profile/profile.module';
import { UserCredentialsModule } from 'src/user-credentials/user-credentials.module';

@Module({
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    ProfileModule,
    UserCredentialsModule,
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
