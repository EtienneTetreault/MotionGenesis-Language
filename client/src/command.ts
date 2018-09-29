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
    let uriTest = vscode.Uri.file('C:/MotionGenesis/MGTemplateBasic.txt')
    vscode.workspace.openTextDocument(uriTest).then(doc => {
        let textString = doc.getText()
        console.log('gud');
        console.log(textString);

        vscode.workspace.openTextDocument({language: "motiongenesis", content: textString}).then((a: vscode.TextDocument) => {
            vscode.window.showTextDocument(a, 1, false)
        });
    },
        (err) => {
            console.log('No gud');
            console.log(err);

        })

    // var setting: vscode.Uri = vscode.Uri.parse("untitled:" + "C:\summary.txt");


    // template.uri.fsPath = 'C:/MotionGenesis/MGTemplateBasiccc.txt'

    // template.fileName = 'C:/MotionGenesis/MGTemplateBasiccc.txt'

    // let uriTest = vscode.Uri.file('C:/MotionGenesis/MGTemplateBasiccc.txt')
    // vscode.window.showTextDocument(uriTest);
    // let a = vscode.commands.executeCommand("workbench.action.files.saveAs");
    // console.log(a);
    // let b = vscode.window.onDidChangeVisibleTextEditors
    // console.log(b);

    // vscode.window.showInformationMessage('Save As');

    // onDidChangeWindowState
    // console.log(uriTest)
}
