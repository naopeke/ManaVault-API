const express = require('express');

function errorHandling(err, req, res, next){
    res.status(500).json({ message: err.message })
};

function handle404(req, res, next){
    res.status(404).json({ error: true, code:404, message: 'Endpoint is not found' });
}

module.exports = { errorHandling, handle404 } ;