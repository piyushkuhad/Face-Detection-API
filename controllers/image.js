const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'a33970351b7b4e17b61b4dd7a2b04868'
});

const handleApiCall = (req, res) => {
    console.log(req.body);
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json("Unable to fetch results"))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    // let found = false;
    // database.users.forEach(user => {
    //     if(user.id === id) {
    //         found = true
    //         user.entries++;
    //         return res.json(user.entries);
    //     }
    // });
    // if(!found) {
    //     res.status(404).json('User not found');
    // }

    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        console.log(entries);
        res.json(entries[0]);
    }).catch(err => {
        res.status(400).json("Unable to fetch entries")
    })

}

module.exports = {handleImage, handleApiCall}