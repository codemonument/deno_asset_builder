import {parseArgs} from '@std/cli/parse-args';
import {encodeBase64} from 'jsr:@std/encoding@~1.0.8';
import {exportBundledObject} from './src/export_text.ts';
import type {ImportedFile, ImportTargetFile} from './src/type.d.ts';

const parsedArgs = parseArgs(Deno.args);

const assetsConfigFileName =
	typeof parsedArgs['import-file'] === 'string' ? parsedArgs['import-file'] : 'assets_config.json';

let assetsConfigString = '';

try {
	assetsConfigString = Deno.readTextFileSync(assetsConfigFileName);
} catch (error) {
	if (error instanceof Deno.errors.NotFound) {
		console.error(
			`Assets Config file [${assetsConfigFileName}] is not Found!!\nPlease confirm path.`
		);
		Deno.exit();
	}
	throw error;
}

// The list of asset files to be bundled
const assetFilesList: [ImportTargetFile] = JSON.parse(assetsConfigString).files;

// The output object of bundled files
const bundledObject: {[key: string]: ImportedFile} = {};

assetFilesList.forEach(file => {
	try {
		const content = encodeBase64(Deno.readFileSync(file.importPath));
		const extension = file.importPath.split('.').slice(-1)[0];
		bundledObject[`${file.calledName}`] = {content, extension};
	} catch (error) {
		if (error instanceof Deno.errors.NotFound) {
			console.error(
				`Asset file [${file.importPath}] is not Found - Cannot bundle!!\nPlease confirm.`
			);
			Deno.exit();
		}
		throw error;
	}
});

const exportText = exportBundledObject(bundledObject);

console.log(exportText);
