import app from "./app.js";

app.listen(app.get('port'));

app.get('/', (req, res) => {
    res.send('Hello World');
});


console.log('Server on port', app.get('port'));
