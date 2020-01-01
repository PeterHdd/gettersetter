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
			if(p.includes("num")){
				 generatedMethods = generateGetterAndSetter(p,"num");
			}			
			if(p.includes("String")){
				generatedMethods = generateGetterAndSetter(p,"String");
			}
			if(p.includes("int")){
				generatedMethods = generateGetterAndSetter(p,"int");
			}
			if(p.includes("double")){
				generatedMethods = generateGetterAndSetter(p,"double");
			}
			if(p.includes("bool")){
				generatedMethods = generateGetterAndSetter(p,"bool");
			}
			if(p.includes("List")){
				generatedMethods = generateGetterAndSetter(p,"List");
			}
			if(p.includes("Map")){
				generatedMethods = generateGetterAndSetter(p,"Map");
			}
			if(p.includes("Set")){
				generatedMethods = generateGetterAndSetter(p,"Set");
			}
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
	function generateGetterAndSetter(prop, type){
		let variableName = prop.split(" ").slice(-1);
		let varUpprName  = variableName.toString().charAt(0).toUpperCase() + variableName.toString().slice(1);
		s = `\n ${type} get get${varUpprName} => ${variableName};`;
		setter  = `\n set set${varUpprName}(${type} ${variableName}) => this.${variableName} = ${variableName};`;
		let uri = vscode.window.activeTextEditor.document.getText();
		if(uri.includes(`get${varUpprName}`)){
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
