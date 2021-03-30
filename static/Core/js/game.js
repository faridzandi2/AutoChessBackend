async function get_provider_address() {
    return await contract.ProviderAddress();
}

async function get_token_balance() {
    return await store_token_contract.balanceOf(signer_address);
}

async function token_faucet(func) {
    let tx = await store_token_contract.tokenFaucet();
    tx.wait().then(function () {
        func();
    })
}

async function purchase_tokens(eths, func) {
    let tx = await store_token_contract.purchaseTokens({value: ethers.utils.parseEther(eths)});
    tx.wait().then(function () {
        func();
    })
}

async function get_my_units_count() {
    return await contract.balanceOf(signer_address);
}

async function get_my_units() {
    let unit_count = await contract.ownerToUnitCount(signer_address);

    let unit_infos = [];
    for (let i = 0; i < unit_count; i++) {
        let unit_index = await contract.ownerToUnitIndices(signer_address, i);
        let unit_info = await get_unit_info(unit_index);
        unit_infos.push(unit_info);
    }
    return unit_infos;
}


async function get_my_squads() {
    let my_squads = await contract.ownerToSquadIndices(signer_address);
    let squad_infos = [];

    for (let squad of my_squads) {
        let squad_info = await get_squad_info(squad);
        squad_infos.push(squad_info);
    }

    return squad_infos;
}


async function get_squads_in_tier() {
    let tier_squads = await contract.getSquadIdsInTier(signer_address);
    let squad_infos = [];

    for (let squad of tier_squads) {
        let squad_info = await get_squad_info(squad);
        squad_infos.push(squad_info);
    }

    return squad_infos;
}


async function get_squad_info(squad_index) {
    let squad = await contract.squads(squad_index);
    let m = ["Retired", "TierOne", "TierTwo", "TierThree", "TierFour"]

    let squad_info = {
        index: squad_index,
        unitCount: squad.unitCount,
        stashedTokens: squad.stashedTokens,
        state: m[squad.state],
        deployTime: squad.deployTime,
        totalAttack: squad.totalAttack,
    }
    squad_info.units = get_squad_units_info(squad_index);
    return squad_info;
}

async function get_squad_units_info(squad_index) {
    let units = await contract.get_squad_units(squad_index);
    let unit_infos = [];

    for (let unit of units) {
        let unit_info = await get_unit_info(unit);
        unit_infos.push(unit_info);
    }

    return unit_infos;
}

async function get_unit_info(unit_index) {
    let unit = await contract.units(unit_index);
    let unit_state = await contract.unitIndexToState(unit_index);
    let m = ["archer", "warrior", "cavalry"]
    let m2 = ["Deployed", "Dead", "Auctioning", "Default", "Promised"]

    return {
        index: unit_index.toNumber(),
        attack: unit.attack,
        curHealth: unit.curHealth,
        defence: unit.defence,
        level: unit.level,
        maxHealth: unit.maxHealth,
        name: unit.name,
        utype: m[unit.utype],
        image: m[unit.utype] + ".png",
        state: m2[unit_state],
        checked: false,
    };
}


async function get_all_auctions() {
    //
}

async function get_my_auctions() {
    //
}

async function start_auction(unit_indices, asking) {
    let tx = await contract.startAuction(unit_indices, asking);
    tx.wait().then(async () => {

    })
}

async function withdraw_auction(unit_indices, asking) {
    let tx = await contract.withdrawAuction(unit_indices, asking);
    tx.wait().then(async () => {

    })
}


async function bid(auction_id, value) {
    let tx = await contract.bid(auction_id, value);
    tx.wait().then(async () => {

    })
}

async function buy_unit(type, name, func) {
    let tx = await contract._buyUnit(type, name);
    tx.wait().then(() => {
        func()
    })
}

async function make_squad(units) {
    let tx = await contract.randomChallenge(units);
    tx.wait().then(async () => {

    })
}

async function random_challenge(units) {
    let tx = await contract.randomChallenge(units);
    tx.wait().then(async () => {

    })
}


async function targeted_challenge(units, target) {
    let tx = await contract.targetedChallenge(units, target);
    tx.wait().then(async () => {

    })
}





