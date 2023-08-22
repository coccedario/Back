var pool = require('./bd');


async function traedatos(user, password) {
    try {
        var query = 'select * from instrumentos';
        var rows = await pool.query(query);
        return rows;
    } catch (error) {
        console.log(error);
    }


}

async function traedatosrubro(id) {
    try {
        var query = 'select * from instrumentos where rubro =?';
        var rows = await pool.query(query,[id]);
        return rows;
    } catch (error) {
        console.log(error);
    }


}




async function traedatosinner(user, password) {
    try {
        var query = 'SELECT instrumentos.id AS id, img,marca, modelo, precio,rubro,texto,titulo, rubros.descripcion AS rubdes, marcas.descripcion AS marcdes FROM instrumentos INNER JOIN rubros ON instrumentos.rubro = rubros.id INNER JOIN marcas ON instrumentos.marca = marcas.id';
        var rows = await pool.query(query);
        return rows;
    } catch (error) {
        console.log(error);
    }


}



async function Insertardato(obj) {
    try {
        var query = 'insert into instrumentos set ?';
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }


}

async function eliminardato(id) {

    var query = 'delete from instrumentos where id=?';
    var row = await pool.query(query, [id]);
    return row;



}



async function traedato(id) {
    try {
        var query = 'select * from instrumentos where id = ?';
        var row = await pool.query(query, [id]);

        return row[0];
    } catch (error) {
        console.log(error);
    }


}



async function modificardato(obj, id) {


    try {
        var query = 'update instrumentos set ? where id = ?';

        var row = await pool.query(query, [obj, id]);
        return row;
    } catch (error) {
        console.log(error);
        throw error;

    }


}

module.exports = { traedatos,traedatosrubro, traedatosinner, Insertardato, eliminardato, traedato, modificardato }