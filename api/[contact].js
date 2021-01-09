module.exports = (req, res) => {
  const body = req.body;
  const cookies = req.cookies;
  const headers = req.headers;
  const query = req.query;
  // res.json({ body, query });
  res.send('Hello ' + JSON.stringify(query));
};
