require("dotenv").config();
const express = require("express");
const cors = require("cors")
const fs = require("fs");
const { schemaAddFav, schemaRemoveFav } = require("./joiSchema");

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}))
app.use(express.json());

const port = process.env.SERVER_PORT || 3001;



app.get('/img/:userEmail', async (req, res) => {

  const { userEmail } = req.params;
  const filePath = `userImages/${userEmail}.json`;
  try {
    const images = await fs.readFile(filePath, "utf8").then(JSON.parse);
    return res.json(images);
  } catch (error) {
    return res.json([]);
  }
})

app.post('/img/:userEmail/save', async (req, res) => {
  try {
		const { userEmail } = req.params;
		const { imageURL } = req.body;
		schemaAddFav.validate({ userEmail, imageURL });

		const filePath = `userImages/${userEmail}.json`;
		let images = [];
		try {
			images = JSON.parse(await fs.readFile(filePath, "utf8"));
		} catch (error) {}

		images.push(imageURL);
		await fs.writeFile(filePath, JSON.stringify(images));
		return res.json({ success: true, message: "Image saved successfully" });
	} catch (error) {
		return res.status(400).json({ success: false, error: error.message });
	}
})

app.post('/img/:userEmail/delete', async (req, res) => {
  try {
		const { userEmail } = req.params;
		const { imageURL } = req.body;
		schemaRemoveFav.validate({ userEmail, imageURL });

		const filePath = `userImages/${userEmail}.json`;
		let images = [];
		try {
			images = JSON.parse(await fs.readFile(filePath, "utf8"));
			images = images.filter((image) => image !== imageURL);
			await fs.writeFile(filePath, JSON.stringify(images));
		} catch (error) {}

		return res.json({ success: true, message: "Image deleted successfully" });
	} catch (error) {
		return res.status(400).json({ success: false, error: error.message });
	}
})



app.listen(port, () => console.log(`Server listening on port ${port}`));