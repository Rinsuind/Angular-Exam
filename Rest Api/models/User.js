module.exports = function (mongoose, bcrypt, rounds) {
    const userSchema = new mongoose.Schema(
        {
            email: {
                type: String,
                required: true,
                unique: true,
            },
            username: {
                type: String,
                required: true,
            },
            password: {
                type: String,
                required: true,
            },
            userAddress: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'address',
            },
            carsBought: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'car',
                },
            ],
        },
        { timestamps: { createdAt: 'created_at' } }
    );

    userSchema.methods = {
        passwordMatch(password) {
            return bcrypt.compare(password, this.password);
        },
    };

    userSchema.pre('save', function (next) {
        if (this.isModified('password')) {
            bcrypt.genSalt(rounds, (err, salt) => {
                if (err) {
                    return next(err);
                }
                bcrypt.hash(this.password, salt, (err, hash) => {
                    if (err) {
                        return next(err);
                    }
                    this.password = hash;
                    next();
                });
            });
            return;
        }
        next();
    });
    return mongoose.model('user', userSchema);
};
