// src/common/file-filters/image-all-mime.filter.ts
import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';

export const allowedImageMimeTypes: string[] = [
  'image/jpeg',
  'image/pjpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/bmp',
  'image/x-ms-bmp',
  'image/svg+xml',
  'image/tiff',
  'image/x-tiff',
  'image/heic',
  'image/heif',
  'image/vnd.microsoft.icon',
  'image/x-icon',
  'image/avif',
  'image/apng',
];

export const imageFileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!allowedImageMimeTypes.includes(file.mimetype)) {
    return callback(new BadRequestException('Just image Accepted'), false);
  }
  callback(null, true);
};
