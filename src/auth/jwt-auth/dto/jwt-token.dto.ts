import { ApiResponseProperty } from '@nestjs/swagger';

export class JwtTokenResponseDto {
  @ApiResponseProperty()
  token: string;
}
