var express = require('express');
var multer = require("multer");
const { OAuth2Client } = require('google-auth-library');
const { google } = require('googleapis');
const { Readable } = require('stream');
require('dotenv').config();

const app = express();
const upload = multer();

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static("public"))

// index page
app.get('/', function(req, res) {
    res.render('index');
});

app.get('/upload', function(req, res) {
  res.render('upload');
});

// auth page
app.get('/login', function(req, res) {
    res.render('auth', {apikey: process.env.APIKEY});
});

/**
   * This function authenticates the user for their Google Drive account.
   * @param {string} accessToken - Oauth Access Token
*/
function driveAuth(accessToken) {
    const auth = new OAuth2Client({});
    auth.setCredentials({ access_token: accessToken })
    const service = google.drive({ version: 'v3', auth: auth });
    return service;
}

/**
   * The uploadPhoto function authenticates the user and uploads it to google drive.
   * @param {string} accessToken - Oauth Access Token
   * * @param {string} filePath - Filepath containing image, to upload photo from.
*/
async function uploadPhoto(accessToken, filePath) {
    const service = driveAuth(accessToken);
    const requestBody = {
      name: 'photo.jpg',
      fields: 'id',
    };
    const media = {
      mimeType: 'image/jpeg',
      body: filePath,
    };
    try {
      const file = await service.files.create({
        requestBody,
        media: media,
      });
      return file.data.id;
    } catch (err) {
      console.log(err)
      throw err;
    }
  }

  /**
   * This post request uses multer.upload to upload photos to drive.
   * We retrieve file stream from the frontend with a form, without filepath
   * @param {string} accessToken - Oauth Access Token
*/
  app.post('/uploadfile/:accesstoken', upload.array("file"), (req, res) => {
    let accessToken = req.params.accesstoken;
    const service = driveAuth(accessToken);
    let fileid = '';
    for (var file of req.files) {
      const stream = Readable.from(file.buffer)
      uploadPhoto(accessToken, stream).then((Id) => {
        res.send({ id: Id })
        service.permissions.create({
          fileId: Id,
          resource: {
            role: "reader",
            type: "anyone",
          }
        });
        fileid += Id;
      })
    }
  })

  const port = 1423;
  app.listen(port);
  console.log(`started server in ${port}`)