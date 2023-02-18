import mongoose from 'mongoose';

const paperModel = mongoose.Schema({
    name: {
        type: String,
    },
    pdf: {
        type: String,
    },
    img: {
        type: String,
    },
    category: {
        type: String,
    },
});

export default mongoose.model('paper', paperModel);
