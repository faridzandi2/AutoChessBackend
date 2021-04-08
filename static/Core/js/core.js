var signer;
var signer_address;
var contract;
var store_token_contract;
var provider;

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function sendEther() {
    const tx = signer.sendTransaction({
        to: "0x8Ea3bFF9dEa493d819551a795d801EbeBB777257",
        value: ethers.utils.parseEther("1.0")
    }).then(console.log);
}

function setup_contracts() {
    update_ether_balance();
    setup_game_contract();
    get_provider_address().then(function (provider_address) {
        store_token_address = provider_address;
        setup_store_token_contract();
        update_token_balance();
    })
}

function update_token_balance() {
    get_token_balance().then(function (balance) {
        account_info_app.tokens_balance = ethers.utils.formatUnits(balance, 0);
    });
}


function update_marketplace_app() {
    get_all_auctions().then(function (infos) {
        marketplace_app.my_auctions = infos;
    })
}

function update_unit_list() {
    get_my_units().then((unit_infos) => {
        my_units_app.units = unit_infos;
    })
}

function update_my_squad_list() {

    update_undeployed_squad_list();

    get_my_squads().then((squad_lists) => {
        get_squad_infos(squad_lists).then((infos) => {
            my_squads_app.squads = infos;
        });
    });
}

function update_undeployed_squad_list() {
    let my_squads_cookie = getCookie("my_squads");
    if (my_squads_cookie) {
        let data = JSON.parse(my_squads_cookie);
        my_squads_app.undeployed_squads = [];

        for (const prop in data) {
            get_units_info(data[prop]).then((units) => {
                let total_attack = 0;
                console.log(units);
                for (unit of units) {
                    total_attack += unit.attack;
                }
                my_squads_app.undeployed_squads.push({
                    name: prop,
                    index: 0,
                    unitCount: units.length,
                    stashedTokens: 0,
                    state: "stored",
                    deployTime: 0,
                    totalAttack: total_attack,
                    units: units
                })
            });

        }
    }
}

function update_battles_app() {
    get_squads_in_all_tiers().then((squad_lists) => {
        get_squad_infos(squad_lists).then((infos) => {
            battles_app.squads = infos;
        });
    });
}

function update_ether_balance() {
    provider.getBalance(signer_address).then((balance) => {
        account_info_app.balance = ethers.utils.formatEther(balance)
    });
}

function setup_game_contract() {
    contract = new ethers.Contract(
        contract_address, contract_abi, provider
    ).connect(signer);
}

function setup_store_token_contract() {
    store_token_contract = new ethers.Contract(
        store_token_address, store_token_abi, provider
    ).connect(signer);
}

