let licenses = {};

export default function handler(req, res) {
  // CORS
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
  
  const { machine_code } = req.body;
  const machineCode = (machine_code || '').replace(/-/g, '').toUpperCase();
  
  if (!machineCode || machineCode.length !== 32) {
    res.status(400).json({ error: 'Invalid machine code' });
    return;
  }
  
  if (licenses[machineCode] && licenses[machineCode].authorized) {
    res.status(200).json({
      authorized: true,
      message: '设备已授权',
      expire_date: licenses[machineCode].expire_date || '2099-12-31'
    });
    return;
  }
  
  // 记录未授权设备
  if (!licenses[machineCode]) {
    licenses[machineCode] = {
      authorized: false,
      first_seen: new Date().toISOString(),
      last_check: new Date().toISOString()
    };
  }
  
  res.status(200).json({
    authorized: false,
    message: '设备未授权，请联系管理员'
  });
}