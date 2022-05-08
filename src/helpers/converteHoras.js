export default function converteHoras(dado) {
    const hora = dado / 60;
    let horaAjustada;
    const minutos = dado % 60;

    if(hora >= 1) {
        horaAjustada = hora.toString().substring(0, 2);
    } else {
        horaAjustada = hora.toString().substring(0, 1).padStart(2, 0);
    }

    return {
        hora: horaAjustada,
        minutos
    };
}