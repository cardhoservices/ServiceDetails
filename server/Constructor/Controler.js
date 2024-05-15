const Subscription = require('../Modules/Subscription')

const getData = async (req, res) => {

    try {
        await Subscription.find({ Phone: req.params.Phone })
        .then(data => {
            if(data){
                res.json(data[0])
            }
            else{
                res.status(400).send("Entries doesn't match")
            }
        })
        .catch(err => {
            console.log(err)
        })
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getData
}