let licenses = {};

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  
  res.status(200).json({
    licenses: licenses,
    count: Object.keys(licenses).length
  });
}