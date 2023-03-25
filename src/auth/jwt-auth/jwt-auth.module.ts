import { forwardRef, Module } from '@nestjs/common';
import { JwtAuthService } from './jwt-auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthStrategy } from './jwt-auth.strategy';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [JwtAuthService, JwtAuthStrategy, ConfigService],
  exports: [JwtAuthService, JwtAuthStrategy, ConfigService],
})
export class JwtAuthModule { }
