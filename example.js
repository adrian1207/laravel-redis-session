const express = require('express')
const lrs = require('laravel-redis-session')
const app = express()
const port = 3000

var redis = require('redis');

var client = redis.createClient({
	host: '127.0.0.1',
	port: '6379',
    password: 'admin'
});

var object = { "_token": "fyDV3CBI5xwQan3gaw4nQymybdybUKDKV5wqHGCd" };
var appKey = 'rY2iKgS0DAJrQ3Inhj68DSSG2gW2aXZj';
var sessionKey = 'eyJpdiI6Im5YNkl0YnlQcEp1T0FUYWRaaWZEdlE9PSIsInZhbHVlIjoiVEJuVTlDODNFK3poeTNwYndxd2h0TGIxeTZ2Ym9ybGgrVWxmSVwvSWNSTDdnTVwvK0dCTWdNV0xxXC9FU25KQ0haUCIsIm1hYyI6ImIwODI5NmM3ZjAwOTE5NDgyYWIyZmE1MWZmMTZmZTA1OGEzN2RjOTU1Nzg3ZTM1NDA3NTE3ZTdiYjE0YTFlN2YifQ==';

var sessionID = lrs.getSessionId(sessionKey, appKey);
var test = lrs.getSession(sessionID, client, 'edito.');

// lrs.setSession('test', client, object, 'laravel');
// var test = lrs.getSession('test', client, 'laravel');

test.then(function(value){
    console.log(value);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))