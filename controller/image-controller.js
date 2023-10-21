import grid from 'gridfs-stream'
import mongoose from 'mongoose';
import { response } from 'express';
import  dotenv from 'dotenv';

dotenv.config()


let gfs, gridFsBucket
const conn = mongoose.connection;
conn.once('open', () => {
    gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    })
    gfs = grid(conn.db, mongoose.mongo)
    gfs.collection('fs')
})


export const uploadFile = (request, response) => {
    try{
         if(!request.file){
            return response.status(404).json('File not found')
         }
         const imageUrl = `${process.env.BASE_URL}/file/${request.file.filename}`

         return response.status(200).json(imageUrl)
    }catch(error){

    }
}

export const getImage = async(request, response) => {
   try{
      const file = await gfs.files.findOne({ filename: request.params.filename})
      const readStream = gridFsBucket.openDownloadStream(file._id)
      readStream.pipe(response)
   }catch(error){
    return response.status(500).json(error.message)
   }
}