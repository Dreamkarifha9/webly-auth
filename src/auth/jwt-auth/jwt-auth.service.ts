import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import * as _ from 'lodash';
import { JwtTokenResponseDto } from './dto/jwt-token.dto';

export interface feature {
  name: string;
  description: string;
}
export interface Permission {
  featureId: number;
  feature: feature;
}
export interface Role {
  name: string;
  permissions: Permission[];
}
@Injectable()
export class JwtAuthService {
  private readonly logger: Logger = new Logger(JwtAuthService.name);
  constructor(private readonly jwtService: JwtService) { }

  verifyToken(token: string) {
    return this.jwtService.verify(token);
  }

  async login(user: {
    username: string;
    id: string;
    tempPassword: string;
  }): Promise<JwtTokenResponseDto> {
    if (!user) {
      throw new UnauthorizedException();
    }
    this.logger.debug(`tesmpPassword display :: >>> ${user.tempPassword}`);
    const payload: JwtPayloadDto = {
      username: user.username,
      id: user.id,
      tempPassword: user.tempPassword,
    };
    this.logger.debug(`payload ${JSON.stringify(payload)}`);
    const token = this.jwtService.sign(payload);

    return { token };
  }
}
