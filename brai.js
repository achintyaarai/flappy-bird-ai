const brain = require("brain.js");
const network = new brain.NeuralNetwork();
network.train([
    {input:[373,-60,165],output:[1]},
    {input:[120,25,125],output:[1]},
    {input:[20,120,20],output:[0]},
    {input:[5,90,55],output:[0]},
    {input:[60,-20,145],output:[1]},
    {input:[60,1000,-1000],output:[0]},]);

const result = network.run([20,-80,80]);
console.log(result);