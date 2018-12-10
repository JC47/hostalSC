const jwt = require('jsonwebtoken');

// ==================
// Verificar token
// ==================

let verificaToken = (req,res,next) => {
  let token = req.get('Authorization');

  jwt.verify (token, process.env.SEED, (err, decoded) => {
    if(err){
      return res.status(401).json({
        ok:false,
        err
      });
    }
    if (decoded.usuario != undefined){
      req.usuario = decoded.usuario;
    }
    else if (decoded.admin != undefined){
      req.admin = decoded.admin;
    }
    else{
      return res.status(401).json({
        ok: false,
        err
      });
    }

    next();
  });
};

// ==================
// Verificar token  admin
// ==================

let verificaTokenAdmin = (req,res,next) => {
  let admin = req.admin;
  if (admin.role != "ADMIN_ROLE" && admin.role != "ROOT"){
    return res.status(401).json({
      ok:false,
      err:{msg:"Usuario no autorizado"}
    });
  }

  next();
};

// ==================
// Verificar token  admin
// ==================

let verificaTokenRoot = (req,res,next) => {
  let admin = req.admin;
  if(admin.role != "ROOT"){
    return res.status(401).json({
      ok:false,
      err:{msg:"Usuario no autorizado"}
    });
  }

  next();
};

module.exports = {
  verificaToken,
  verificaTokenAdmin,
  verificaTokenRoot
}
