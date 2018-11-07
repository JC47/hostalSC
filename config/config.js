// ================================================
// Puerto
// ================================================

process.env.PORT = process.env.PORT || 3000;

// ================================================
// Puerto
// ================================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ================================================
// Vencimiento del token
// ================================================
process.env.CADUCIDAD_TOKEN = 60*60*24*30;

// ================================================
// Semilla
// ================================================
process.env.SEED = process.env.SEED || 'este-es-el-seed';

// ================================================
// DB
// ================================================
let urlDB;

if(process.env.NODE_ENV === "dev"){
  urlDB = "mongodb://localhost:27017/hostalsc";
  //urlDB ="mongodb://root:cornelio96@ds155263.mlab.com:55263/hostalsc";
}
else{
  urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;
