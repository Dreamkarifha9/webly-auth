import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtAuthModule } from './jwt-auth/jwt-auth.module';
import { LocalAuthModule } from './local-auth/local-auth.module';

@Module({
  controllers: [AuthController],
  providers: [],
  imports: [LocalAuthModule, JwtAuthModule],
})
export class AuthModule { }
