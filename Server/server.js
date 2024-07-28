require("dotenv").config();
const express = require("express");
const cors = require("cors")
const fs = require("fs").promises;
const { schemaAddFav, schemaRemoveFav } = require("./joiSchema");

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}))
app.use(express.json());

const port = process.env.SERVER_PORT || 3001;



app.get('/image/:userNickname', async (req, res) => {

  const { userNickname } = req.params;
  const filePath = `userImages/${userNickname}.json`;
  try {
    const images = await fs.readFile(filePath, "utf8").then(JSON.parse);
    return res.json(images);
  } catch (error) {
    return res.json([]);
  }
})

app.post('/image/:userNickname/save', async (req, res) => {
  try {
		const { userNickname } = req.params;
		const { imageURL } = req.body;
		schemaAddFav.validate({ userNickname, imageURL });

		const filePath = `userImages/${userNickname}.json`;
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

app.post('/image/:userNickname/delete', async (req, res) => {
  try {
		const { userNickname } = req.params;
		const { imageURL } = req.body;
		schemaRemoveFav.validate({ userNickname, imageURL });

		const filePath = `userImages/${userNickname}.json`;
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