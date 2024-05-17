function CountFunction() {
    let n1 = parseFloat(document.getElementById("n1").value);
    let n2 = parseFloat(document.getElementById("n2").value);
    let n3 = parseFloat(document.getElementById("n3").value);
    let R = parseFloat(document.getElementById("R").value);
    let lambda = parseFloat(document.getElementById("lambda").value * Math.pow(10, -9));

    let messageElement = document.getElementById("message");
    if (R == 0 || lambda == 0){
        messageElement.textContent = "Ошибка: нулевое значение";

        return false;
    }

    let x = [];
    let I = [];

    let R12 = ((n2 - n1)/(n1 + n2))**2;
    let R23 = ((n3 - n2)/(n2 + n3))**2;
    let T12 = 4*n1*n2/(n1 + n2)**2;
    
    console.log(R12, R23, T12)
    
    let I1 = R12
    let I2 = T12**2*R23;
    
    let flag = 0;
    if (n2 < n3){
        flag = 1;
    }
    
    for (let i = 0; i < 2*(R*lambda/n2)**0.5; i+=0.000001) {
        x.push(i);
        let d = R - (R**2 - i**2)**0.5;
        let Delta = 2*d*n2 + flag*lambda/2;
        let delta = 2*Math.PI * Delta/lambda;
        if (i == 0){
            console.log(I1 + I2 + 2*(I1 * I2)**0.5 * Math.cos(delta))
        }
        I.push(I1 + I2 + 2*(I1 * I2)**0.5 * Math.cos(delta));
    }


    let layout = {
        title: 'Зависимость I(r)',
        xaxis: {
            title: 'радиус, м'
        },
        yaxis: {
            title: 'Интенсивность, Вт/м^2'
        },

    };
    Plotly.newPlot(
        "myDiv",
        [{
            mode: 'lines',
            type: 'scatter',
            x: x,
            y: I,
        }],
        layout
    );

    return false;
}
