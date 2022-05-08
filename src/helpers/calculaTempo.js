export default function calculaTempo(dado) {
    const date = new Date(dado);

    const horas = date.getHours();
    const minutos = date.getMinutes();

    const tempoTotal = horas * 60 + minutos;

    return tempoTotal;
}