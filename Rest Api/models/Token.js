module.exports = function (mongoose) {
    const blackListToken = new mongoose.Schema(
        {
            token: String,
        },
        { timestamps: { createdAt: 'created_at' } }
    );

    return mongoose.model('token', blackListToken);
};
