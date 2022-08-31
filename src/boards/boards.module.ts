import { Module } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmExModule } from '../database/typeorm-ex.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([BoardRepository])],
  // imports: [TypeOrmModule.forFeature([BoardRepository])],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
