'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
let mgTerminal : vscode.Terminal;


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "motiongenesis-language" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {

        // The code you place here will be executed every time your command is executed
        const mgPathName = "MotionGenesis "
        var terminalNameArray = vscode.window.terminals.map(a => a.name);
        var ismgRunHere = terminalNameArray.indexOf('mgRun') > -1
        vscode.window.showInformationMessage(`mgPresent? ${ismgRunHere}`);
        if (!ismgRunHere) {
            mgTerminal = vscode.window.createTerminal("mgRun");
        }

        let document //: vscode.TextDocument;
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            document = editor.document;
        } else {
            vscode.window.showInformationMessage("No code found or selected.");
            return;
        }

        mgTerminal.show(true);

        let directory = path.dirname(document.fileName);
        let fileName = path.basename(document.fileName);

        const preserveFocus = false;
        mgTerminal.sendText('quit');
        vscode.commands.executeCommand("workbench.action.terminal.clear");
        mgTerminal.show(preserveFocus);
        mgTerminal.sendText("cd " + "\"" + directory + "\"");
        mgTerminal.sendText(mgPathName + fileName);
    });


    context.subscriptions.push(disposable);

}

// this method is called when your extension is deactivated
export function deactivate() {
}