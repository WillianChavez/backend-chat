import { Global, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer'

@Global()
@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: diskStorage({
          destination: './uploads/',
          filename: (req, file, cb) => {
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
            return cb(null, `${randomName}${file.originalname}`)
          },
        }),
      }),
    }),
  ],
  exports: [MulterModule]
})
export class StorageModule { }
