import { WebSocketServer } from "ws";

const wss = new WebSocketServer({
    port: 8082
})

let horario = new Date(2022, 5, 8, 15, 50);

wss.on("listening", () => {
    console.log("Relogio 02 rodando!\n");
    console.log(`Horário inicial: ${horario}\n`)
})

wss.on("connection", ws => {
    ws.send(horario.toString());

    ws.addEventListener("message", message => {
        const date = message.data;

        const [ hora, minutos ] = date.split(":");

        horario.setHours(hora);
        horario.setMinutes(minutos);
        
        console.log(`Horário final: ${horario}\n`);

    })
})