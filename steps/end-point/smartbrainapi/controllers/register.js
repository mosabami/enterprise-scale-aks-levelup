const tableName = 'users'
const handleRegister = (req,res,db,bcrypt) => {
    const { email, name, password} = req.body
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    // bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
    //     console.log(res)
    //     // if res == true, password matched
    //     // else wrong password
    //     })
    if (!email || !name || !password) {
        return res.status(400).json('incorrect form submision')
    }
    db.transaction(trx => {
        trx.insert({
            hash:hash,
            email:email
        }).into('login')
        .returning('email')
        .then(loginEmail => {
            return trx(tableName)
                .returning('*')
                .insert({
                    email: loginEmail[0],
                    name: name,
                    joined: new Date()
                }).then(user => {
                    res.json(user[0])
                })
        }).then(trx.commit).catch(trx.rollback)
    }).catch(err=> res.status(400).json('unable to register'))
}
module.exports = {
    handleRegister:handleRegister
}
