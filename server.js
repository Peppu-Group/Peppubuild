/** Peppubuild uses Firebase for authentication and Google Drive (appDataFolder) to store user information.
 * Since we are only accessing (appDataFolder), we can't access the users files in drive, only information we 
 * have created. For more information, checkout https://developers.google.com/drive/api/guides/appdata.
*/
"use strict";
exports.__esModule = true;
exports.startServer = void 0;

// Modules import
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
var grapesjs = require('grapesjs');
var os = require('os');
var fetch = require('node-fetch');
const { OAuth2Client } = require('google-auth-library');
const { google } = require('googleapis');
require('dotenv').config();
const { Readable } = require('stream');
var ftp = require("basic-ftp");
var cors = require('cors');
var fs = require('fs');
var multer = require("multer");
const upload = multer();

// ENV constants for Namecheap
const CURR_DIR = os.tmpdir();
const cpanelDomain = process.env.CPANEL_DOMAIN;
const cpanelUsername = process.env.CPANEL_USER;
const root = 'peppubuild.com';
const cpanelApiKey = process.env.CPANEL_SECRET_KEY;

const app = express();

/**
 * All of our functions are wrapped around the startServer() function.
 * At the end of the file, we call this function and listen to port 1404.
*/
async function startServer() {
  app.use(bodyParser.urlencoded({ extended: false }))

  app.use(cors())
  app.use(express.json({ limit: '50mb' }))
  // parse application/json
  app.use(bodyParser.json())

  app.use(cookieParser())

  process.on('uncaughtException', function (err) {
    console.log('Caught exception: ', err);
  });
  /**
   * This function retrieves the gjs JSON content, which forms our website page, from Google's Drive (appDataFolder).
   * @module getContent()
   * With our fileID, we can easily retrieve file and return its content.
   * @param {number} Id - FileId
   * @param {string} accessToken - Oauth Access Token
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
  async function getContent(Id, accessToken) {
    const service = driveAuth(accessToken);
    try {
      const file = await service.files.get({
        fileId: Id,
        alt: 'media',
      });
      let data = JSON.stringify(file.data);
      let finaldata = JSON.parse(data)
      // return finaldata.gjsProject.project;
      return finaldata.gjsProject;
      // return title and published here too.
    } catch (err) {
      // TODO(developer) - Handle error
      return err;
    }
  }

  /**
   * app.post('/clientdeploy/:pname', (req, res) => {})
   * Route serving deploy, to publish project. 
   * We use FTP server to upload files.
   * We also call uploadFrom() with params readablestream and file name.
   * @name Clientdeploy
   * @function
   * @param {string} pname - Project name
   * @param {callback} page - gjs page data.
  */
  app.post('/clientdeploy/:autkn', (req, res) => {
    let auth = req.params.autkn
    let body = req.body.blob
    zip.generateAsync({ type: "blob" }).then(function (blob) {
      // User the token to fetch the list of sites for the user
      fetch('https://api.netlify.com/api/v1/sites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/zip',
          Authorization: 'Bearer ' + auth
        },
        body: blob
      })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(`Error fetching sites: ${error}`)
        })
    })
  })




  /**
   * Create Subdomain
   * This function creates a subdomain for our user in our Namecheap shared hosting account.
   * @module createSub()
   * @param {string} name - Subdomain name
  */
  function createSub(name) {
    const apiUrl = `${cpanelDomain}:2083/cpsess${cpanelApiKey}/execute/SubDomain/addsubdomain?domain=${name}&rootdomain=${root}&dir=${name}.${root}`;
    let data = fetch(apiUrl, {
      method: 'GET', headers: {
        'Authorization': 'cpanel ' + cpanelUsername + ':' + cpanelApiKey,
      }
    })
    return data;
  }

  function driveAuth(accessToken) {
    const auth = new OAuth2Client({});
    auth.setCredentials({ access_token: accessToken })
    const service = google.drive({ version: 'v3', auth: auth });
    return service;
  }

  /**
   * This function lists all projects created with Peppubuild, from Google's Drive (appDataFolder).
   * @module listFiles()
   * @param {string} accessToken - Oauth Access Token
  */
  async function listFiles(accessToken) {
    const service = driveAuth(accessToken);
    try {
      const res = await service.files.list({
        spaces: 'appDataFolder',
        fields: 'nextPageToken, files(id, name)',
        pageSize: 100,
      });
      return res.data.files;
    } catch (err) {
      // TODO(developer) - Handle error
      return err;
    }
  }

  /**
   * app.get('/logout', (_req, res) => {})
   * This route deletes the cookie pepputoken, which contains our Oauth.
   * @name Logout
   * @function
   * @param {string} pepputoken - res.clearCookie
  */
  app.get('/logout', (_req, res) => {
    res.clearCookie('pepputoken')
    res.send(`Cookie have been deleted successfully ${CURR_DIR}`);
  })

  /**
   * app.get('/logout', (_req, res) => {})
   * This route retrieves Oauth token after authentication with firebase.
   * Next, it stores the cookie pepputoken, which contains our Oauth.
   * @name Login
   * @function
   * @param {string} providerToken - Oauth token
  */
  app.post('/login', (req, res) => {
    // collect token
    let providerToken = req.body.token;
    // verify token

    // store token
    res.cookie('pepputoken', providerToken, {
      maxAge: 24 * 60 * 60 * 1000, // One day
      // httpOnly: true // Only the server can read the cookie
    })
    // send response
    res.send('Cookie have been saved successfully');
  })

  // set user as token retrieved from login and stored in cookies
  app.use(function (req, _res, next) {
    const token = req.cookies.pepputoken;
    req.user = token
    next()
  })

  /**
   * Create File to store application's data on Google Drive (appDataFolder).
   * @module createFrontend()
   * @param {string} projectName - Project Name
   * @param {string} accessToken - Oauth AccessToken
  */
  async function createFrontend(projectName, accessToken) {
    const service = driveAuth(accessToken);
    const media = {
      mimeType: 'application/json',
      // body: fs.createReadStream(`files/${projectName}.json`),
    };
    const fileMetadata = {
      name: `${projectName}.json`,
      parents: ['appDataFolder'],
    };
    try {
      const file = await service.files.create({
        resource: fileMetadata,
        media: media,
      })
      // console.log(file.data.id)
      return file.data.id;
    } catch (err) {
      // TODO(developer) - Handle error
      return err;
    }
  }

  /**
   * Update the project file created on Google Drive (appDataFolder), with gjs JSON.
   * @module updateDB()
   * @param {string} projectName - Project Name
   * @param {string} Id - FileId
   * @param {string} accessToken - Oauth AccessToken
  */
  async function updateDB(project, Id, accessToken, published, title) {
    const service = driveAuth(accessToken);
    const media = {
      mimeType: 'application/json',
      body:
        `{
        "gjsProject": {
            "project": ${project},
            "published": "${published}",
            "title": "${title}"
        }
    }`
    };
    try {
      service.files.update({
        fileId: Id,
        // resource: fileMetadatad,
        media: media,
      }).then((res) => {
        return res
      })
    } catch (err) {
      // TODO(developer) - Handle error
      return err
    }
  }

  /**
   * Function to delete file and the content of the project.
   * @module deleteContent()
   * @param {string} projectName - Project Name
   * @param {string} Id - FileId
   * @param {string} accessToken - Oauth AccessToken
  */
  async function deleteContent(Id, accessToken) {
    const service = driveAuth(accessToken);
    try {
      await service.files.delete({
        fileId: Id,
      });
    } catch (err) {
      // TODO(developer) - Handle error
      return err;
    }
  }

  /**
   * app.post('/project/:id', (req, res) => {})
   * Route to retrieve the data of a single project. Useful route for loading editor with pre-saved project.
   * @memberof getContent()
   * @name Retrieve_Project
   * @function
   * @param {string} Id - File Id
  */
  // get project from db in gjsProject format.
  app.post('/project/:id', (req, res) => {
    let Id = req.params.id;
    let accessToken = req.body.accessToken;
    getContent(Id, accessToken).then((response) => {
      res.send(response)
    })
  })

  /**
   * app.post('/pdelete/:id', (req, res) => {})
   * Route to delete project from Google Drive.
   * @memberof deleteContent
   * @name Delete_Project
   * @function
   * @param {string} Id - File Id
  */
  app.post('/pdelete/:id', (req, res) => {
    let Id = req.params.id;
    let accessToken = req.body.accessToken;
    deleteContent(Id, accessToken).then(() => {
      res.send('Deleted successfully')
    })
  })

  /**
   * app.post('/pdelete/:id', (req, res) => {})
   * Route to retrieve all of the projects from Drive.
   * @memberof listFiles()
   * @name Delete_Project
   * @function
   * @param {string} token - Oauth Token
  */
  app.get('/projects/:token', (req, res) => {
    let accessToken = req.params.token;
    listFiles(accessToken).then((response) => {
      res.send(response)
    })
  })
  /**
   * app.put('/save/:id', (req, res) => {})
   * Route to save changes to corresponding file on Drive.
   * @memberof updateDB()
   * @name Save_Project
   * @function
   * @param {string} token - Oauth Token
  */
  // save changes to corresponding file on disk
  app.put('/save/:id', (req, res) => {
    let id = req.params.id;
    let accessToken = req.body.accessToken;
    let gjsProject = req.body.gjsProject;
    let title = req.body.title;
    let published = req.body.published;

    const service = driveAuth(accessToken);
    const media = {
      mimeType: 'application/json',
      body:
        `{
        "gjsProject": {
            "project": ${gjsProject},
            "published": "${published}",
            "title": "${title}"
        }
    }`
    };
    try {
      service.files.update({
        fileId: id,
        // resource: fileMetadatad,
        media: media,
      }).then(() => {
        res.send('Successfully saved')
      }).catch(() => {
        res.status(400).send('Failed to saved')
      })
    } catch (err) {
      // TODO(developer) - Handle error
      return err
    }
  })

  app.post('/publishcontent', (req, res) => {

  })

  /**
   * app.post('/publishfront/:name', (req, res) => {})
   * Route to publish file to Namescheap
   * @function
   * @memberof updateDB()
   * @memberof createFrontend()
   * @memberof createSub()
   * @name Publish_Project
  */
  // create frontend project
  /// TODO: Import the necessary functions here like createFrontend etc.
  app.post('/publishfront/:name', (req, res) => {
    let projectName = req.params.name;
    // let projectName = req.body.projectName;
    // let projectType = req.body.projectType;
    // let tartgetPath = path.join(CURR_DIR, projectName);

    let gjsProject = req.body.gjsProject;
    let accessToken = req.body.accessToken;
    let title = req.body.title;
    let published = req.body.published;
    createSub(projectName).then(async (response) => {
      let text = await response.text();
      let json = JSON.parse(text);
      if (response.ok) {
        if (json.errors == null) {
          // Step 2 - Create file in drive
          createFrontend(projectName, accessToken).then((id) => {
            // Step 3 - Update with empty project
            updateDB(gjsProject, id, accessToken, published, title);
            res.send({ id: id });
          });
          // Step 4 - Add file name and project data to localstorage.
        } else {
          res.status(500).send({ error: json.errors[0] });
        }
      } else {
        res.status(500).send({ error: 'Network error' });
      }
    })
  })

  const port = 1404;
  app.listen(port);
  console.log(`started server in ${port}`)
}
startServer()