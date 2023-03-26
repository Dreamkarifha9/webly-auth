import { OmitType } from '@nestjs/swagger';
import { LocalAuthRegisterDto } from './local-auth-register.dto';

export class LocalValidateUserResponseDto extends OmitType(
  LocalAuthRegisterDto,
  ['verifyPassword'],
) { }
