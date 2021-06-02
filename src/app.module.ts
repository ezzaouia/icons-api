import { Module } from '@nestjs/common';
import { IconsModule } from './icons/icons.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['./icons/*'],
      serveStaticOptions: {
        cacheControl: true,
      },
    }),
    IconsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
