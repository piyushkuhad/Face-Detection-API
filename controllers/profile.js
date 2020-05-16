const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    //let found = false;
    // database.users.forEach(user => {
    //     if(user.id === id) {
    //         found = true
    //         return res.json(user);
    //     }
    // });

    db.select('*').from('users').where({id: id}).then(user => {
        //console.log(user[0]);
        if(user.length){
            res.json(user[0]);
        }
        else {
            res.status(400).json("Not Found");
        }
    }).catch(err => res.status(400).json("Error getting User"))

    // if(!found) {
    //     res.status(404).json('User not found');
    // }
}

module.exports = {handleProfileGet}