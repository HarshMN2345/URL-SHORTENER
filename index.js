const express = require('express');
const connectmongo = require('./connect');
const Url = require('./models/url');
const shortId = require('shortid');

connectmongo('mongodb://127.0.0.1:27017/short-url').then(() => {
    console.log('connected to mongo');
});


const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set("view engine","ejs");
app.set("views","./views")
const port=8000;

const urlRoutes=require('./routes/url');
const shortid = require('shortid');
app.use("/url",urlRoutes);
app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    
    try {
        const urlDocument = await Url.findOne({ shortId: shortId });

        if (!urlDocument) {
            // Handle the case where the short ID doesn't exist in your database
            return res.render("error", {
                message: 'An error occurred while generating the short URL as the url does not exist'
            });
        }

        // Perform the redirection by sending a 302 status code and the long URL in the Location header
        res.redirect(302, urlDocument.longUrl);
    } catch (error) {
        // Handle any errors that may occur during database query or redirection
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
});
app.get('/',async (req,res)=>{
    const allUrls=await Url.find({});
    res.render("home",{
        urls:allUrls,
        id:shortId
    });
})
app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
})
