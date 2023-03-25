import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { JwtTokenResponseDto } from './jwt-auth/dto/jwt-token.dto';
import { LocalAuthRegisterDto } from './local-auth/dto/local-auth-register.dto';
import { LocalLoginDto } from './local-auth/dto/local-login.dto';
import { LocalAuthGuard } from './local-auth/local-auth.guard';
import { LocalAuthService } from './local-auth/local-auth.service';
import { RequestWithUser } from './request-with-user.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly localAuthService: LocalAuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiCreatedResponse({
    type: JwtTokenResponseDto,
    description: 'user successfully',
  })
  async login(
    @Body() body: LocalLoginDto,
    @Req() request: RequestWithUser,
  ): Promise<JwtTokenResponseDto> {
    const { user } = request || {};
    return this.localAuthService.login(user);
  }

  @Post('register')
  @ApiCreatedResponse({
    type: LocalAuthRegisterDto,
    description: 'Created user successfully',
  })
  register(@Body() body: LocalAuthRegisterDto) {
    return this.localAuthService.register(body);
  }

  @MessagePattern('isAuthenticated')
  async isAuthenticated(command: Record<string, string>) {
    return this.localAuthService.isAuthenticated(command);
  }
}
