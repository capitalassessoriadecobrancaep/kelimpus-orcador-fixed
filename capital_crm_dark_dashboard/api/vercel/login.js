module.exports = (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method not allowed' });
  const { email, password } = req.body || {};
  if (email === 'admin@capital.com.br' && password === '123456') {
    return res.json({ token: 'demo-token', user: { id:1, name:'Admin', email } });
  }
  return res.status(401).json({ error: 'invalid credentials' });
};
