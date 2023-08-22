var pool = require('./bd');


async function traedatos(user, password) {
    try {
        var query = 'select * from rubros order by descripcion';
        var rows = await pool.query(query);
        return rows;
    }catch (error) {
        console.log(error);
    }


    }

    async function traedato(id) {
        try {
            var query = 'select * from rubros where id = ?';
            var row = await pool.query(query, [id]);
           
            return row[0];
        }catch (error) {
            console.log(error);
        }
    
    
        }

module.exports = {traedatos,traedato}