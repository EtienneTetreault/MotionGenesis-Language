'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
let mgTerminal: vscode.Terminal;


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "motiongenesis-language" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.runMG', () => {
        // The code you place here will be executed every time your command is executed
        let document: vscode.TextDocument;
        const config = vscode.workspace.getConfiguration("motiongen",null as any as undefined);
        const mgPathName = config.get("runMotionGenesisPath", "MotionGenesis ");
        // const mgPathName = "MotionGenesis "

        const editor = vscode.window.activeTextEditor;
        if (editor) {
            document = editor.document;
        } else {
            vscode.window.showInformationMessage("No code found or selected.");
            return;
        }

        const terminalNameArray = vscode.window.terminals.map(a => a.name);
        const ismgRunHere = terminalNameArray.indexOf('mgRun') > -1
        if (!ismgRunHere) {
            mgTerminal = vscode.window.createTerminal("mgRun");
        }

        const directory = path.dirname(document.fileName);
        const fileName = path.basename(document.fileName);

        vscode.commands.executeCommand("workbench.action.files.save");
        const preserveFocus = true;
        mgTerminal.show(preserveFocus);
        mgTerminal.sendText('quit');
        mgTerminal.sendText("cd " + "\"" + directory + "\"");
        mgTerminal.sendText(mgPathName + fileName);
    });

    context.subscriptions.push(disposable);

}

// this method is called when your extension is deactivated
export function deactivate() {
}