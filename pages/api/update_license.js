let licenses = {};

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  
  const { machine_code, authorized } = req.body;
  const machineCode = (machine_code || '').replace(/-/g, '').toUpperCase();
  
  if (!machineCode || machineCode.length !== 32) {
    res.status(400).json({ error: 'Invalid machine code' });
    return;
  }
  
  licenses[machineCode] = {
    ...licenses[machineCode],
    authorized: authorized || false,
    updated_at: new Date().toISOString(),
    updated_by: 'admin'
  };
  
  res.status(200).json({
    success: true,
    machine_code: machineCode,
    authorized: authorized || false
  });
}