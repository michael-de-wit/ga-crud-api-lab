const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const genomicIndicators = require('./models/genomicIndicators.js');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());

const cors = require('cors');
app.use(cors());

// - Routes
// -- CREATE - POST - /pets
app.post('/genomicIndicators', async (req, res) => {
  const createdGenomicIndicator = await genomicIndicators.create(req.body);
  res.json(createdGenomicIndicator)
});

app.listen(3000, () => {
  console.log('The express app is ready!');
});


// ----- Experimental

// const fs = require('fs');
// const path = require('path');

// let jsonObject;

// ---- Get health record JSON sample data -- based on https://claude.ai/chat/6813b62c-6ae8-4bc2-9f83-611773905c0e
// const filePath = path.join(__dirname, 'sampleHealthRecord.json'); // Construct the absolute path
// try {
//   const data = fs.readFileSync(filePath, 'utf8');
//   jsonObject = JSON.parse(data);
//   // use jsonObject
// } catch (error) {
//   console.error('Error reading or parsing the file:', error);
// }

// console.log(JSON.stringify(jsonObject, null, 2));

// ---- Generate schema - from https://stackoverflow.com/questions/58598252/initialize-mongoose-schema-from-json
// const generateSchema = require('generate-schema');

// let MongooseSchema = generateSchema.mongoose(jsonObject);

// console.log(`schema`, MongooseSchema);
