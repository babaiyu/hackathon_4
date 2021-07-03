import {FastifyRequest as Request, FastifyReply as Reply} from 'fastify';
import multer from 'fastify-multer';
import _ from 'lodash';
import errorHandler from '../helpers/errorHandler';
import response from '../helpers/response';
import {extStorage, fileType} from '../lib/storage';

// Upload Image
const uploadImage = async (req: Request<any>, reply: Reply) => {
  const upload = multer({
    storage: extStorage({destination: 'images'}),
    fileFilter: (req, file, cb) => {
      const type = fileType(file.originalname);

      switch (type) {
        case '.png':
          cb(null, true);
          break;
        case '.jpg':
          cb(null, true);
          break;
        case '.jpeg':
          cb(null, true);
          break;

        default:
          cb(null, false);
          break;
      }
    },
  }).single('file');

  upload(req, reply, (err) => {
    if (!err) {
      const filepath = _.result(req, 'file.path', 'null');
      const payload = {filename: filepath};

      reply.code(200).send(response(true, 'Success upload resume', payload));
    } else {
      console.log('Error===', err);
      errorHandler(415, reply);
    }
  });
};

export default {uploadImage};
