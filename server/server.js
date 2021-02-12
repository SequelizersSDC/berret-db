const express = require('express');
const path = require('path');
const cors = require('cors');
const Sequelize = require('sequelize')


const pool = require('../db/db.js')

const app = express();

app.use(cors());
app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/api/items/:item_id/info', (req, res) => {
  const id = parseInt(req.params.item_id)
  pool
    .query('SELECT * FROM product WHERE id = $1', [id])
    .then((results) => {
      res.status(200).json(results.rows)
      console.log('db connection success')
    })
    .catch((err) => {
      res.status(400).json(err)
      console.log(err, 'db connection failed')
    })
})

app.get('/api/items/:item_id/styles', (req, res) => {
  const id = parseInt(req.params.item_id)
  pool
    .query('SELECT colors.color, colors.price_diff, color_join_table.prod_id FROM colors LEFT JOIN color_join_table ON colors.id = color_join_table.color_id  WHERE color_join_table.prod_id = $1', [id])
    .then((results) => {
      res.status(200).json(results.rows)
    })
    .catch ((err) => {
      res.status(400).json(err)
      console.log(err, 'db connection failed')
    })
})

app.get('/api/items/:item_id/sizes', (req, res) => {
  const id = parseInt(req.params.item_id)
  pool
    .query('SELECT sizes.size, size_join_table.prod_id FROM sizes LEFT JOIN size_join_table ON sizes.id = size_join_table.size_id WHERE size_join_table.prod_id = $1', [id])
    .then((results) =>{
      res.status(200).json(results.rows)
    })
    .catch ((err) => {
      res.status(400).json(err)
      console.log(err, 'db connection failed')
    })
})

app.get('/api/items/:item_id/photos', (req, res) => {
  debugger;
  const id = parseInt(req.params.item_id)
  pool
    .query('SELECT * FROM photo WHERE photo.prod_id = $1', [id])
    .then((results) =>{
      res.status(200).json(results.rows)
    })
    .catch ((err) => {
      res.status(400).json(err)
      console.log(err, 'db connection failed')
    })
})

module.exports = app;