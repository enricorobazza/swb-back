import mysql from 'mysql';

const host = "localhost";
const user = "root";
const password = "";
const database = "swb";

export default (cb) => {
    let db = mysql.createConnection({ host, user, password, database, multipleStatements: true });
    db.connect(err=>{
        if(err){
            throw err;
        }
        console.log("MySQL connected...");
        cb(db).then(()=>{
            db.end(err =>{
                if(err) throw err;
                console.log("MySQL disconnected...");
            });
        })
        
    })
}
