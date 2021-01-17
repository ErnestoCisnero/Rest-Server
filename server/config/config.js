'use strict'

/* 
PORT
*/

process.env.PORT = process.env.PORT || 3000;


//**************************** */
//ENTORNO
//*************************** */

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//**************************** */
//Vencimiento del Token
//*************************** */
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//**************************** */
//Seed de autenticacion
//*************************** */
process.env.SEED = process.env.SEED || 'este-es-el-secreto-de-desarrollo';

//**************************** */
//DataBase
//*************************** */

let URL_DB;

if (process.env.NODE_ENV === 'dev') {
    URL_DB = 'mongodb://localhost:27017/cafe'; //Ruta a la BD local
} else {
    URL_DB = process.env.MONGO_URL; // Ruta a la BD remota en la nube

}

process.env.URLDB = URL_DB;