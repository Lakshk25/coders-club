const success = (statusCode, result) => {
    return {
        status: 'ok',
        statusCode,
        result
    }
}

const failure = (statusCode, result) => {
    return {
        status: 'fail',
        statusCode,
        result
    }
}

module.exports = {
    success, failure
}