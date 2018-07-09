const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get('/', (req, res) => {
    var cardsLength = cards.length;
    var randomCard = Math.floor(Math.random()*cardsLength);
    res.redirect(`/cards/${randomCard}?side=question`);

})


router.get('/:id', (req, res) => {
    const { side } = req.query;
    const { id } = req.params;
    const text = cards[id][side];
    const { hint } = cards[id];
    
    const templateData = { id, text };

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