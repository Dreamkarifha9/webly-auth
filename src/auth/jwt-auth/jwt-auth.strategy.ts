import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger: Logger = new Logger(JwtAuthStrategy.name);
  constructor(configService: ConfigService) {
    const extractJwtFromCookie = (req) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies['jwt'];
      }
      return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    };

    super({
      jwtFromRequest: extractJwtFromCookie,
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  extractJwtFromCookie(req) {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies['jwt'];
    }
    return token;
  }

  async validate(payload: JwtPayloadDto) {
    this.logger.debug(`validate-JWT :: >> ${JSON.stringify(payload)}`);
    const user = await this.authUsersService.findOneById(payload.id);
    if (!user) return false;
    this.logger.debug(`user display :: >> ${JSON.stringify(user)}`);
    const isComparePassword = payload.tempPassword !== user['tempPassword'];
    const isInactive = user.active;
    if (isComparePassword || !isInactive) return false;
    return { id: payload.id, username: payload.username };
  }
}
