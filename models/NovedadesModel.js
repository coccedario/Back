var pool = require('./bd');


async function traenovedades(user, password) {
    try {
        var query = 'select * from novedades';
        var rows = await pool.query(query);
        return rows;
    }catch (error) {
        console.log(error);
    }


    }

    async function Insertarnovedad(obj) {
        try {
            var query = 'insert into novedades set ?';
            var rows = await pool.query(query,[obj]);
            return rows;
        }catch (error) {
            console.log(error);
            throw error;
        }
    
    
        }

        async function eliminarnovedad(id) {
           
                var query = 'delete from novedades where id=?';
                var row = await pool.query(query,[id]);
                return row;
           
        
        
            }



            async function traenovedad(id) {
                try {
                    var query = 'select * from novedades where id = ?';
                    var row = await pool.query(query, [id]);
                    return row[0];
                }catch (error) {
                    console.log(error);
                }
            
            
                }



                async function modificarnovedad(obj, id) {
                    try {
                        var query = 'update novedades set ? where id = ?';
                        var row = await pool.query(query, [obj, id]);
                        return row;
                    }catch (error) {
                        console.log(error);
                        throw error;
                        
                    }
                
                
                    }

module.exports = { traenovedades,Insertarnovedad,eliminarnovedad,traenovedad,modificarnovedad}