module.exports = function (mongoose) {
    const carSchema = new mongoose.Schema(
        {
            brand: {
                type: String,
                required: true,
            },
            model: {
                type: String,
                required: true,
            },
            year: {
                type: Number,
                required: true,
            },
            engine: {
                type: String,
                required: true,
            },
            enginePower: {
                type: Number,
                required: true,
            },
            engineCapacity: {
                type: Number,
                required: true,
            },
            transmission: {
                type: String,
                required: true,
            },
            imageUrl: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            description: {
                type: String,
            },
            likes: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'user',
                },
            ],
            creator: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
            },
        },
        { timestamps: { createdAt: 'created_at' } }
    );

    return mongoose.model('car', carSchema);
};
