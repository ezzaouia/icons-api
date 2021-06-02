import { Module, HttpModule } from '@nestjs/common';
import { IconsController } from './icons.controller';
import { IconsService } from './icons.service';

@Module({
  imports: [HttpModule],
  controllers: [IconsController],
  providers: [IconsService],
})
export class IconsModule {}
