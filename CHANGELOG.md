# Change Log
All notable changes to the "motiongenesis-language" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.9.0] - 2018-10-01
Pre-release with first publication of the extension on the Marketplace. New command added.

### Added
- Create real README and CHANGELOG files for the project.
- New command `createTemplate` to create and open an unsaved file from the MotionGenesis template in the MotionGenesis installation directory.
- New configuration `templateMotionGenesisPath` to support the new command.

### Changed
- The activationEvents in main package.json is now `motiongenesis` language id OR any of the contribute commands. On activation, a debug console message appears. All this to be sure the extension is well activated.

## [0.8.0] - 2018-09-22
Pre-release, after first week of beta-test by the creator and a single user.

### Added
- Creation of the extension structure, base on VScode `lsp-sample` and example https://code.visualstudio.com/docs/extensions/example-language-server.
- Contribute the MotionGenesis language, for plain text file with extension .txt or .al, as prefered by MotionGenesis.
- Syntax highlightling, including all (or most) native MG functions.
- A single command, `runMG`, to create a terminal and run the script via the MG executable (it must be in the PATH).
- Keyboard binding and quickmenu button to easily acces the `runMG` command.
- Integration of Language Server Protocol (LSP) to allow for more language features to be easily added in the future. See https://code.visualstudio.com/docs/extensions/example-language-server.