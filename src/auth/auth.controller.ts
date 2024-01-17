import {
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
// import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // TODO: Daj potem refresh token
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req, @Response() res) {
    const { user, tokens } = await this.authService.login(req.user);
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.json({
      user,
      tokens,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('logout')
  async logout(@Response() res) {
    res.clearCookie('refreshToken');
    res.json({
      message: 'Logged out successfully',
    });
  }

  @Get('refresh')
  async refresh(@Request() req, @Response() res) {
    const refreshToken = req.cookies['refreshToken'];
    const tokens = await this.authService.refresh(refreshToken);

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.json(tokens);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user-info-by-token')
  async getUserInfoByToken(@Request() req) {
    const user = await this.authService.getUserFromAccessToken(req.user);
    return user;
  }
}
