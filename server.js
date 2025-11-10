const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());

const cors = require('cors');
app.use(cors());

const genomicIndicators = require('./models/genomicIndicators.js');

// - Experimental - import Synthea data
const { MongoClient } = require('mongodb');
const fs = require('fs').promises;
const path = require('path');

// async function importFile() {
//     const fileContent = await fs.readFile(`./sampleHealthRecord.json`, 'utf8');
//     const data = JSON.parse(fileContent);
//     console.log(JSON.stringify(data, null, 2));
//     const collection = mongoose.connection.collection('genomicindicators'); // Change 'bundles' to your collection name
//         const result = await collection.insertOne(data);
// }
// importFile()

      
//       
//       console.log(`✓ Imported: ${path.basename(filePath)} (ID: ${result.insertedId})`);
//       return true;
//     } catch (error) {
//       if (error instanceof SyntaxError) {
//         console.error(`✗ JSON Parse Error in ${path.basename(filePath)}:`, error.message);
//       } else {
//         console.error(`✗ Error importing ${path.basename(filePath)}:`, error.message);
//       }
//       return false;
//     }
//   }


// - Routes
// -- CREATE - POST - /pets
app.post('/genomicIndicators', async (req, res) => {
  const createdGenomicIndicator = await genomicIndicators.create(req.body);
  res.json(createdGenomicIndicator)
});

// -- READ - GET - /pets
app.get('/genomicIndicators', async (req, res) => {
	// Add a message to test the route
	const foundGenomicIndicators = await genomicIndicators.find();
    res.json(foundGenomicIndicators);
});

// -- DELETE
app.delete('/genomicIndicators/:genomicIndicatorsId', async (req, res) => {
	// Add a message to test the route
	const deletedGenomicIndicator = await genomicIndicators.findByIdAndDelete(req.params.genomicIndicatorsId);
    res.json(deletedGenomicIndicator);
});

// -- UPDATE - PUT - /pets/:petId
app.put('/genomicIndicators/:genomicIndicatorsId', async (req, res) => {
    // Add { new: true } as the third argument
    const updatedGenomicIndicator = await genomicIndicators.findByIdAndUpdate(
	    req.params.genomicIndicatorsId, 
	    req.body,
	    {new: true}
    );
    res.json(updatedGenomicIndicator);
});

app.listen(3000, () => {
  console.log('The express app is ready!');
});


// ----- Experimental


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
