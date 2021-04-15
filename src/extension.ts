import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "gettersetter" is now active!');

	let disposable = vscode.commands.registerCommand('extension.generateDartGetSet', () => {
		var editor = vscode.window.activeTextEditor;
        if (!editor)
			return; // No open text editor
		const selection   = editor.selection;
		var text = editor.document.getText(selection);
        if (text.length < 1)
        {
            vscode.window.showErrorMessage('No selected properties.');
			return;
		}
				
		let properties = text.split(/\r?\n/).filter(x => x.length > 2).map(x => x.replace(';', ''));
		let generatedMethods = [];
		for(let p of properties){
			generatedMethods = generateGetterAndSetter(p);			
		}

		editor.edit(
			edit => editor.selections.forEach(
			  selection => 
			  {
				edit.insert(selection.end, generatedMethods.join("\n"));
				arr = [];
			  }
			)
		  );

	
	});

	let s;
	let setter;
	let arr = [];
	function generateGetterAndSetter(prop){
		let type = prop.split(" ").splice(0)[0];
		if(prop.includes("=")){
			 prop = prop.substring(0,prop.lastIndexOf("=")).trim()
		}
		let variableName = prop.split(" ").slice(-1);
		let varUpprName  = variableName.toString().charAt(0).toUpperCase() + variableName.toString().slice(1);
		if(prop.includes("_"))
		{
			let varLowerName  = variableName.toString().charAt(0).toLowerCase() + variableName.toString().slice(1);
			s = `\n ${type} get ${varLowerName.replace("_", "")} => this.${variableName};`;
			setter  = `\n set ${varLowerName.replace("_","")}(${type} value) => this.${variableName} = value;`;
		}
		else
		{
			s = `\n ${type} get get${varUpprName} => this.${variableName};`;
			setter  = `\n set set${varUpprName}(${type} ${variableName}) => this.${variableName} = ${variableName};`;
		}
		let uri = vscode.window.activeTextEditor.document.getText();
		if(uri.includes(`=> this.${variableName}`)){
			vscode.window.showErrorMessage('Setter and Getter already created.');
			return;
		}
		arr.push(s, setter);
		let sets = new Set(arr);
		let it   = sets.values();
			arr  = Array.from(it);
		return arr;
	}
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
