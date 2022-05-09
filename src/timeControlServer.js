import { WebSocket, WebSocketServer } from 'ws';
import calculaTempo from "./helpers/calculaTempo.js";
import calculaMedia from "./helpers/calculaMedia.js";
import converteHoras from "./helpers/converteHoras.js";

const wss = new WebSocketServer( {
    host: "localhost",
    port: 8080
});

const relogio01 = new WebSocket("ws://localhost:8081");
const relogio02 = new WebSocket("ws://localhost:8082");
const relogio03 = new WebSocket("ws://localhost:8083");
const relogio04 = new WebSocket("ws://localhost:8084");
const relogio05 = new WebSocket("ws://localhost:8085");

const serverList = [relogio01, relogio02, relogio03, relogio04, relogio05];

let hora = new Date(2022, 5, 8, 15, 20);


wss.on("listening", () => {
    main();
});

wss.on("connection", ws => {
    ws.send(hora.toString());
})

function main() {
    console.info("Server 01 rodando!\n");
    console.log(`Horário inicial: ${hora}\n`);

    serverList[0].on("open", () => {
        const dateArray = [hora];
        const timeArray = [];

        serverList.forEach((server) => {
            server.addEventListener("message", message => {
                const data = message.data;
                dateArray.push(data);
            })
        })

        setTimeout(() => {
            dateArray.forEach(dateString => {
                const time = calculaTempo(dateString);
                timeArray.push(time);
            });

            const media = calculaMedia(timeArray);

            const horas = converteHoras(media);

            serverList.forEach(server => {
                server.send(`${horas.hora}:${horas.minutos}`);
            })

            hora.setHours(Number(horas.hora), Number(horas.minutos));
            console.log(`Horário final: ${hora}\n`);

        }, 1000)

    })

}