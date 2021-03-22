exports.test = (req, res, next) => {
    var {
        body
    } = req;

    console.log(body)
    const io = require('socket.io-client').connect('http://13.76.41.221:4001/', {
            transports: ["websocket", "polling"],
            withCredential: false
        })

    io.emit('clientResponeSteam', 'test API SUCCESS')
}