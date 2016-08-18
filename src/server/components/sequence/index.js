var seq = require('../../model/seq.model');

function getNextSequence(name) {
    return seq.findOneAndUpdate(
        {
            _id: name
        },
        {
            $inc: { seq: 1 }
        },
        {
            new: true
        }
    );
}

module.exports = {
    getNextSequence: getNextSequence
}