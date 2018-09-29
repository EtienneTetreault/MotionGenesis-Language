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
    let templateUri = vscode.Uri.file('C:/MotionGenesis/MGTemplateBasic.txt')

    // Get MG template file as Textdocument, copy content to string and create/open new unsaved TextDocument as MG file with MG template as content
    vscode.workspace.openTextDocument(templateUri).then(templateDoc => {
        let templateString = templateDoc.getText()
        vscode.workspace.openTextDocument({language: "motiongenesis", content: templateString}).then((newDoc: vscode.TextDocument) => {
            vscode.window.showTextDocument(newDoc, 1, false)
        });
    },
    // If error on OpenTextDocument -- Probably wrong uri/path
        () => {
            vscode.window.showInformationMessage('Wrong path or non-existent file');
        })
}
