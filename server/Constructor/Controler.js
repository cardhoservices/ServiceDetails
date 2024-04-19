const Subscription = require('../Modules/Subscription')

const getData = async (req, res) => {
    try {
        const data = await Subscription.find({});
        res.send(data)
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getData
}