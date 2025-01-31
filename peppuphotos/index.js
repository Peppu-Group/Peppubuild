var express = require('express');
var multer = require("multer");
var cors = require('cors');
const { OAuth2Client } = require('google-auth-library');
const { google } = require('googleapis');
const { Readable } = require('stream');
require('dotenv').config();

const app = express();
const upload = multer();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(cors())
app.use(express.static("public"))

// index page
app.get('/', function (req, res) {
  res.render('index');
});

app.get('/upload', function (req, res) {
  res.render('upload');
});

// auth page
app.get('/login', function (req, res) {
  res.render('auth', { apikey: process.env.APIKEY, url: process.env.URL });
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

/**
 * The ideal frontend should contain a dropdown which return the roles: 
 * owner, organizer, fileOrganizer, writer, reader as a string o the body of the backend
 * The accesstoken of the file should also be returned as a param.
 */
app.post('/permissions/:accesstoken', (req, res) => {
  let accessToken = req.params.accesstoken;
  let Id = req.body.id;
  let role = req.body.role;
  const service = driveAuth(accessToken);
  try {
    service.permissions.create({
      fileId: Id,
      resource: {
        role: role,
        type: "anyone",
      }
    }).then(() => {
      res.send(`successfully updated`)
    })
  } catch (err) {
    return err
  }
})

async function replaceParent(folderId, fileId, accessToken) {
  const service = driveAuth(accessToken);
  try {
    // Retrieve the existing parents to remove
    const file = await service.files.get({
      fileId: fileId,
      fields: 'parents',
    });

    // Move the file to the new folder
    const previousParents = file.data.parents
      .join(',');
    const files = await service.files.update({
      fileId: fileId,
      addParents: folderId,
      removeParents: previousParents,
      fields: 'id, parents',
    });
    console.log(files.status);
    return files.status;
  } catch (err) {
    // TODO(developer) - Handle error
    return err;
  }
}

/**
 * Create folder for the user.
 */
async function createFolder(accessToken, name) {
  // Get credentials and build service
  // TODO (developer) - Use appropriate auth mechanism for your app

  const service = driveAuth(accessToken);
  const fileMetadata = {
    name: name,
    mimeType: 'application/vnd.google-apps.folder',
  };
  try {
    const file = await service.files.create({
      requestBody: fileMetadata,
      fields: 'id',
    });
    console.log('Folder Id:', file.data.id);
    return file.data.id;
  } catch (err) {
    // TODO(developer) - Handle error
    throw err;
  }
}

/**
 *  This route first checks that the folder isn't already available in the drive, by collecting the id.
 *  If available, move file into folder.
 *  If not, create folder and move file into folder.
 */
app.post('/tidy/:accesstoken', (req, res) => {
  let folderId = req.body.folderId;
  let fileId = req.body.fileId;
  let name = req.body.name;
  let accessToken = req.params.accesstoken;
  const service = driveAuth(accessToken);
  if (folderId) {
    replaceParent(folderId, fileId)
  } else {
    createFolder(accessToken, name).then(() => {
      replaceParent(folderId, fileId)
    })
  }
})

/**
*  This route saves the names of files created into the users appdatafolder
*/

const port = 1423;
app.listen(port);
console.log(`started server in ${port}`)