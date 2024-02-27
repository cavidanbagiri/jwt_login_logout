

const tryCatch = async (func) => (req, res, next) => {
    try{
        func(req, res, next)
    }
    catch(err){
        next(err);
    }
}

module.exports = tryCatch