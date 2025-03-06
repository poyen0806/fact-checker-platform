export default async function handler(req, res) {
    const { query } = req.query;
  
    try {
      const response = await fetch(`http://localhost:5050/api/fact-check?query=${query}`);
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'API 請求失敗' });
    }
}
  