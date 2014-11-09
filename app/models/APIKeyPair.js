var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uuid = require('node-uuid');


var APIKeyPairSchema = new Schema({
    _creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    keyId: {
        type: String,
        required: true,
        default: uuid.v4()
    },
    keySecret: {
        type: String,
        required: true,
        default: uuid.v4()
    },
    active: {
        type: Boolean,
        default: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    dateModified: {
        type: Date
    }
});



// Register a model using the schema.
mongoose.model('APIKeyPair', APIKeyPairSchema);