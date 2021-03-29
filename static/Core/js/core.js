var signer;
var signer_address;
var contract;
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
            get_ether_balance();


            setup_contract();
            // get_token_balance();

            my_units_app.seen = true;
            auction_app.seen = true;
        })
    })
});

async function get_ether_balance() {
    let balance = await provider.getBalance(signer_address);
    account_info_app.balance = ethers.utils.formatEther(balance)
}

function sendEther() {
    const tx = signer.sendTransaction({
        to: "0x8Ea3bFF9dEa493d819551a795d801EbeBB777257",
        value: ethers.utils.parseEther("1.0")
    }).then(console.log);
}

function setup_contract() {
    contract = new ethers.Contract(
        contract_address, contract_abi, provider
    ).connect(signer);
}

async function get_token_balance() {
    let balance = await contract.getBalance(signer_address);
    account_info_app.tokens_balance = ethers.utils.formatUnits(balance, 0);
}
