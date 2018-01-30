var express = require('express');
var app = express();
var engine = require('ejs-locals');
var bodyParser = require('body-parser');

var admin = require("firebase-admin");

var serviceAccount = require("./nodejs-exercise-firebase-adminsdk-vfuzb-d998a84ff8.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://nodejs-exercise.firebaseio.com"
});

var fireData = admin.database();

// 增加靜態檔案的路徑
app.use(express.static('public'));

app.engine('ejs', engine);
app.set('views', './views');
// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var login = function(req, res, next) {
    var _url = req.url;
    if (_url == '/'){
        next();
    } else {
        res.send('你的登入資料有誤！');
    }
};

app.get('/', login, function(req, res) {
    fireData.ref('todos').once('value', function(snapshot) {
        var data = snapshot.val();
        res.render('index', {
            "todolist": data
        });
    })
});

var user = require('./routes/user');
app.use('/user', user);

var shopping = require('./routes/shopping');
app.use('/shopping', shopping);

app.get('/search', function(req, res) {
    res.render('search');
});

app.post('/addTodo', function(req, res) {
    var content = req.body.content;
    var contentRef = fireData.ref('todos').push();
    contentRef.set({"content": content})
    .then(function() {
        fireData.ref('todos').once('value', function(snapshot) {
            res.send({
                "success": true,
                "result": snapshot.val(),
                "message": "資料讀取成功"
            });
       });
    });
});

app.post('/removeTodo', function(req, res) {
    var _id = req.body.id;
    fireData.ref('todos').child(_id).remove()
    .then(function() {
        fireData.ref('todos').once('value', function(snapshot) {
           res.send({
              "success": true,
              "result": snapshot.val(),
              "message": "資料刪除成功"
           });
        });
    });
});

app.post('/searchList', function(req, res) {
    console.log(req.body);
    res.redirect('search');
});

app.post('/searchAJAX', function(req, res) {
    console.log(req.body);
    console.log(req.body.list[2]);
    res.send('hello!!');
});

app.use(function(req, res, next) {
    res.status(404).send('<h2>抱歉，您的頁面找不到。</h2>');
});

app.use(function(err, req, res, next) {
    res.status(500).send('<h2>程式有點問題，請稍候嘗試。</h2>')
});

app.get('/search/:name', function(req, res) {
    var userName = req.params.name;
    var limit = req.query.limit;
    var q = req.query.q;

    res.send('<html><head></head><body><h1>'
    + userName + '搜尋了' + q + '關鍵字，想要找前' + limit + '筆資料。'
    + '</h1></body></html>');
});

var port = process.env.PORT || 3000;
app.listen(port);