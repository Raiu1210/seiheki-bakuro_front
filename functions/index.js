const functions = require('firebase-functions');


exports.bigben = functions.https.onRequest((req, res) => {
    const SITEURL = "https://seiheki-bakuro.firebaseapp.com/#/"
    const TITLE = "性癖暴露カード"
    const DESCRIPTION = "性癖を暴露するカードを作成します"

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
        <style>
          .link-to-home {
            display: block;
            margin-left: auto;
            margin-right: auto;
            padding: 0.5em 1em;
            text-decoration: none;
            border-radius: 4px;
            color: #ffffff;
            background-image: linear-gradient(45deg, rgb(253, 0, 241) 0%, #ff95e8 100%);
            box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.29);
            border-bottom: solid 3px #c58668;
            width: 500px;
            height: 100px;
            font-size: 36px;
            text-align: center
          }
        </style>
      </head>
      <body>
        
        <script>
          location.href="https://seiheki-bakuro.firebaseapp.com";
        </script>
      </body>
    </html>`);
  });