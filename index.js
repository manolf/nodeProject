const express = require ('express');
const app = express();

//new route handler
app.get('/',(req, res)=> {
	res.send({ hi: 'there'});

});

//Dynamic Port Binding for Heroku
const PORT = process.env.PORT || 5000;
app.listen(PORT);