export const serviceUrl = 'http://backend-service:3010/api/v1';
export const defaultImageUrl = '/assets/placeholder.jpg';
export const logoNoBg = '/assets/logo_no_bg.png'
export const s3_config = {
    bucketName: process.env.AWS_BUCKET_NAME ? process.env.AWS_BUCKET_NAME : '',
    bucketRegion: process.env.AWS_BUCKET_REGION,
    accessKey: process.env.AWS_ACCESS_KEY ? process.env.AWS_ACCESS_KEY : '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ? process.env.AWS_SECRET_ACCESS_KEY: '',
}

