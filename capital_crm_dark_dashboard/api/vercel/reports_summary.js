module.exports = (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ error: 'method not allowed' });
  // demo summary data
  const summary = {
    total_debtors: 124,
    total_creditors: 12,
    total_open_amount: 157320.50,
    total_received: 46200.75,
    monthly_default: [5,8,12,9,15,11,7,6,10,14,9,8] // sample per month
  };
  res.json(summary);
};
