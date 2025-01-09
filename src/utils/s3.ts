'use server'
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { s3_config } from "../config";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const {bucketName, bucketRegion, accessKey, secretAccessKey} = s3_config


const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
    region: bucketRegion,
});


export async function UploadFileToS3 (
    imageId: string,
    file: File
    ) {
    // console.log('RUNNING THE SERVER SIDE UPLOAD FUNC');
    // console.log(imageId);
    
    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer)

    const params = {
        Bucket: bucketName,
        Key: imageId,
        Body: buffer, //figure out how tf to send files through a function lol...
        ContentType: file.type
    }

    const command = new PutObjectCommand(params);
    // console.log('create command is success');
    await s3.send(command);

    // console.log('send command is success');

};

export async function DeleteFileFromS3 (
    imageId: string,
) {
    const params = {
        Bucket: bucketName,
        Key: imageId,
    }
    const command = new DeleteObjectCommand(params)
    
    try {
        await s3.send(command);
        // console.log('delete command is success');
    } catch (error: any) {
        throw new Error(error);
    }

};

export async function getFileFromS3 (
    imageId: string,
) {
    const params = {
        Bucket: bucketName,
        Key: imageId,
    }
    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3, command);

    return url
};
