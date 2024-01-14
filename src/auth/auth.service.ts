import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from 'src/helpers/password';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, plainPassword: string): Promise<User> {
    const userWithCredentials = await this.userService.getUserWithCredentialsBy(
      {
        username,
      },
    );
    if (!userWithCredentials) {
      return null;
    }

    const isPasswordValid = await comparePasswords(
      plainPassword,
      userWithCredentials.credentials.password,
    );

    userWithCredentials.credentials.password = undefined;

    if (!isPasswordValid) return null;
    return userWithCredentials;
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      sub: user.id,
    };

    const access_token = this.jwtService.sign(payload, { expiresIn: '1h' });
    // const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      access_token,
      // refresh_token,
    };
  }

  // TODO: Dokoncz refresh i te cookies
  // async refresh(token: string) {
  //   try {
  //     const decoded = this.jwtService.verify(token);
  //     const user = await this.userService.findOne(decoded.sub);

  //     const payload = {
  //       username: user.username,
  //       sub: user.id,
  //     };

  //     const access_token = this.jwtService.sign(payload, { expiresIn: '1h' });

  //     return {
  //       access_token,
  //     };
  //   } catch (error) {
  //     throw new UnauthorizedException('Invalid refresh token');
  //   }
  // }
}
