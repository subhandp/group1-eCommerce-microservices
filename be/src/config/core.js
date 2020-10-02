const midtransClient = require('midtrans-client'); // use this if installed via NPM

// initialize core api client object
const core = new midtransClient.CoreApi({
    isProduction : false,
    serverKey : 'SB-Mid-server-qJ30u7Y3CSQoXLtpTwCYdk1J',
    clientKey : 'SB-Mid-client-9KnE5kIVjpIVsDmq'
});

module.exports = core