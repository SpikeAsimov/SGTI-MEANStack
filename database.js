const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Fer_2911:fdvega2911@cluster0.alcvb.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true,
                                                        useUnifiedTopology: true,
                                                        useFindAndModify: false 
} )

    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

process.on('SIGINT', () =>{
    mongoose.connection.close(() => {
        console.log(`Database is disconnected`);
        process.exit(0)
    });
});

module.exports = mongoose;  