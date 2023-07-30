const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    name: String,
    type: String
});

const ApiResponseSchema = new mongoose.Schema({
    apiName: {
        type: String,
        required: true
    },
    properties: {
        type: [PropertySchema],
        required: true
    },
    responseData: {
        type: [mongoose.Schema.Types.Mixed]
    }
});

const ApiResponse = mongoose.model('ApiResponse', ApiResponseSchema);
module.exports = ApiResponse;
