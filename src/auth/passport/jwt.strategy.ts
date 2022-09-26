import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../user.entity';
import { UserRepository } from '../user.repository';

// 어디에서나 jwt strategy를 사용하기 위해 injectable 데코레이터 이용
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    // super : 부모 class의 것을 사용
    super({
      // 토큰의 유효성 확인을 위해 secret key 넣기
      secretOrKey: 'SuperSecret',
      // 어디서 JWT 토큰을 가져오는 지 명시
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // 토큰이 유효한지 확인이 되면, 유저 확인
  // payload : 토큰의 payload
  async validate(payload): Promise<User> {
    const { username } = payload;
    const user: User = await this.userRepository.findOne({
      where: { username },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
