import { Injectable, Logger } from '@nestjs/common';
import { Request } from 'express';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { LocalAuthService } from './local-auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger: Logger = new Logger(LocalStrategy.name);
  constructor(private readonly localAuthService: LocalAuthService) {
    super({ usernameField: 'username', passReqToCallback: true });
  }

  async validate(request: Request, username: string, password: string) {
    this.logger.debug(`Validating user username ${username}}`);
    this.logger.debug(`Validating user password ${password}}`);

    return await this.localAuthService.validateUser(username, password);
  }
}
