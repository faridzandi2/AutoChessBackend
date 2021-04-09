Vue.component('unit', {
    props: {
        width: String,
        unit: Object,
        show_detail: {
            type: Boolean,
            default: false,
        }
    },
    template: '' +
        '<div v-bind:class="\'mdc-layout-grid__cell stretch-card mdc-layout-grid__cell--span-\' + width">' +
        '  <div class="mdc-card" style="background-color:#cda3fb; padding:10px;">' +
        '     <input v-if="show_detail" style="position:absolute; transform: scale(2);" type="checkbox" v-model="unit.checked"/>\n' +
        '    <div class="row">\n' +
        '        <div class="col-12 text-center">\n' +
        '            <h4>{{ unit.name }}</h4>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="row">\n' +
        '        <div class="col" style="width:90%;margin-right:5%;margin-left:5%;background-color: #aecefd;padding: 15%;border: 3px solid black;border-radius: 50%;">\n' +
        '            <img style="width: 100%;" class="unit-type-img"\n' +
        '                 v-bind:src="\'/static/Core/images/\' + unit.image + \'?v=1\'"/>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="row">\n' +
        '        <div class="col col-6 text-right"><i class="fas fa-bahai"></i></div>\n' +
        '        <div class="col col-6 text-left ">{{ unit.attack }}</div>\n' +
        '        <div class="col col-6 text-right"><i class="fas fa-shield-alt"></i></div>\n' +
        '        <div class="col col-6 text-left">{{ unit.defence }}</div>\n' +
        '        <div class="col col-6 text-right"><i class="fas fa-heart"></i></div>\n' +
        '        <div class="col col-6 text-left">{{ unit.curHealth }}</div>\n' +
        '    </div>' +
        '     <div v-if="show_detail" class="row">\n' +
        '           <div class="col col-12 text-center">\n' +
        '               <div class="mdc-card" style="padding:5px; background-color:gray" >\n' +
        '                   <h5>\n' +
        '                       {{ unit.state }}\n' +
        '                   </h5>\n' +
        '               </div>\n' +
        '       </div>\n' +
        '   </div>' +
        '  </div>' +
        '</div>'
})

var sidebar_app = new Vue({
    el: '#sidebar',
    data: {
        connect_class: "active",
        units_class: "",
        squads_class: "",
        battles_class: "",
        marketplace_class: "",
    },
    methods: {
        show_connect() {
            this.connect_class = "active";
            this.units_class = "";
            this.squads_class = "";
            this.battles_class = "";
            this.marketplace_class = "";
            connect_app.seen = true;
            my_units_app.seen = false;
            my_squads_app.seen = false;
            battles_app.seen = false;
            marketplace_app.seen = false;
        },
        show_units() {
            this.connect_class = "";
            this.units_class = "active";
            this.squads_class = "";
            this.battles_class = "";
            this.marketplace_class = "";
            connect_app.seen = false;
            my_units_app.seen = true;
            my_squads_app.seen = false;
            battles_app.seen = false;
            marketplace_app.seen = false;
        },
        show_squads() {
            this.connect_class = "";
            this.units_class = "";
            this.squads_class = "active";
            this.battles_class = "";
            this.marketplace_class = "";
            connect_app.seen = false;
            my_units_app.seen = false;
            my_squads_app.seen = true;
            battles_app.seen = false;
            marketplace_app.seen = false;
        },
        show_battles() {
            this.connect_class = "";
            this.units_class = "";
            this.squads_class = "";
            this.battles_class = "active";
            this.marketplace_class = "";
            connect_app.seen = false;
            my_units_app.seen = false;
            my_squads_app.seen = false;
            battles_app.seen = true;
            marketplace_app.seen = false;
            update_battles_app();

        },
        show_marketplace() {
            this.connect_class = "";
            this.units_class = "";
            this.squads_class = "";
            this.battles_class = "";
            this.marketplace_class = "active";
            connect_app.seen = false;
            my_units_app.seen = false;
            my_squads_app.seen = false;
            battles_app.seen = false;
            marketplace_app.seen = true;

        }
    }
});


var select_for_fight_app = new Vue({
    el: '#select_for_fight',
    data: {
        selected_units: [],
        selected_name: "N/A"
    },
    methods: {
    }
});

var account_info_app = new Vue({
    el: '#account_info',
    data: {
        seen: true,
        address: 'Waiting for connection ...',
        balance: 'Waiting for connection ...',
        tokens_balance: 'Waiting for connection ...',
    },
    methods: {
        get_free_tokens() {
            token_faucet(function () {
                update_token_balance()
                update_ether_balance();
            })
        },
        purchase_with_ether() {
            purchase_tokens("1", function () {
                update_token_balance()
                update_ether_balance();
            })
        }
    }
});

