const http = require('http');
const url = require('url');
const queryString = require('query-string');
const fs = require('fs'); 

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

let resposta;   
const urlParse =  url.parse(req.url,true);
// receber informações do usuario
const params = queryString.parse(urlParse.search);
//  Criar um usuario -  Atualizar um usuario

if(urlParse.pathname == '/criar-usuario'){
    

    // Salvar as informações do usuario
    fs.writeFile('user-data/'+ params.id +'.txt', JSON.stringify(params), function (err) {
            if (err) throw err;
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(resposta);  
          }); 
        resposta = 'Usuario criado com sucesso';
}

 //  Selecionar um usuario

else if(urlParse.pathname == '/selecionar-usuario'){
    fs.readFile('user-data/'+ params.id +'.txt', function(err, data) {
        resposta = data;

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(resposta);
      });
}
    //  Remover um usuario
    else if(urlParse.pathname == '/deletar-usuario'){
        fs.unlink('user-data/'+ params.id +'.txt', function(err) {

            resposta = err ? 'Usuario nao encontrado' : 'Usuario removido'

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(resposta);
          });
    }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

