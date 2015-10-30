var port = process.env.PORT || 8080;        // set our port

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var exec = require('child_process').exec;

var app = express();
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'public')));

router.get('/', function(req, res) {
    res.send('Hello world');
});
router.get('/stream', function(req, res) {
    if(!req.query.torrent) throw new Error("Please specify torrent query param");

    var peerflixCmd = 'peerflix \'' + req.query.torrent + '\' --vlc ';
    var cmd = 'gnome-terminal -e "' + peerflixCmd + '"';
    exec(cmd,
        function (error, stdout, stderr) {
            if (stderr) {
                console.log('stderr: ' + stderr);
            }
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });

    res.json({
        started: true,
        cmd: cmd,
        torrent: req.query.torrent,
        explained: "Just called torrentflix on your behalf"
    });
});

app.use('/', router);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
app.use(function(err, req, res, next) {
    var status = err.status || 500;
    res.status(status);
    res.json({
        message: err.message,
        stack: err.stack,
        error: err
    });
    console.error("[Error " + status + "]", err.message, err)
});

app.listen(port);
console.log('Magic happens on port ' + port);