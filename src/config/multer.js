import multer from 'multer'; // multipart/form-data
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    // salvar no disco no path...
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    // nome do arquivo salvo, será um randow crypt de 16 bytes concatenado com a extensão dod arquivo (jpg, png..)
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
