export default function handler(req, res) {
  return res.send(`Hello Moto! ${JSON.stringify(req.query)}`);
}
