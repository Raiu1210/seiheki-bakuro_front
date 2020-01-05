const functions = require('firebase-functions');


exports.bigben = functions.https.onRequest((req, res) => {
    const SITEURL = "https://seiheki-bakuro.firebaseapp.com/#/"
    const TITLE = "性癖暴露カード"
    const DESCRIPTION = "西壁を暴露するカードを作成します"

    const image_name = req.query['image_name']
    const IMAGE = "https://firebasestorage.googleapis.com/v0/b/seiheki-bakuro.appspot.com/o/" + image_name + "?alt=media"
  
    res.status(200).send(`<!doctype html>
      <head>
        <title>Time</title>
        <meta property="og:title" content="${TITLE}">
        <meta property="og:image" content="${IMAGE}">
        <meta property="og:description" content="${DESCRIPTION}">
        <meta property="og:url" content="${SITEURL}">
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="${TITLE}">
        <meta name="twitter:site" content="〇〇〇〇〇〇">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${TITLE}">
        <meta name="twitter:image" content="${IMAGE}">
        <meta name="twitter:description" content="${DESCRIPTION}">
      </head>
      <body>
        ${'BONG '.repeat(3)}
      </body>
    </html>`);
  });