'use strict'; var out = ["test/main/example.spec.js"]; if (typeof define==='function'){define(function(require){return out;});}if (typeof module!=='undefined'){module.exports = out;}