import { Request, Response } from 'express';
import Proxy from './../models/proxy';

export const getAllProxy = async (req: Request, res: Response) => {
  try {
    const allProxies: any = await Proxy.find({}).exec();
    res.send(allProxies);
  } catch (err) {
    res.status(500).send(err);
  }
};