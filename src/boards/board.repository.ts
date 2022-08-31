import { Repository } from "typeorm";
import { Board } from "./board.entity";
import { CustomRepository } from "./database/typeorm-ex.decorator";

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {}