var connect_app = new Vue({
    el: '#connect',
    data: {
        seen: true,
    },
    methods: {
        connect() {
            ethereum.request({method: 'eth_requestAccounts'}).then(function (account) {
                provider = new ethers.providers.Web3Provider(ethereum)
                signer = provider.getSigner()

                signer.getAddress().then(function (address) {
                    signer_address = address;
                    account_info_app.address = signer_address.substr(0, 15) + "...";


                    sidebar_app.show_units();


                    setup_contracts();
                    update_unit_list();
                    update_my_squad_list();
                    update_marketplace_app();
                })
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
        sort_by: "sort by ...",
        purchase_name: '',
        options: [
            {text: 'Archer', value: '0'},
            {text: 'Warrior', value: '1'},
            {text: 'Cavalry', value: '2'}
        ]
    },
    methods: {
        sort_units() {
            this.units = general_sort(this.units, this.sort_by)
        },
        _auction(unit_indices) {
            let asking = parseInt(prompt("How much are you asking for?"))
            let title = parseInt(prompt("Auction title?"))
            start_auction(unit_indices, asking, title, function () {
                update_unit_list();
                update_marketplace_app();
            });
        },
        buy_unit() {
            buy_unit(this.selected, this.purchase_name, function () {
                update_unit_list();
                update_token_balance();
                update_ether_balance();
            })
        },
        get_selected() {
            let selected_units = []
            for (let unit of this.units) {
                if (unit.checked) {
                    selected_units.push(unit.index.toNumber());
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
            let my_squad_cookie = getCookie("my_squads");
            if (!my_squad_cookie) {
                my_squad_cookie = "{}"
            }
            let name = prompt("Enter a name for your sqaud:")
            let data = JSON.parse(my_squad_cookie)
            data[name] = selected;
            setCookie("my_squads", JSON.stringify(data), 1000)
            update_undeployed_squad_list();

        }
    }
})

var my_squads_app = new Vue({
    el: "#my_squads",
    data: {
        seen: false,
        undeployed_squads_sort_by: "sort by ...",
        deployed_squads_sort_by: "sort by ...",
        retired_squads_sort_by: "sort by ...",

        undeployed_squads: [],
        deployed_squads: [],
        retired_squads: []
    },
    methods: {
        dissolve_squad(squad_name) {
            let my_squad_cookie = getCookie("my_squads");
            if (!my_squad_cookie) {
                my_squad_cookie = "{}"
            }
            let data = JSON.parse(my_squad_cookie)
            delete data[squad_name]
            setCookie("my_squads", JSON.stringify(data), 1000)
            update_undeployed_squad_list();
        },
        select_for_fight(squad_name) {
            let my_squad_cookie = getCookie("my_squads");
            if (!my_squad_cookie) {
                my_squad_cookie = "{}"
            }
            let data = JSON.parse(my_squad_cookie);

            select_for_fight_app.selected_units = data[squad_name];
            select_for_fight_app.selected_name = squad_name;

            sidebar_app.show_battles();
        },
        random_challenge(squad_name) {

        },
        sort_undeployed_squads(array_name) {
            this.undeployed_squads = general_sort(this.undeployed_squads, this.undeployed_squads_sort_by)
        },
        sort_deployed_squads(array_name) {
            this.deployed_squads = general_sort(this.deployed_squads, this.deployed_squads_sort_by)
        },
        sort_retired_squads(array_name) {
            this.retired_squads = general_sort(this.retired_squads, this.retired_squads_sort_by)
        }
    }
})

var battles_app = new Vue({
    el: "#battles",
    data: {
        seen: false,
        squads: []
    },
    methods: {
        challenge(tier_index) {
            let selected = select_for_fight_app.selected_units;
            if (selected.length === 0) {
                alert("Please select some units");
                return;
            }
            targeted_challenge(selected, tier_index, () => {
                my_squads_app.dissolve_squad(select_for_fight_app.selected_name)
                update_my_squad_list()
                update_unit_list()
                update_battles_app()
            });

        }
    }
})

var marketplace_app = new Vue({
    el: '#marketplace',
    data: {
        seen: false,
        my_auctions: [],
        others_actions: []
    },
    methods: {
        buy(type) {
            let name = prompt("What do you want to name this unit?");
            buy_unit(type, name, function () {
                update_unit_list();
                update_token_balance();
                update_ether_balance();
                sidebar_app.show_units();
            })
        },
        is_mine(addr) {
            return addr === signer_address;
        },
        bid(my_bid, index) {
            bid(index, my_bid, function () {
                update_marketplace_app()
            })
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

// my_squads_app.squads = [squad1, squad2]

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

// my_auctions_app.auctions = [auction1, auction2]