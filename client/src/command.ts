'use strict';

import * as path from 'path';
import * as vscode from 'vscode';

let mgTerminal: vscode.Terminal;
let document: vscode.TextDocument;

export function commandRunMG() {
    // The code you place here will be executed every time your command is executed
    const config = vscode.workspace.getConfiguration("motiongenesisconfig", null as any as undefined);
    const mgPathName = config.get("runMotionGenesisPath", "MotionGenesis ");

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

};

export function commandCreateTemplate() {
    vscode.window.showInformationMessage('CommandRun');

    let uriTest = vscode.Uri.file('C:/MotionGenesis/MGTemplateBasic.txt')
    vscode.window.showTextDocument(uriTest);
    vscode.commands.executeCommand("workbench.action.files.saveAs");
    vscode.window.showInformationMessage('Save As');


    // console.log(uriTest)
}
