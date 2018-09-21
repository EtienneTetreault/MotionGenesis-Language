# MotionGenesis Language Support for VS Code

Support for editing and running MotionGenesis (MG) scripts. The VScode interface allow to edit MG scripts and run them, all in the same window.
The structure of the extension is based on the VScode example for Language Server Protocol (LSP) to allow for more language features to be easily added in the future. See https://code.visualstudio.com/docs/extensions/example-language-server.

## Functionality
This extension works for plain text file with extension .txt or .al, as prefered by MotionGenesis.
- Syntax highlightling, including all (or most) native MG functions
- A single command, runMG, to create a terminal and run the script via the MG executable (it must be in the PATH) 
- Keyboard binding and quickmenu button to easily acces the runMG command

## Futur Functionality
The 'lsp-sample' used as template, include a client/server connection (LSP) and allow for more complexe language features to be added. The 'server/src/server.ts' already have the structure for :
- Autocompletion (MG native functions to be added...)
- Diagnostics
- See https://code.visualstudio.com/docs/extensionAPI/language-support

It also includes an End-to-End test.

## Structure
As per VScode example for Language Server Protocol

```
.
├── client // Language Client
│   ├── src
│   │   ├── test // End to End tests for Language Client / Server
│   │   └── extension.ts // Language Client entry point
├── package.json // The extension manifest.
├── server // Language Server
│   └── src
│       └── server.ts // Language Server entry point
└── syntaxes
    └── src
        └── motiongenesis.tmLanguage.json // .json language syntaxe        
```

## Compile and Run

- Run `npm install` in this folder. This installs all necessary npm modules in both the client and server folder
- Open VS Code on this folder.
- Press Ctrl+Shift+B to compile the client and server.
- Switch to the Debug viewlet.
- Select `Launch Client` from the drop down.
- Run the lauch config.
- If you want to debug the server as well use the launch configuration `Attach to Server`
- In the [Extension Development Host] instance of VSCode, open a document in 'plain text' language mode.
  - Type `j` or `t` to see `Javascript` and `TypeScript` completion.
  - Enter text content such as `AAA aaa BBB`. The extension will emit diagnostics for all words in all-uppercase.