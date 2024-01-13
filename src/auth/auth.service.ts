import { Injectable } from '@nestjs/common';
import { comparePasswords } from 'src/helpers/password';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, plainPassword: string): Promise<User> {
    const userWithCredentials = await this.userService.getUserWithCredentialsBy(
      {
        credentials: {
          email: email,
        },
      },
    );
    if (!userWithCredentials) {
      return null;
    }

    const isPasswordValid = await comparePasswords(
      plainPassword,
      userWithCredentials.credentials.password,
    );

    if (!isPasswordValid) return null;
    return userWithCredentials;
  }
}
