    var account_info_app = new Vue({
        el: '#app',
        data: {
            seen: false,
            address: 'Not connected',
            balance: 'not known',
            tokens_balance: 'not known',
        }
    });

    var auction_app = new Vue({
        el: '#units-auction',
        data: {
            seen: false,
            units: [
                {text: "Unit", number: 1},
                {text: "Unit", number: 2},
                {text: "Unit", number: 3},
                {text: "Unit", number: 4},
            ]
        }
    })