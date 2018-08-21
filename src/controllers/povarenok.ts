import povarenok from './../models/povarenok';
import { Request, Response } from 'express';

export const getAllPovarenokCooks = async (req: Request, res: Response) => {
  try {
    const allCooks: any = await povarenok.find({}).exec();
    res.send(allCooks);
  } catch (err) {
    res.status(500).send(err);
  }
};