import express from 'express';
import cors from 'cors';
import cheerio from 'cheerio';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(express.static('public'));

app.post('/get', (req, res) => {
    (async() => {
        try {
            const video = await getVideo(req.body.url);
            res.redirect(video)
        } catch(err) {
            console.log(err);
            res.redirect('/');
        }
    })();
});

const getVideo = async (url) => {
    const request = await fetch(url);
    const html = await request.text();

    const $ = cheerio.load(html);
    const videoSrc = $("meta[property='og:video']").attr("content");
    
    return videoSrc;
}

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});