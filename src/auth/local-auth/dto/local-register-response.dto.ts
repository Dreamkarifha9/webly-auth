import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class LocalRegisterResponseDto {
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}
