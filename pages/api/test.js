export default function handler(req, res) {
  res.status(200).json({ status: 'ok', service: 'license-server' });
}