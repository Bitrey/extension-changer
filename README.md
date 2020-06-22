# Extension changer
A simple Node script that replaces or appends an extension to all files in a specified folder.

I needed to replace the extension of all my recordings from .mkv to .mkv.avi so that Adobe Premiere Pro could import them, and this worked great 😉

## Run the program
To execute the script, **[make sure that you have Node.js installed](https://nodejs.org/en/download/ "make sure that you have Node.js installed")**.

### Windows
If you're on Windows, edit the second line of the `convert.bat` file to `node ./extensionChanger.js "Folder name" ` and replace `Folder name` with the name of the folder (or relative path) where the files are, don't forget to put  it in quotes.

### Other operating systems
If you're on another OS, open the terminal inside the folder where you downloaded the `extensionChanger.js` file, then type `node ./extensionChanger.js "Folder name"` and replace `Folder name` with the name of the folder (or relative path) where the files are, don't forget to put  it in quotes.

## Change the options
Open the `extensionChanger.js` file with any text editor.
At the top, you'll see 4 options, which are:

- `RECORDING_FOLDER`: Its default value is `process.argv[2] || "Altre registrazioni ancora"`, meaning that if you don't specify the folder name parameter (inside `convert.bat` or in the terminal), then the program will look into `"Altre registrazioni ancora"`.

- `ORIGINAL_EXT`: The extension that you want to replace or append to. In my case it was mkv. Please note that the dot prefix will be added automatically.

- `DESTINATION_EXT`: The extension that will be replaced or appended to `ORIGINAL_EXT`.  Please note that the dot prefix will be added automatically.

- `APPEND_INSTEAD_OF_REPLACE`: If set to `true`, the extension will be appended. For example, if you set `ORIGINAL_EXT` to "mkv" and `DESTINATION_EXT` to "avi", all the files with the ".mkv" extension would become ".mkv.avi". If set to `false`, the extension will be replaced, so the files would become ".avi".

## Sidenote
While this program is certainly not pretty, what matters is that it's quick. You just set the folder name and the original and destination extensions once and you're golden.
You'll have to click the executable to have all your files' extension changed in the blink of an eye.
If you find this program useful, maybe consider [buying me a coffee here](https://paypal.me/alessandroamella "buying me a coffee by clicking here") 😁
