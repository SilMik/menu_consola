const { Resolver } = require('dns');
const { read } = require('fs');

require('colors');


const mostrarMenu = () => {
  
    return new Promise((resolve => {
        
        console.clear();
        console.log('=========================='.green);
        console.log('   Selecciona una opción'.green)
        console.log('==========================\n'.green)
    
        console.log(`${'1.'.green} Crear tarea`);
        console.log(`${'2.'.green} Listar tarea`);
        console.log(`${'3.'.green} Listar tarea completada`);
        console.log(`${'4.'.green} Listar tarea pendiente`);
        console.log(`${'5.'.green} Cmmpletar Tarea(s)`);
        console.log(`${'6.'.green} Borrar Tarea`);
        console.log(`${'0.'.green} Salir\n`);
        
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readLine.question('Seleccione una opción: ', (opt) =>{
            readLine.close();
            resolve(opt);
        })
        
    }))

}


const pausa = () => {
    return new Promise(resolve => {
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readLine.question(`\nPresione ${'ENTER'.green} para continuar\n` , (opt) =>{
            
            readLine.close();
            resolve();
        })
    });
}
    
module.exports = {
    mostrarMenu,
    pausa
}