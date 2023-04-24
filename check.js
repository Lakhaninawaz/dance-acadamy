const mongoose = require('mongoose');

// Connection string
const uri = 'mongodb://localhost:27017/myapp';

// Connect to MongoDB
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error(err));