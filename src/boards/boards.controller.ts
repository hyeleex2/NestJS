import { Controller, Get } from '@nestjs/common';
import { BoardsService } from './boards.service';

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

  @Get('/')
  getAllBoard() {
    return this.boardService.getAllBoards();
  }
}
