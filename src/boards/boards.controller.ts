import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
  //service dependency injection
  // before
  // boardService: boardService; // 먼저 프로퍼티 선언
  // constructor(private boardService: boardService) {
  //   this.boardService = boardService // 파라미터를 프로퍼티로 셋팅
  // }

  // after (한줄로 요약)
  // **접근 제한자(public, private, protected)를 생성자(constructor) 파라미터에 선언하면
  // 접근 제한자가 사용된 생성자 파라미터는 암묵적으로 클래스의 프로퍼티로 선언됨!
  constructor(private boardService: BoardsService) {}

  @Get('/') // 실제 경로는 '/boards'로 셋팅됨
  getAllBoard() {
    return this.boardService.getAllBoards();
  }

  @Post()
  @UsePipes(ValidationPipe) // ** Handler-Level PIPE
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardService.createBoard(createBoardDto);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    return this.boardService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoardById(@Param('id') id: string): void {
    return this.boardService.deleteBoardById(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: string,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Board {
    return this.boardService.updateBoardStatus(id, status);
  }
}
