import { PagesApp, SettingsApp, ProductApp } from './manager';
import commands from './commands';
import loadComponents from './components';
import en from './locale/en';

export default (editor, opts = {}) => {
    const options = {
        ...{
            // default options
            // Allow migration of projects using deprecated storage prefix
            legacyPrefix: '',
            // Database name
            dbName: 'gjs',

            // Collection name
            objectStoreName: 'projects',

            // Load first template in storage
            loadFirst: true,

            // Confirm delete project
            confirmDeleteProject() {
                return confirm('Are you sure to delete this project')
            },

            // Confirm delete page
            confirmDeletePage() {
                return confirm('Are you sure to delete this page')
            },

            // When template or page is deleted
            onDelete(res) {
                console.log('Deleted:', res)
            },

            // Handle promise from delete
            onDeleteAsync(del) {
                return del;
            },
            bgColor: {
                one: '#fff',
                two: '#000000',
                three: '#1df205',
                four: '#1df205'
            },
            url: 'https://www.peppubuild.com',
            // default options
            i18n: {},
        },
        ...opts,
    };

    editor.I18n.addMessages({
        en,
        ...options.i18n,
    });

    // Add components
    loadComponents(editor, options);


    editor.Panels.addButton('options', [
        {
            id: 'undo',
            label: `<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M20 13.5C20 17.09 17.09 20 13.5 20H6V18H13.5C16 18 18 16 18 13.5S16 9 13.5 9H7.83L10.91 12.09L9.5 13.5L4 8L9.5 2.5L10.92 3.91L7.83 7H13.5C17.09 7 20 9.91 20 13.5Z" />
    </svg>`,
            active: false,
            command: () => editor.runCommand('core:undo'),
        }
    ])

    editor.Panels.addButton('options', [
        {
            id: 'core:canvas-clear',
            active: false,
            command: () => editor.runCommand('core:canvas-clear'),
            label: `<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
      </svg>`,
        }
    ])

    /*
    editor.Panels.addButton('views',
      {
        id: 'publish',
        className: 'fa fa-upload',
        active: false,
        command: 'peppu:publish'
      }
    )
    */

    // option value for CSS values
    let cssString = `
  .gjs-one-bg {
    background-color: ${options.bgColor.one};
    ;
  }
  
  .gjs-two-color {
    color: ${options.bgColor.two};
  }
  
  .gjs-three-bg {
    background-color: ${options.bgColor.three};
    color: white;
  }
  
  .gjs-four-color,
  .gjs-four-color-h:hover {
    color: ${options.bgColor.four};
  }

  /* LOGO VERSION */

  .gjs-pn-commands .gjs-pn-buttons,
  #gjs-pn-commands .gjs-pn-buttons {
    display: none;
  }

  .gjs-logo {
    height: 25px;
  }

  .gjs-logo-cont {
    position: relative;
    display: inline-block;
    top: 3px;
  }

  a:link {
    text-decoration: none;
  }

  a:visited {
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
  }

  a:active {
    text-decoration: none;
  }
  `;

    // Append css styles to html
    const style = document.createElement('style');
    style.innerText = cssString;
    document.head.appendChild(style);

    // Init and add dashboard object to editor
    editor.PagesApp = new PagesApp(editor, options);
    editor.SettingsApp = new SettingsApp(editor, options);
    editor.ProductApp = new ProductApp(editor, options)

    // Load commands
    commands(editor, options);

    const cm = editor.Commands;

    // Load page with index zero
    editor.on('load', async () => {
        // location.reload();  
    });

    editor.on('update', async () => {
      // run if command to ensure user is logged in. Else, navigate to home page.
      // run save on each change.
      new PagesApp(editor).saveProject()
    });
};