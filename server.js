// Fancy way of structuring modules. Never got that.
var express     = require('express');
var app         = express();
var fs          = require('fs');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose'); // because its easier
var morgan      = require('morgan')


var config = JSON.parse(fs.readFileSync('./config/config.json')); // <- See example_config.json

// Open the gates!
var port = 8000;
// Do the body parser thing - it encodes the text as URL encoded data.
app.use(bodyParser.urlencoded({ extended: true }));
// And now as JSON!!!
app.use(bodyParser.json());
// Log stuff with morgan!
app.use(morgan('dev'));
// Thy mongoose
mongoose.connect(config.dbConnect);
// Let's define the model for the To-Do App.
// Since the todo app is persistent, the data is saved to a mongo db instance running on my local network
// Probably will have more of that as well

var Todo = mongoose.model('Todo', {
    text: String,
    done: Boolean
});

// Router! Does it have wifi?
var router = express.Router();

// Not quite DRY
router.get('/todos', function (req, res) {
    Todo.find( function (err, todos) {
        if (err) res.send(err);
        res.json(todos);
    });
});

router.post('/todos', function (req, res) {
    Todo.create({
        text: req.body.text,
        done: false
    }, function (err, todo) {
        if (err) res.send(err);
        Todo.find(function(err, todos) {
            if (err) res.send(err);
            res.json(todos);
        });
    });
});

router.delete('/todos/:todo_id', function (req, res) {
    Todo.remove({
        _id: req.params.todo_id
    }, function (err, todo) {
        if (err) res.send(err);
        Todo.find(function(err, todos) {
            if (err) res.send(err);
            res.json(todos);
        });
    });
});

router.put('/todos/:todo_id', function (req, res) {
    Todo.update({_id: req.params.todo_id}, {done:req.body.done}, function (err, todo) {
        if (err) res.send(err);
        Todo.find(function(err, todos) {
            if (err) res.send(err);
            res.json(todos);
        });
    });
});



// Let's serve the api
app.use('/api', router);
// Let serve the static site
app.use(express.static(__dirname + '/public'));

app.listen(port)
console.log('App listening on port: ' + port);
