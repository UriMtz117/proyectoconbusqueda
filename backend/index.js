const express = require("express");
const session = require("express-session")
const cors = require("cors");
const usuariosRutas = require("./rutas/rutasUsuarios");
const productosRutas = require("./rutas/rutasProductos");
const ventasRutas = require("./rutas/rutasVentas");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(session({
    secret:"lkjmxAVVB43",
    resave:true,
    saveUninitialized:true,
    cookie:{secure:true}
}));
app.use("/usuarios", usuariosRutas);
app.use("/productos", productosRutas);
app.use("/ventas", ventasRutas);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Servidor en http://localhost:" + port);
});
