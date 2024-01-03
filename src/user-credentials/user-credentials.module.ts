import { Module } from '@nestjs/common';
import { UserCredentialsService } from './user-credentials.service';
import { UserCredentials } from './entities/user-credentials.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserCredentials])],
  providers: [UserCredentialsService],
  exports: [UserCredentialsService],
})
export class UserCredentialsModule {}
