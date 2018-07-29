import { Request, Response } from 'express';
import * as url from 'url'; 
import Link from './../models/link';


export const createEasyLink = async (req: Request, res: Response) => {
    try {
      const {
        query,
      } = url.parse(req.url, true);
  
      const {
        link,
        privateOnly,
        onceAvailable,
      } = query;
      
      // check if this link was't saved in db already
      const findLink = await Link.findOne({
        link,
        privateOnly,
        onceAvailable,
      });
  
      if (findLink) {
        res.send(findLink);
        return;
      }
  
      const shortLink = new Link({
        link,
        privateOnly,
        onceAvailable,
      });
  
      const result = await shortLink.save();
      res.send(result);
    } catch (err) {
      res.status(500).send(err);
    }
  };