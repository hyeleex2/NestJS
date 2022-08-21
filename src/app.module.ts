import { Module } from '@nestjs/common';
import { BoardsController } from './boards/boards.controller';
import { BoardsModule } from './boards/boards.module';

@Module({
  imports: [BoardsModule],
  controllers: [BoardsController],
})
export class AppModule {}
