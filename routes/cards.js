const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get('/', (req, res) => {
    var cardsLength = cards.length;
    var randomCard = Math.floor(Math.random()*cardsLength);
    res.redirect(`/cards/${randomCard}`);
});


router.get('/:id', (req, res) => {
    const { side } = req.query;
    const { id } = req.params;
    if(!side)
    {

        return res.redirect(`/cards/${id}?side=question`);
    }
    const name = req.cookies.username;



    const text = cards[id][side];
    const { hint } = cards[id];
    
    const templateData = { id, text, name};

    if (side === 'question') {
        templateData.sideToShow = 'answer';
        templateData.hint = hint;
    }else if(side === 'answer')
    {
        templateData.sideToShow = 'question';
    }

    res.render('card', templateData);
});

module.exports = router;