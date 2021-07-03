import multer from 'fastify-multer';
import path from 'path';

interface IStorage {
  destination: 'images' | 'document';
}

export const fileType = (name: string) => path.extname(name);

export const extStorage = ({destination}: IStorage) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      let dest = '';

      switch (destination) {
        case 'images':
          dest = './public/images';
          break;
        case 'document':
          dest = './public/document';
          break;

        default:
          dest = `./public`;
          break;
      }

      cb(null, dest);
    },

    filename: (req: any, file, cb) => {
      let nameFile = `${destination}-${Date.now()}${fileType(
        file.originalname,
      )}`;

      cb(null, nameFile);
    },
  });
