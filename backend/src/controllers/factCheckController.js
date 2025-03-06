import dotenvConfig from '../config/dotenvConfig.js';

dotenvConfig();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export const getFactCheckResults = async (req, res) => {
    const query = req.query.query;
    if (!query) {
        return res.status(400).json({ error: '缺少查詢參數 query' });
    }

    try {
        const response = await fetch(
            `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}`
        );
        const data = await response.json();

        return res.json(data);
    } catch (error) {
        console.error('❌ API 請求失敗', error);
        return res.status(500).json({ error: '內部伺服器錯誤' });
    }
};
