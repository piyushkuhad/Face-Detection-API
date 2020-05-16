const handleSignin = (db, bcrypt) => (req, res) => {
    //res.json('Sign In');

    // Load hash from your password DB.
    // bcrypt.compare("apples", '$2a$10$GZMbNOcjSPsD7Fz8FdjX8eFd8oJllpmUiwgHQDNWyJzMaUV7WhtUC', function(err, res) {
    //     // res == true
    //     console.log('First Guess: ', res);
    // });
    // bcrypt.compare("veggies", '$2a$10$GZMbNOcjSPsD7Fz8FdjX8eFd8oJllpmUiwgHQDNWyJzMaUV7WhtUC', function(err, res) {
    //     // res = false
    //     console.log('Second Guess: ', res);
    // });

    // if(req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
    //     res.json(database.users[0]);
    //     //res.json("Success");
    // }
    // else {
    //     res.status(400).json('Error Logging In');
    // }

    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json('Incorrect form submission'); //cuz of return the execution ends here
    }

    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data=> {
            console.log(data[0]);
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if(isValid) {
                return db.select('*')
                    .from('users')
                    .where('email', '=', email)
                    .then(user => {
                        res.json(user[0]);
                    })
                    .catch(err => {
                        res.status(400).json('Unable to get user info');
                    })
            }
            else {
                res.status(400).json('Wrong User Credentials');
            }
        })
        .catch(err => {
            res.status(400).json('Wrong User Credentials');
        })

}

module.exports = {handleSignin}