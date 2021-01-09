module.exports = (req, res) => {
  return res.send(`Hello Moto! ${JSON.stringify(req.query)}`);
};
