const express = require('express');
const router = express.Router();
const ApiResponse = require('../models/ApiResponse');

// Helper function to generate random strings
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Helper function to generate random numbers
function generateRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

// Helper function to generate the API response with dummy data
function generateMockApiResponse(properties, numRecords) {
  const generatedData = [];
  const uniquePropertyNames = properties.map((prop) => prop.name);

  for (let i = 0; i < numRecords; i++) {
    const record = {};

    uniquePropertyNames.forEach((propertyName) => {
      const property = properties.find((prop) => prop.name === propertyName);
      if (property.type === 'string') {
        record[propertyName] = generateRandomString(10);
      } else if (property.type === 'number') {
        record[propertyName] = generateRandomNumber(100);
      } else {
        record[propertyName] = '';
      }
    });

    generatedData.push(record);
  }

  return generatedData;
}

router.post('/createApi', async (req, res) => {
  try {
    const { apiName, properties, numRecords } = req.body;

    // Generate the API response with dummy data based on the properties and numRecords
    const responseData = generateMockApiResponse(properties, numRecords);

    // Save the generated API response to the database using the ApiResponse model
    const newApiResponse = new ApiResponse({
      apiName,
      properties,
      responseData,
    });
    await newApiResponse.save();

    res.status(200).json({
      message: 'API created successfully',
      responseData, // Return only the responseData with user-entered property names and random values
    });
  } catch (error) {
    console.error('Error creating API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
