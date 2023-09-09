const Url = require('../models/url');
const shortid = require('shortid');

const GenShort = async (req, res) => {
    const body = req.body;
    if (!body.longUrl) {
        return res.render("error", {
            message: 'An error occurred while generating the short URL'
        });
    }

    try {
        const shortId = shortid.generate();
        const newUrl = await Url.create({
            shortId: shortId,
            longUrl: body.longUrl,
            visitHistory: []
        });

        res.render("home",{ id: newUrl.shortId });
    } catch (error) {
        console.error(error);
        return res.render("error", {
            message: 'An error occurred while generating the short URL'
        });
        
    }
};

module.exports = GenShort;

