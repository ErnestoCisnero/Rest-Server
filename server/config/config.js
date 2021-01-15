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
//DataBase
//*************************** */

let URL_DB;

if (process.env.NODE_ENV === 'dev') {
    URL_DB = 'mongodb://localhost:27017/cafe'; //Ruta a la BD local
} else {
    URL_DB = 'mongodb+srv://userMax:rBlYMM9TTTo7HMMH@cluster0.1y8xz.mongodb.net/cafe'; // Ruta a la BD remota en la nube

}

process.env.URLDB = URL_DB;