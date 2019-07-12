const {app, Tray, Menu, BrowserWindow} = require('electron');
const path = require('path');

const iconPath = path.join(__dirname, 'icon.png');
let tray;
let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width:400,
        height: 600,
        frame: false,
        show: false
    });

    tray = new Tray(iconPath);
    var contextMenu = Menu.buildFromTemplate([
        {
            label: 'Item1',
            type: 'radio'
        },
        {
            label: 'Item2',
            submenu: [
                {
                    label: 'Submenu1'
                },
                {
                    label: 'Submenu2'
                }
            ]
        },
        {
            label: 'Toogle DevTools',
            accelerator: 'Ctrl+I',
            click() {
                mainWindow.show();
                mainWindow.toggleDevTools();
            }
        },
        {
            label: 'Quit',
            accelerator: 'Ctrl+Q',
            click() {
                app.quit();
            }
        }
    ]);

    tray.setToolTip("This is an electron tray app");
    tray.setContextMenu(contextMenu);

    let a = tray.getBounds()
    console.log(a.x, a.y, a.height, a.width); 
    tray.on('click', (event, bounds) => {
        const { x, y } = bounds;
        console.log(x, y);
        if (mainWindow.isVisible()) {
            mainWindow.hide();
        } else {
            mainWindow.show();
        }
    });
});