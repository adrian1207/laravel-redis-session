'use strict';

const serialize = require('php-serialization').serialize;
const unserialize = require('php-serialization').unserialize;
const Class = require("php-serialization").Class;
const crypto = require("crypto");

module.exports = {

    getSessionId: function (sessionKey, appKey) {
        var cypher = 'aes-' + appKey.length * 8 + '-cbc';

        sessionKey = new Buffer(sessionKey, 'base64');
        sessionKey = sessionKey.toString();
        sessionKey = JSON.parse(sessionKey);

        appKey = new Buffer(appKey);
        sessionKey.iv = new Buffer(sessionKey.iv, 'base64');

        var decoder = crypto.createDecipheriv(cypher, appKey, sessionKey.iv);
        var decoded = decoder.update(sessionKey.value, 'base64');
        decoded += decoder.final();

        return decoded.toString();
    },

    getSession: function (sessionId, redis, prefix) {
        return new Promise(function (resolve, reject) {
            redis.get(prefix + ':' + sessionId, function (err, value) {
                if (err != null)
                    return reject(err);

                return resolve(unserialize(unserialize(value)));
            });
        });
    },

    setSession: function (sessionId, redis, object, prefix) {
        var content = new Class("");

        for (var property in object) {
            if (object.hasOwnProperty(property)) {
                content.__addAttr__(property, "string", object[property], "string");
            }
        }

        var serialized = serialize(serialize(content, "array"), "string");

        redis.set(prefix + ':' + sessionId, serialized);
    },
};