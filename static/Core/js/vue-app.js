var account_info_app = new Vue({
    el: '#app',
    data: {
        seen: false,
        address: 'loading ...',
        balance: 'loading ...',
        tokens_balance: 'loading ...',
    }
});

var my_units_app = new Vue({
    el: "#my_units",
    data: {
        seen: false,
        units: [
            {
                attack: 2,
                curHealth: 10,
                defence: 2,
                level: 2,
                maxHealth: 20,
                name: "qwer",
                utype: "archer",
                image: "archer.png",
                state: "Deployed"
            }, {
                attack: 2,
                curHealth: 16,
                defence: 2,
                level: 2,
                maxHealth: 18,
                name: "mike",
                utype: "cavalry",
                image: "cavalry.png",
                state: "Deployed"
            }, {
                attack: 2,
                curHealth: 2,
                defence: 2,
                level: 2,
                maxHealth: 20,
                name: "fred",
                utype: "warrior",
                image: "warrior.png",
                state: "Deployed"
            },
        ]
    }
})

var auction_app = new Vue({
    el: '#units-auction',
    data: {
        seen: false,
        units: [
            {text: "Unit", number: 1, class: 'col-1'},
            {text: "Unit", number: 1, class: 'col-2'},
            {text: "Unit", number: 1, class: 'col-3'},
            {text: "Unit", number: 1, class: 'col-4'},
            {text: "Unit", number: 1, class: 'col-5'},
            {text: "Unit", number: 1, class: 'col-6'},
            {text: "Unit", number: 1, class: 'col-7'},
        ]
    }
})