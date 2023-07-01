import {WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ScoresGateway implements OnGatewayConnection, OnGatewayDisconnect{
    private scoreInterval : NodeJS.Timer;

    handleConnection(client: Socket, ) {
        console.log('New Client Connected');

        if(!this.scoreInterval){
            this.scoreInterval = setInterval(()=>{
                const score = this.generateRandomScore();
                client.emit('Score Update', score);
            },5000);
        }
    }

    handleDisconnect(client: Socket) {
        console.log('Client Disconnected');
    }

    private generateRandomScore(): number {
        const scores = [-1,0,1,2,3,4,5,6];
        const randomIndex = Math.floor(Math.random()* scores.length);
        return scores[randomIndex];
    }
}