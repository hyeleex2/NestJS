import { Request, Response} from 'express';
import { Cat } from './cats.model';
import { Router } from 'express';

const router = Router();

export const readAllCat = (req: Request, res: Response) => {
  try {
    const cats = Cat;
    res.status(200).send({
      success: true,
      data: {
        cats
      }
    });
  } catch (e) {
    res.status(400).send({
      success: false,
      error: e.message
    });
  }
}

export const readCat = (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const cat = Cat.find(cat => cat.id === id);
    res.status(200).send({
      success: true,
      data: {
        cat
      }
    });
  } catch (e) {
    res.status(400).send({
      success: false,
      error: e.message
    });
  }
}

// [CREATE] 새로운 고양이 추가
export const createCat = (req: Request, res: Response) => {
  try {
    const data = req.body;
    Cat.push(data);
    res.status(200).send({
      success: true,
      cats: Cat
    });
  } catch (e) {
    res.status(400).send({
      success: false,
      error: e.message
    });
  }
}

// [UPDATE] 고양이 데이터 업데이트 -> PUT
export const updateCat = (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = req.body;
    let cat = Cat.find(cat => cat.id === id);
    let result = null;
    if(cat) {
      cat = data;
      result = cat;
    }
    res.status(200).send({
      success: true,
      data: {
        result
      }
    });
  } catch (e) {
    res.status(400).send({
      success: false,
      error: e.message
    });
  }
}

// [UPDATE] 고양이 데이터 부분 업데이트 -> PATCH
export const updatePartialCat = (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = req.body;
    let cat = Cat.find(cat => cat.id === id);
    let result = null;
    if(cat) {
      cat = {...cat, ...data};
      result = cat;
    }
    res.status(200).send({
      success: true,
      data: {
        result
      }
    });
  } catch (e) {
    res.status(400).send({
      success: false,
      error: e.message
    });
  }
}

// [DELETE] 고양이 데이터 삭제 -> DELETE
export const deleteCat = (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const newCat = Cat.filter(cat => cat.id !== id);
    res.status(200).send({
      success: true,
      data: {
        newCat
      }
    });
  } catch(e) {
    res.status(400).send({
      success: false,
      error: e.message
    });
  }
}

export default router;