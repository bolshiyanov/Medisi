const config = {
    PORT: process.env.PORT || 3000,
    MONGO_URL: "mongodb+srv://root:admin@cluster0.milmt.mongodb.net/Meditation-test?retryWrites=true&w=majority",
    secret_key: "sshkey"
}

module.exports = config