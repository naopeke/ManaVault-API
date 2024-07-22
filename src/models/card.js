class Card {
    constructor(
        // card_id, api_id, user_id, image_uris, name, printed_name, type_line, oracle_text, printed_text, color_identity, legalities, prices, set_name, set_type, quantity, deckCard_id
        user_id = null,
        card_id = null,
        id = '',
        oracle_id = '',
        name = '',
        printed_name = '',
        image_uris = '',
        mana_cost = 0,
        type_line = '',
        oracle_text = '',
        printed_text = '',
        color_identity = [],
        legalities = {},
        prices = 0,
        set_name = '',
        set_type = '',
        quantity = 0,
        deckCard_id = null
    ){
        this.user_id = user_id;
        this.card_id = card_id;
        this.id = id;
        this.oracle_id = oracle_id;
        this.name = name;
        this.printed_name = printed_name;
        this.image_uris = image_uris;
        this.mana_cost = mana_cost;
        this.type_line = type_line;
        this.oracle_text = oracle_text;
        this.printed_text = printed_text;
        this.color_identity = color_identity;
        this.legalities = legalities;
        this.prices = prices;
        this.set_name = set_name;
        this.set_type = set_type;
        this.quantity = quantity;
        this.deckCard_id = deckCard_id;
    }
}

module.exports =  { User } ;