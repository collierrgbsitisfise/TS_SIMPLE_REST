import gifPovar from './../models/gif-povar';
import { Request, Response } from 'express';

export const getAllGifPovarCooks = async (req: Request, res: Response) => {
  try {
    const allCooks: any = await gifPovar.find({}).exec();
    res.send(allCooks);
  } catch (err) {
    res.status(500).send(err);
  }
};