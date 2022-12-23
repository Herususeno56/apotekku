
//SAMPLE
const express = require("express");

const methodGet = (req, res) => {
  res.send("contoh menggunakan Get");
};
const methodPost = (req, res) => {
  res.send("contoh menggunakan Post");
};
const methodPut = (req, res) => {
  res.send("contoh menggunakan Put");
};
const methodDelete = (req, res) => {
  res.send("contoh menggunakan delete");
};

module.exports = {
  methodGet,
  methodPost,
  methodPut,
  methodDelete,
};
