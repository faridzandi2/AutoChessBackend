var signer;
var signer_address;
var contract;
var store_token_contract;
var provider;

const ethereumButton = document.querySelector('.enableEthereumButton');

ethereumButton.addEventListener('click', () => {
    ethereum.request({method: 'eth_requestAccounts'}).then(function (account) {
        provider = new ethers.providers.Web3Provider(ethereum)
        signer = provider.getSigner()

        signer.getAddress().then(function (address) {
            signer_address = address
            account_info_app.address = signer_address;


            account_info_app.seen = true;
            my_units_app.seen = true;
            my_squads_app.seen = true;
            deployed_squads_app.seen = true;
            my_auctions_app.seen = true;


            setup_contracts();

            update_unit_list();
            update_my_squad_list();
            update_deployed_squad_list();
            update_auction_list();
        })
    })
});


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


function update_auction_list() {
    get_all_auctions().then(function (infos){
        my_auctions_app.auctions = infos;
    })
}

function update_unit_list() {
    get_my_units().then((unit_infos) => {
        my_units_app.units = unit_infos;
    })
}

function update_my_squad_list() {
    get_my_squads().then((squad_lists) => {
        get_squad_infos(squad_lists).then((infos) => {
            my_squads_app.squads = infos;
        });
    });
}

function update_deployed_squad_list() {
    get_squads_in_all_tiers().then((squad_lists) => {
        get_squad_infos(squad_lists).then((infos) => {
            deployed_squads_app.squads = infos;
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

