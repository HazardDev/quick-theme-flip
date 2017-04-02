'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const themeOneIdentifier = 'themeOne';
const themeTwoIdentifier = 'themeTwo';
const colorThemeIdentifier = 'workbench.colorTheme';

var configuration = vscode.workspace.getConfiguration('qtf'); //This just gets plugin specific configuration
var themeOne = configuration.get(themeOneIdentifier);
var themeTwo = configuration.get(themeTwoIdentifier);


class AutothemeOneSwitcher {

	private isDay(): boolean{
		var currentTheme = vscode.workspace.getConfiguration().get(colorThemeIdentifier);
		return currentTheme == themeTwo;
	}

	public chooseThemeOne(){
		themeOne = vscode.workspace.getConfiguration().get(colorThemeIdentifier);
		configuration.update(themeOneIdentifier, themeOne, true);
		vscode.window.showInformationMessage("Theme One Set: " + themeOne);
	};

	public chooseThemeTwo(){
		themeTwo = vscode.workspace.getConfiguration().get(colorThemeIdentifier);
		configuration.update(themeTwoIdentifier, themeTwo, true);
		vscode.window.showInformationMessage("Theme Two Set: " + themeTwo);
	};

	public changeTheme(){
		if(this.isDay()){
			vscode.workspace.getConfiguration().update(colorThemeIdentifier, themeOne, true);
		} else {
			vscode.workspace.getConfiguration().update(colorThemeIdentifier, themeTwo, true);
		}
``	}

	dispose() {

	}
}


export function activate(context: vscode.ExtensionContext) {

	let qtf = new AutothemeOneSwitcher();
	vscode.commands.registerCommand('qtf.chooseThemeOne', () => qtf.chooseThemeOne());
	vscode.commands.registerCommand('qtf.chooseThemeTwo', () => qtf.chooseThemeTwo());
	vscode.commands.registerCommand('qtf.changeTheme', () => qtf.changeTheme());

	context.subscriptions.push(qtf);
}

// this method is called when your extension is deactivated
export function deactivate() {
}