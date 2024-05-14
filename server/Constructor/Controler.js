const Subscription = require('../Modules/Subscription')

const getData = async (req, res) => {

    try {
        await Subscription.find({ Phone: req.params.Phone })
        .then(data => {
            res.json(data[0])
        })
        .catch(err => {
            res.json("Phone Number not found")
        })
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getData
}