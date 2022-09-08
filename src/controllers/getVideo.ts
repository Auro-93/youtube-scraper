import express from "express";
// @ts-ignore
import { getVideoInfo } from "../services/automation/getVideoInfo.ts";


export const getVideo = async (req: express.Request, res: express.Response) => {
    const video = req.params.video;

    try {

      const data = await getVideoInfo(video)

      if(data.success){
        return res.status(200).json({videoInfo: data.result})
      }else{
        return res.status(400).json({error: data.error})
      }

        
    } catch (error) {

        return res.status(500).json({error: error})
        
    }
    
  
}