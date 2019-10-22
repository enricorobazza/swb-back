import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dbExecute from './database';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', (req, res)=>{
    var html = [];
    dbExecute(db => {return new Promise((resolve, reject) => {
        db.query("select * from posts", [], (err, result) => {
            result.forEach(post =>{
                html.push(post.body);
            })
            resolve();
            res.status(200).send(html);
        })
    })})
});

app.post('/', (req,res)=>{
    dbExecute(db=> {return new Promise((resolve, reject) => {
        db.query("insert into posts values(0,?)",[req.body.html], (err, result)=>{
            if(err){
                console.log(err);
                resolve();
                res.status(400).send("Erro ao inserir");
            }
            else {
                resolve();
                res.status(200).send("Inserido com sucesso!");
            }
        });
    })});
})


app.listen(process.env.PORT || 3001);