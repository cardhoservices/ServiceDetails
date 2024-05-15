const Subscription = require('../Modules/Subscription')

const getData = async (req, res) => {
    try {
        const data=await Subscription.findOne({ Phone: req.params.Phone })
        if (data) {
            res.json(data[0])
        }
        else {
            res.status(400).send('Your Phone Numbe is not register. /n To Register Please Contact on xxxxxxxxxx')
        }
    }
    catch{
        console.log(error);
    }
}
module.exports = {
    getData
}