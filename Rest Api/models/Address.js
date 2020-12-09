module.exports = function (mongoose) {
    const addressSchema = new mongoose.Schema({
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        street: {
            type: String,
            required: true,
        },
        zip: {
            type: Number,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
    });

    return mongoose.model('address', addressSchema);
};
