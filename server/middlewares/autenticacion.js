const jwt = require('jsonwebtoken');

//****************************** */
//Verificar Tokens
//***************************** */

let verificar_token = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: "Token no valido"
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    });
}

//****************************** */
//Verificar el Admin_Role
//***************************** */

let verificar_ADMIN_ROLE = (req, res, next) => {

    if (!(req.usuario.role === 'ADMIN_ROLE')) {

        return res.status(403).json({
            ok: false,
            err: {
                message: "No tiene permisos suficientes"
            }
        });
    }

    next();


}


module.exports = {
    verificar_token,
    verificar_ADMIN_ROLE
}