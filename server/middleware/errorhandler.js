function errHandler(err, req, res, next) {
    if (err.name == 'SequelizeValidationError') {
        let valErr = []
        for (let i = 0; i < err.errors.length; i++) {
            valErr.push(err.errors[i].message)
        }
        res.status(400).json({ message: valErr })
    } else if (err.name == 'customErr') {
        res.status(401).json({ message: err.message })
    }
}

module.exports = errHandler;