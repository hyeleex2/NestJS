import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CustomRepository } from '../database/typeorm-ex.decorator';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCrendentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCrendentialDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    // type orm
    const user = this.create({ username, password: hashedPassword });
    try {
      // db insert
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(`${username} 중복`);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
