function getNameFromCommandLine() {
    // Write you code here, name should be taken as args in process.argv
    const name = process.argv[2];
    return name
}

function getNameFromEnv() {
    // Write your code here
    const name = process.env.name;
    return name
}

function getNameFromReadLine() {
    // Write your code here
    const readLine = require('readline');
    const element = readLine.createInterface({input: process.stdin, output: process.stdout});

    element.question('Give your Name:',(userInput)=>{
        console.log(userInput);
    });

}


module.exports = {
    getNameFromCommandLine,
    getNameFromEnv,
    getNameFromReadLine
}