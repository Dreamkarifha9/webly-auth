import { forwardRef, Module } from '@nestjs/common';
import { LocalAuthService } from './local-auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtAuthModule } from '../jwt-auth/jwt-auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_CLIENT',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 8082,
        },
      },
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    forwardRef(() => JwtAuthModule),
  ],
  controllers: [],
  providers: [LocalAuthService, LocalStrategy],
  exports: [LocalAuthService, LocalStrategy],
})
export class LocalAuthModule { }
