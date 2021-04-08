async function get_provider_address() {
    return await contract.ProviderAddress();
}

async function get_token_balance() {
    return await store_token_contract.balanceOf(signer_address);
}

async function token_faucet(func) {
    let tx = await store_token_contract.tokenFaucet();
    tx.wait().then(func)
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
    let my_squad_count = await contract.ownerToSquadCount(signer_address);

    let my_squads = [];
    for (let i = 0; i < my_squad_count; i++) {
        try {
            let index = await contract.ownerToSquadIndex(signer_address, i);
            console.log(index);
            my_squads.push(index);
        } catch (err) {
        }
    }
    return await get_squad_infos(my_squads);
}

async function get_squad_infos(squad_indices) {
    let squad_infos = [];

    for (let squad of squad_indices) {
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
    squad_info.units = await get_squad_units_info(squad_index);
    return squad_info;
}

async function get_squad_units_info(squad_index) {
    let units = await contract.get_squad_units(squad_index);
    return get_units_info(units);
}


async function get_units_info(units) {
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
        index: unit_index,
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

async function get_squads_in_all_tiers() {
    let result = []
    for (let i = 0; i <= 4; i++) {
        let squad_indices = await contract.getSquadIdsInTier(i);
        let number_squad_indices = [];
        for (let index of squad_indices) {
            number_squad_indices.push(index.toNumber())
        }
        result = result.concat(number_squad_indices)
    }
    return result;
}

async function get_all_auctions() {
    let infos = [];
    let auction_count = await contract.get_auction_count()
    for (let i = 0; i < auction_count; i++) {
        let auction = await contract._auctions(i);
        let assets = await contract.get_auction_assets(i);
        let assets_info = []
        for (let asset of assets) {
            assets_info.push(await get_unit_info(asset))
        }
        let info = {
            index: i,
            highestBid: auction.highestBid.toNumber(),
            highestBidder: auction.highestBidder,
            host: auction.host,
            name: "plchldr",
            assets: assets_info,
            asset_count: assets_info.length,
            highestBidText: "Default Bid",
            endTime: current.getHours() + ":" + current.getMinutes(),
            bid_textbox_model: parseInt(auction.highestBid) + 10
        }
        infos.push(info);
    }
    return infos;
}

async function get_my_auctions() {
    //
}

async function start_auction(unit_indices, asking, func) {
    let tx = await contract.startAuction(unit_indices, asking);
    tx.wait().then(func);
}

async function withdraw_auction(unit_indices, asking) {
    let tx = await contract.withdrawAuction(unit_indices, asking);
    tx.wait().then(async () => {

    })
}


async function bid(auction_id, value, func) {
    let tx = await contract["bid(uint256,uint256)"](auction_id, value);
    tx.wait().then(func);
}

async function buy_unit(type, name, func) {
    let tx = await contract["buyUnit(uint8,string)"](type, name);
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


async function targeted_challenge(units, target, func) {
    let tx = await contract.targetedChallenge(units, target);
    tx.wait().then(func)
}





