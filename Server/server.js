const express = require("express");
const cors = require("cors")
const dotenv = require('dotenv')


dotenv.config();
const app = express();
const port = process.env.SERVER_PORT || 3002;

app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(express.json());



app.get('/api/search', async (req, res) => {
    const query = req.query.q;
    try {
      const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
        params: {
          key: AIzaSyATn8-VgSOORxBmA2o2wMvqscWSxaIVb6I,
          cx: c244fc5dc3f57416b,
          q: query,
          searchType: 'image',
          num: 10,
        },
      });
      res.json(response.data.items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while searching' });
    }
  });

app.listen(port, () => console.log(`Server listening on port ${port}`));