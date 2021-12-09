const tableName = 'users'
const handleProfile = (req,res,db) => {
    const { id } = req.params ;
    console.log('id is', id)
    db.select("*").from(tableName).where({id})
    .then(user =>{
        if (user.length) {
            res.json(user[0])
        } else {
            res.json('user not found')
        }
    }).catch(err => res.status(400).json('error getting user'))
}

module.exports = { handleProfile }