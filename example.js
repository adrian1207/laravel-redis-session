const express = require('express')
const lrs = require('laravel-redis-session')
const app = express()
const port = 3000

var redis = require('redis');

// create redis connection instance
var client = redis.createClient({
	host: '127.0.0.1',
	port: '6379',
    password: 'admin'
});

// Laravel APP_KEY
var appKey = 'rY2iKgS0DdJrQ3Inhj68DSSG2gW2adZj';

// CREATE SESSION KEY
// to generete random, use rchars.randomSafeSync(40)
var value = 'qpob5ebXt7mH6wvpxkXcitixvTsQrMQakcL7Uw7m';

var sessionKeyGener = lrs.generateSessionKey(value, appKey);
console.log(sessionKeyGener); // session key to save in cookie

// GET SESSION ID BY SESSION KEY
var sessionID = lrs.getSessionId(sessionKeyGener, appKey);
console.log(sessionID); // should return the same as value

// ADD DATA TO SESSION STORE
var object = { "_token": "fyDV3CBI5xwQan3gaw4nQymybdybUKDKV5wqHGCd" };
lrs.setSession(sessionID, client, object, 'laravel');

// GET DATA FROM SESSION STORE
var data = lrs.getSession(sessionID, client, 'laravel');
data.then(function(value){
    console.log(value);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))