import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialDto: AuthCredentialDto): Promise<void> {
    console.log('authCredentialDto : ', authCredentialDto);
    return this.authService.signUp(authCredentialDto);
  }
}
