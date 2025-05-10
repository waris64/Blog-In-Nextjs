import { NextResponse } from "next/server";
import {writeFile} from 'fs/promises';
export const POST = async (request) =>{
   const data = await request.FormData();
   const file = data.get('file');
   if(!file) return NextResponse.json({message:"File not found ! "});
   const bufferData = await file.arrayBuffer();
   const buffer = Buffer.from(bufferData);
   const path = `./public/uploads/${file.name}`;
try{
    await writeFile(path,buffer);
    return 
    NextResponse.json({
        message:"uploaded",
        fileName:file.name,
        success: true
    })
}catch(err){
    console.log(err);
    return 
    NextResponse.json({
        message:"Error",
        error:err.message,
         success: false})

}
}