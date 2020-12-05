module.exports = function (mongoose) {
    const addressSchema = new mongoose.Schema({
        fullName: {
            type: String,
            required: true,
        },
        addressOne: {
            type: String,
            required: true,
        },
        addersTwo: {
            type: String,
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
