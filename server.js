/** Peppubuild uses Firebase for authentication and Google Drive (appDataFolder) to store user information.
 * Since we are only accessing (appDataFolder), we can't access the users files in drive, only information we 
 * have created. For more information, checkout https://developers.google.com/drive/api/guides/appdata.
*/
"use strict";
exports.__esModule = true;
exports.startServer = void 0;

// Modules import
const { GoogleGenerativeAI } = require("@google/generative-ai");
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

  // Ensure fetch is available globally:
  if (!globalThis.fetch) {
    globalThis.fetch = fetch;
  }

  process.on('uncaughtException', function (err) {
    console.log('Caught exception: ', err);
  });
  /** 
   app.get('/ai', async (req, res) => {
    const genAI = new GoogleGenerativeAI("AIzaSyDr8p0ildhc3-_KHqd_RU9oSqrROdKPpOo");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Explain how AI works";

    const result = await model.generateContent(prompt);
    res.send(result.response.text())
   })
  */
  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&")
      .replace(/</g, "<")
      .replace(/>/g, ">")
      .replace(/'/g, "'")
  }

  app.post('/promptai', async (req, res) => {
    let userReq = req.body.userReq;
    // let userReq = "I want a portfolio website's home page"
    try {
      const genAI = new GoogleGenerativeAI('AIzaSyDr8p0ildhc3-_KHqd_RU9oSqrROdKPpOo'); // Make sure you have GOOGLE_API_KEY environment variable set
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
        You are a professional web developer AI assistant.  Your primary goal is to generate clean, well-structured HTML and CSS code for web development tasks.
  
        Given the following request, provide separate HTML and CSS code blocks.  Clearly label each block as "HTML Code" or "CSS Code". Always build with Bootstrap.
  
        Request: ${userReq}
  
        Ensure the HTML and CSS are well-formatted, readable, and use modern best practices. Use comments where appropriate to explain the code. Prioritize a mobile-first approach to CSS.
      `;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      // console.log("Full AI Response:\n", responseText); // *** IMPORTANT: Log the response! ***

      // --- Extraction Regexes ---
      const htmlRegex = /```html([\s\S]*?)```/;
      const cssRegex = /```css([\s\S]*?)```/;

      // --- Extract Code and Instructions ---
      const htmlMatch = responseText.match(htmlRegex);
      const cssMatch = responseText.match(cssRegex);

      const nonCodeRegex = /([\s\S]*?)(?:```[\s\S]*?```|$)/g;

      const extractNonCodeText = (responseText) => {
        return [...responseText.matchAll(nonCodeRegex)]
          .map(match => match[1].trim())  // Extract only the first capture group
          .filter(text => text.length > 0) // Remove empty results
          .join("\n\n");  // Preserve paragraph structure
      };

      // console.log(nonCodeText);

      const htmlCode = htmlMatch ? htmlMatch[1].trim() : "<!-- No HTML Code Found -->";
      const cssCode = cssMatch ? cssMatch[1].trim() : "/*No CSS code*/";

      // --- Response Formatting ---
      let responseHTML = "";
      /* 
      responseHTML += `
      <h2>HTML Code:</h2>
      <pre><code class="language-html">${escapeHtml(htmlCode)}</code></pre>
      <hr>
      <h2>CSS Code:</h2>
      <pre><code class="language-css">${escapeHtml(cssCode)}</code></pre>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
      <script>hljs.highlightAll();</script>
    `;
    */

      res.send({html: escapeHtml(htmlCode), css: escapeHtml(cssCode), instructions: extractNonCodeText(responseText)});

    } catch (error) {
      console.error("Error generating content:", error);
      res.status(500).send("An error occurred while generating the content.");
    }
  });

  /**
   *
   * This function retrieves the gjs JSON content, which forms our website page, from Google's Drive (appDataFolder).
   * @module getContent()
   * With our fileID, we can easily retrieve file and return its content.
   * @param {number} Id - FileId
   * @param {string} accessToken - Oauth Access Token
  */
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
   * This function lists all projects created with Peppubuild, from Google's Drive (appDataFolder).
   * @module listFiles()
   * @param {string} accessToken - Oauth Access Token
  */
  async function listFiles(accessToken, value) {
    const service = driveAuth(accessToken);
    try {
      const res = await service.files.list({
        q: `properties has { key='fileType' and value='${value}' }`,
        spaces: 'appDataFolder',
        fields: 'nextPageToken, files(id, name, properties)',
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
   * @param {string} projectName - Project Name.
   * @param {string} accessToken - Oauth AccessToken.
   * @param {string} classType - classType, either project or template.
   * @param {string} imgurl - Image URL, Allows us add the image of template card.
  */
  async function createFrontend(projectName, accessToken, classType, imgurl) {
    const service = driveAuth(accessToken);
    const media = {
      mimeType: 'application/json',
      // body: fs.createReadStream(`files/${projectName}.json`),
    };
    const fileMetadata = {
      name: `${projectName}.json`,
      parents: ['appDataFolder'],
      properties: {
        fileType: classType,
        url: imgurl
      }
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
   * Create File to store users template on Google Drive (appDataFolder).
   * @module createTemplate()
   * @param {string} accessToken - Oauth AccessToken
  */

  /**
   * Update the project file created on Google Drive (appDataFolder), with gjs JSON.
   * @module updateDB()
   * @param {string} projectName - Project Name
   * @param {string} Id - FileId
   * @param {string} accessToken - Oauth AccessToken
  */
  async function updateDB(project, Id, accessToken, published, title, products) {
    const service = driveAuth(accessToken);
    const media = {
      mimeType: 'application/json',
      body:
        `{
        "gjsProject": {
            "project": ${project},
            "published": "${published}",
            "title": "${title}",
            "products": ${products}
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
  app.get('/projects/:token/:filetype', (req, res) => {
    let accessToken = req.params.token;
    let fileType = req.params.filetype;
    listFiles(accessToken, fileType).then((response) => {
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
    let products = req.body.products;
    let published = req.body.published;

    const service = driveAuth(accessToken);
    const media = {
      mimeType: 'application/json',
      body:
        `{
        "gjsProject": {
            "project": ${gjsProject},
            "published": "${published}",
            "title": "${title}",
            "products": ${products}
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
    let products = req.body.products;
    let imgurl = 'na';

    createFrontend(projectName, accessToken, 'project', imgurl).then((id) => {
      // Step 3 - Update with empty project
      updateDB(gjsProject, id, accessToken, published, title, products);
      res.send({ id: id });
    });
    /* 
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
    */
  })

  /**
   * app.post('/publishfront/:name', (req, res) => {})
   * Route to publish file to Namescheap
   * @function
   * @memberof updateDB()
   * @memberof createTemplate()
   * @name Publish_Project
  */
  // create frontend project
  /// TODO: Import the necessary functions here like createFrontend etc.
  app.put('/template/:name', (req, res) => {
    let projectName = req.params.name;
    // let projectName = req.body.projectName;
    // let projectType = req.body.projectType;
    // let tartgetPath = path.join(CURR_DIR, projectName);

    let gjsProject = req.body.gjsProject;
    let accessToken = req.body.accessToken;
    let title = req.body.title;
    let published = req.body.published;
    let products = req.body.products
    let imgurl = req.body.url;

    createFrontend(projectName, accessToken, 'template', imgurl).then((id) => {
      // Step 3 - Update with empty project
      updateDB(gjsProject, id, accessToken, published, title, products);
      res.send({ id: id });
    });
  })

  const port = 1404;
  app.listen(port);
  console.log(`started server in ${port}`)
}
startServer()