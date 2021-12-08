const tableName = 'users'
const imageCount = (req,res,db) => {
    const  {id } = req.body
    db(tableName).where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entry => res.json(entry[0]))
    .catch(err => res.status(400).json('could not get entries'))
}

const imageRank = (req,res,db) => {
    const  {id } = req.body
    db(tableName).where('id', '=', id).then(data => console.log(data))
    db.schema.raw(`select rank,id from (SELECT id, entries, RANK () OVER (ORDER BY entries DESC) rank FROM ${tableName}) a where id = ${id}`)
    .then(data=> res.json(data.rows[0].rank))
    .catch(err => res.status(400).json('could not get rank'))
}

module.exports = { imageCount,imageRank }