import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Board } from "../board.entity";

// type orm 설정
export const typeORMConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "board-app",
  // entities: [join(__dirname, '/**/*.entity.ts')],
  entities: [__dirname + "../**/*.entity.ts"],
  // entities: [`${__dirname}/../**/*.entity.{js,ts}`, Board],
  synchronize: true,
};
