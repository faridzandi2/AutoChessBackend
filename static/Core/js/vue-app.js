var account_info_app = new Vue({
    el: '#account_info',
    data: {
        seen: false,
        address: 'loading ...',
        balance: 'loading ...',
        tokens_balance: 'loading ...',
    },
    methods: {
        get_free_tokens() {
            token_faucet(function () {
                get_token_balance().then(function (balance) {
                    account_info_app.tokens_balance = ethers.utils.formatUnits(balance, 0);
                });
            })
        },
        purchase_with_ether() {
            purchase_tokens("1", function () {
                get_token_balance().then(function (balance) {
                    account_info_app.tokens_balance = ethers.utils.formatUnits(balance, 0);
                });
                get_ether_balance();
            })
        }
    }
});

var my_units_app = new Vue({
    el: "#my_units",
    data: {
        seen: false,
        units: [],
        selected: '0',
        purchase_name: '',
        options: [
            {text: 'Archer', value: '0'},
            {text: 'Warrior', value: '1'},
            {text: 'Cavalry', value: '2'}
        ]
    },
    methods: {
        _auction(unit_indices) {
            let asking = parseInt(prompt("How much are you asking for?"))
            alert("auctioning " + unit_indices + " for " + asking);
            start_auction(unit_indices, asking).then(function () {

            });
        },
        buy_unit() {
            buy_unit(this.selected, this.purchase_name, function(){
                update_unit_list();
                update_token_balance();
                update_ether_balance();
            })
        },
        get_selected() {
            let selected_units = []
            for (let unit of this.units) {
                if (unit.checked) {
                    selected_units.push(unit.index);
                }
            }
            return selected_units;
        },
        auction(unit_index) {
            this._auction([unit_index]);
        },
        auction_selected() {
            let selected = this.get_selected()
            if (selected.length === 0) {
                alert("Please select some units");
                return;
            }
            this._auction(selected)
        },
        squad_selected() {
            let selected = this.get_selected()
            if (selected.length === 0) {
                alert("Please select some units");
                return;
            }
            make_squad(selected).then(function () {

            })
        }

    }
})

var my_squads_app = new Vue({
    el: "#my_squads",
    data: {
        seen: false,
        squads: []
    },
    methods: {
        withdraw_squad(squad_index) {

        }
    }
})

var my_auctions_app = new Vue({
    el: '#my-auctions',
    data: {
        seen: false,
        auctions: []
    },
    methods: {
        get_col_count(num) {
            return Math.max(3, num)
        }
    }
})

////////////////////////////////////////////////////////////////////////////////
////////////////////////////                       /////////////////////////////
////////////////////////////   insert dummy data   /////////////////////////////
////////////////////////////                       /////////////////////////////
////////////////////////////////////////////////////////////////////////////////

let unit1 = {
    index: 1,
    attack: 2,
    curHealth: 10,
    defence: 2,
    level: 2,
    maxHealth: 20,
    name: "qwer",
    utype: "archer",
    image: "archer.png",
    state: "Deployed",
    checked: false,
}
let unit2 = {
    index: 2,
    attack: 2,
    curHealth: 16,
    defence: 2,
    level: 2,
    maxHealth: 18,
    name: "mike",
    utype: "cavalry",
    image: "cavalry.png",
    state: "Deployed",
    checked: false,
}
let unit3 = {
    index: 3,
    attack: 2,
    curHealth: 2,
    defence: 2,
    level: 2,
    maxHealth: 20,
    name: "fred",
    utype: "warrior",
    image: "warrior.png",
    state: "Deployed",
    checked: false,
}
let unit4 = {
    index: 4,
    attack: 2,
    curHealth: 18,
    defence: 2,
    level: 2,
    maxHealth: 20,
    name: "fred",
    utype: "warrior",
    image: "warrior.png",
    state: "Deployed",
    checked: false,
}

squad1 = {
    index: 1,
    unitCount: 3,
    stashedTokens: 10,
    state: "asdf",
    deployTime: "sdf",
    totalAttack: "20",
    units: [unit1, unit2, unit3],
}
squad2 = {
    index: 2,
    unitCount: 4,
    stashedTokens: 10,
    state: "asdf",
    deployTime: "sdf",
    totalAttack: "20",
    units: [unit1, unit3, unit2, unit4],
}

my_squads_app.squads = [squad1, squad2]

let current = new Date()
auction1 = {
    highestBid: 0,
    highestBidder: "someone",
    host: "someone",
    name: "jack",
    assets: [unit1],
    asset_count: 1,
    highestBidText: "Default Bid",
    endTime: current.getHours() + ":" + current.getMinutes(),
}

auction2 = {
    highestBid: 0,
    highestBidder: "someone",
    host: "someone",
    name: "jack",
    assets: [unit1, unit2],
    asset_count: 2,
    highestBidText: "Default Bid",
    endTime: current.getHours() + ":" + current.getMinutes(),
}

my_auctions_app.auctions = [auction1, auction2]