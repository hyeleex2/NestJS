import { Request, Response } from 'express';
declare const router: import("express-serve-static-core").Router;
export declare const readAllCat: (req: Request, res: Response) => void;
export declare const readCat: (req: Request, res: Response) => void;
export declare const createCat: (req: Request, res: Response) => void;
export declare const updateCat: (req: Request, res: Response) => void;
export declare const updatePartialCat: (req: Request, res: Response) => void;
export declare const deleteCat: (req: Request, res: Response) => void;
export default router;
