import { Module } from '@nestjs/common';
import { ScoresGateway } from './scores.gateway';

@Module({
  providers: [ScoresGateway],
})
export class ScoresModule {}
