import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server } from 'socket.io';

@Module({})
class SocketModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useWebSocketAdapter(new IoAdapter(app));

  const server = app.getHttpServer();
  const io = new Server(server);

  let scoreInterval: NodeJS.Timeout;

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });

    if (!scoreInterval) {
      scoreInterval = setInterval(() => {
        const score = generateRandomScore();
        socket.emit('scoreUpdate', score);
      }, 5000);
    }
  });

  await app.listen(3000);
}

bootstrap();
