import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs';
import { JwtAuthService } from '../jwt-auth/jwt-auth.service';
import { RequestWithUser } from '../request-with-user.interface';
import { LocalAuthRegisterDto } from './dto/local-auth-register.dto';
import { LocalRegisterResponseDto } from './dto/local-register-response.dto';
import { LocalValidateUserResponseDto } from './dto/local-validate-user-response.dto';

@Injectable()
export class LocalAuthService {
  private readonly logger: Logger = new Logger(LocalAuthService.name);
  constructor(
    @Inject('USER_CLIENT')
    private readonly client: ClientProxy,
    private readonly jwtAuthService: JwtAuthService,
  ) { }

  async register(body: LocalAuthRegisterDto) {
    this.logger.debug(`display boydy ${JSON.stringify(body)}`);
    return this.client
      .send<LocalRegisterResponseDto, LocalAuthRegisterDto>('register', body)
      .pipe(timeout(5000))
      .toPromise();
  }

  async validateUser(username: string, password: string) {
    this.logger.debug('validateUser', username);
    const user = this.client
      .send<LocalValidateUserResponseDto, Record<string, string>>('validate', {
        username,
        password,
      })
      .pipe(timeout(5000))
      .toPromise();
    this.logger.debug(`display user ${JSON.stringify(user)}`);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
  isAuthenticated(command) {
    try {
      const res = this.jwtAuthService.verifyToken(command.jwt);
      this.logger.verbose(`isAuthenticated ${JSON.stringify(res)}`);
      return res;
    } catch (err) {
      return false;
    }
  }
  async login(user: RequestWithUser['user']) {
    this.logger.debug(`login ${JSON.stringify(user)}`);
    return await this.jwtAuthService.login({
      id: user.id,
      ...user,
    });
  }
}
