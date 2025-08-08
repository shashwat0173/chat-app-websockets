import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let allSockets: WebSocket[] = [];

wss.on("connection", (socket) => {
  allSockets.push(socket);

  socket.on("message", (message) => {
    console.log("message received " + message.toString());
    allSockets.forEach((socket) => {
      socket.send(message.toString());
    });
  });

  socket.on("disconnect", () => {
    allSockets = allSockets.filter(x => x != socket);
  })
});
