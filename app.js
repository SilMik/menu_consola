require('colors');

const { guardarDB, leerDB } = require('./helper/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar,confirmar, mostrarListadoChecklist } = require('./helper/inquirer');
const Tareas = require('./models/tareas')

console.clear();

const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if(tareasDB) { //cargar tareas
        tareas.cargarTareasFromArray(tareasDB);
    }
    do {
        // imprimir el menú 
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
            break;

            case '2':
                tareas.listadoCompleto();
            break;

            case '3':
                tareas.listaPendientesCompletadas(true);
            break;

            case '4':
                tareas.listaPendientesCompletadas(false);
            break;
            case '5': //completado o pendiente
                const ids = await mostrarListadoChecklist( tareas.listadoArr);
                tareas.toggleCompletadas( ids );
            break;

            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr);
                const ok = await confirmar('¿Estás seguro');
                if( ok ){
                    tareas.borrarTarea( id );
                    console.log('Tarea borrada');
                }
                
            break;

            
        
        }

        guardarDB( tareas.listadoArr );


        await pausa();

    } while( opt !== '0');

}

main();