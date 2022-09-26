import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

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
        id,
      },
    });
    if (!found) {
      throw new NotFoundException(`can't find board with ${id}`);
    }
    return found;
  }

  async getAllBoards(user: User): Promise<Board[]> {
    // board 테이블에 query builder 생성
    const query = this.boardRepository.createQueryBuilder('board');
    query.where('board.userId = :userId', { userId: user.id });
    const boards = query.getMany();
    return boards;
    // return await this.boardRepository.find();
  }

  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  async deleteBoardById(id: number, user: User): Promise<void> {
    const result = await this.boardRepository.delete({ id, user });
    // db에 알맞은 데이터가 없는 경우
    if (result.affected === 0) {
      throw new NotFoundException(`${id} 게시물 없음`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    // status 변경
    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }
}
