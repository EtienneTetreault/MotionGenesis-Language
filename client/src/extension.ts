/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';

import * as path from 'path';
import { workspace, ExtensionContext } from 'vscode';
import * as vscode from 'vscode';


import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient';

let client: LanguageClient;
let mgTerminal: vscode.Terminal;

export function activate(context: ExtensionContext) {
	console.log('Congratulations, your extension "motiongenesis-language" is now active!');
	
	let disposable = vscode.commands.registerCommand('extension.runMG', () => {
		// The code you place here will be executed every time your command is executed
		let document: vscode.TextDocument;
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

	});

	context.subscriptions.push(disposable);

	// The server is implemented in node
	let serverModule = context.asAbsolutePath(
		path.join('server', 'out', 'server.js')
	);
	// The debug options for the server
	// --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
	let debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	let serverOptions: ServerOptions = {
		run: { module: serverModule, transport: TransportKind.ipc },
		debug: {
			module: serverModule,
			transport: TransportKind.ipc,
			options: debugOptions
		}
	};

	// Options to control the language client
	let clientOptions: LanguageClientOptions = {
		// Register the server for plain text documents
		documentSelector: [{ scheme: 'file', language: 'motiongenesis' }],
		synchronize: {
			// Notify the server about file changes to '.clientrc files contained in the workspace
			fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
		}
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'languageServerExample',
		'Language Server Example',
		serverOptions,
		clientOptions
	);

	// Start the client. This will also launch the server
	client.start();
}

export function deactivate(): Thenable<void> {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
