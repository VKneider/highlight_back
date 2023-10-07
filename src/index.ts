import app from "./app.js";
import connection from "./database.js";

connection.once('open', () => {
    console.log('Mongodb Connection stablished');
  });
  
connection.on('error', (err) => {
    console.log('Mongodb connection error:', err);
    process.exit();
});

app.listen(app.get('port'));

app.get('/', (req, res) => {
    res.send('Hello World');
});


console.log('Server on port', app.get('port'));
