import { Module } from '@nestjs/common';
import { ScoresModule } from './modules/scores/scores.module';
import { SocketModule } from '@nestjs/platform-socket.io';

@Module({
  imports: [ScoresModule, SocketModule],
})
export class AppModule {}
