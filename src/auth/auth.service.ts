import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCrendentialDto: AuthCredentialDto): Promise<void> {
    return this.userRepository.createUser(authCrendentialDto);
  }

  async signIn(
    authCrendentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCrendentialDto;
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      // login 성공 후 유저 JWT 토큰(Scret + Payload) 생성 후 반환
      // 사용자 이름, 이메일 등을 더 넣을 수 있음. but 중요한 정보는 xx
      const payload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException(`login failed`);
    }
  }
}
