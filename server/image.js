import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration,OpenAIApi } from 'openai';

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
console.log(configuration.apiKey);
const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CodeX!'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createImage({
      prompt: `${prompt}`,
      n: 1,
      size: "256x256",
    });
    const image_url = response.data.data[0].url;

    
    // console.log(image_url);

    res.status(200).send({
      botimage: image_url
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5002, () => console.log('AI image server started on http://localhost:5002'))
