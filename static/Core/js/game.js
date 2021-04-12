async function get_provider_address() {
    return await contract.CurrencyProvider();
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

async function get_unit_info(unit_index) {
    let unit = await contract.getToken(unit_index);
    let unit_state = await contract.getUnitState(unit_index);
    let m = ["archer", "warrior", "cavalry"]
    let m2 = ["Dead","Deployed","Auctioning","Default","Promised"]

    return {
        index: unit_index,
        name: unit.name,
        defence: unit.defence,
        attack: unit.power,
        curHealth: unit.health,
        level: unit.level,
        utype: m[unit.utype],
        image: m[unit.utype] + ".png",
        state: m2[unit_state],
        checked: false,
    };
}

async function get_units_info(unit_indices) {
    let unit_infos = [];

    for (let unit of unit_indices) {
        let unit_info = await get_unit_info(unit);
        unit_infos.push(unit_info);
    }

    return unit_infos;
}


async function get_squad_info(squad_index) {
    let m = ["Unused","Retired","TierOne","TierTwo","TierThree","TierFour"]

    let squad = await contract.getSquad(squad_index);
    let squad_state = await contract.getSquadState(squad_index);
    let squad_owner = await contract.getSquadOwner(squad_index);
    let unit_infos = await get_units_info(squad.unitIds);

    let total_attack = 0;
    for(let i of unit_infos){
        total_attack += i.attack;
    }

    return {
        index: squad_index,
        owner: squad_owner,
        unitCount: unit_infos.length,
        stashedTokens: squad.stashedTokens,
        state: m[squad_state], // TODO: fix this
        deployTime: squad.deployTime,
        totalAttack: total_attack,
        units: unit_infos,
    };
}

async function get_squads_info(squad_indices) {
    let squad_infos = [];

    for (let squad of squad_indices) {
        let squad_info = await get_squad_info(squad);
        squad_infos.push(squad_info);
    }

    return squad_infos;
}

async function get_my_units() {
    let unitIds = await contract.tokensOfOwner(signer_address);
    return await get_units_info(unitIds);
}

async function get_my_units_count() {
    return await contract.balanceOf(signer_address);
}

async function get_my_squads() {
    let squadIds = await contract.squadsOf(signer_address);
    return await get_squads_info(to_number(squadIds));
}


async function get_squads_in_tier(tier) {
    let squadIds = await contract.getSquadIdsInTier(tier);
    let squad_infos = await get_squads_info(to_number(squadIds));
    for (let i = 0; i < squad_infos.length; i++){
        squad_infos[i].tier_index = i;
    }
    return squad_infos;
}


async function targeted_challenge(units, target, func) {
    console.log(units, target);
    let tx = await contract.targetedChallenge(units, target);
    tx.wait().then(func)
}

async function random_challenge(units, func) {
    let tx = await contract.randomChallenge(units);
    tx.wait().then(func)
}

async function get_all_auctions() {
    let infos = [];
    let auction_count = await contract.getAuctionCount()
    for (let i = 0; i < auction_count; i++) {
        let auction = await contract._auctions(i);
        let assets = await contract.getAssetIds(i);
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

async function start_auction(unit_indices, asking, title, func) {
    let tx = await contract.startAuction(unit_indices, asking, title);
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