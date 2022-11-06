import * as express from 'express';
import catsRouter from './cats/cats.route'

const app: express.Express = express();

const port: number = 8000;

// express 싱글톤 패턴
class Server {
  public app: express.Application;

  constructor() {
    const app: express.Application = express();
    this.app = app;
    
  }
  private setRoute() {
    this.app.use(catsRouter);
  }

  private setMiddleware() {
    // middleware 작성
    this.app.use((req, res, next) => {
      console.log('logging middleware');
      console.log(req.rawHeaders[1]);
      // 다음 라우터 실행
      next();
    });

    // json middleware
    this.app.use(express.json());

    this.setRoute();

    // error middelware
    this.app.use((req, res) => {
      console.log('error middleware');
      res.send({ error: '404 not found'})
    });
  }

  public listen() {
    this.setMiddleware();
    this.app.listen(port, () => {
      console.log(`server is on ... ${port}`)
    });
  }
}

function init() {
  const server = new Server()
  server.listen();
}

init();
