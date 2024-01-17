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

    if (!isPasswordValid) return null;

    userWithCredentials.credentials.password = undefined;

    return userWithCredentials;
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      sub: user.id,
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      user: user,
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  // TODO: Dokoncz refresh i te cookies
  async refresh(providenRefreshToken: string) {
    try {
      console.log(providenRefreshToken);
      const decoded = this.jwtService.verify(providenRefreshToken);
      const user = await this.userService.findOne(decoded.sub);

      const payload = {
        username: user.username,
        sub: user.id,
      };

      const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
      const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async getUserFromAccessToken(userJwt: { userId: number; username: string }) {
    try {
      const user = await this.userService.findOne(userJwt.userId);
      user.credentials.password = undefined;
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }
  }
}
