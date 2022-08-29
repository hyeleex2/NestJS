import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {

  // service에 repository 주입
  // InjectRepository 데코레이터 이용
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({
      where: {
        id
      }
    });
    if (!found) {
      throw new NotFoundException(`can't find board with ${id}`);
    }
    return found;
  }

  // getAllBoards(): Board[] {
  //   return this.boards;
  // }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;
    console.log(title)
    console.log(description)
    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    })
    await this.boardRepository.save(board)
    return board
  }

  async deleteBoardById(id: number): Promise<void> {
    const found = this.getBoardById(id);
    await this.boardRepository.delete(id);
  }

  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}
