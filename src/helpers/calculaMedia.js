export default function calculaMedia(dado) {
    const totalTime = dado.reduce((previousValue, currentValue) => {
        return previousValue + currentValue
    }, 0);

    return totalTime / dado.length;
}