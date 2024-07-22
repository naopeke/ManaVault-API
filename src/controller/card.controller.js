const { client } = require('../database');
const { Card } = require('../models/user');
const axios = require('axios');

const fetchCardData = async (req, res, next) => {
    if (req.query.cardName) {
        // GET https://api.scryfall.com/cards/named?fuzzy=aust+com  hay que cambiar espacio por '+'

        const cardName = req.query.cardName.split(' ').join('+');
        try {
            const response = await axios.get(`https://api.scryfall.com/cards/named?fuzzy=${encodeURI(cardName)}`);
            const cardData = {
                id: response.data.id,
                oracle_id: response.data.oracle_id,
                name: response.data.name,
                printed_name: response.data.printed_name,
                image_uris: response.data.image_uris.normal, 
                mana_cost: response.data.mana_cost,
                type_line: response.data.type_line,
                oracle_text: response.data.oracle_text,
                printed_text: response.data.printed_text,
                color_identity: response.data.color_identity,
                legalities: response.data.legalities,
                prices: response.data.prices.eur,                
                set_name: response.data.set_name,
                set_type: response.data.set_type,
            };
            res.json(cardData); // mandar en formato json
        } catch (err) {
            console.log('Error fetching', err);
            res.status(500).json({error: true, code: 500, message: 'Error fetching card data'});
        }
        } else {
        res.status(404).json({error: true, code: 404, message: 'Card not found'});
    }
};