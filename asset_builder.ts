import {parseArgs} from '@std/cli/parse-args';
import {encodeBase64} from 'jsr:@std/encoding@~1.0.8';
import {exportBundledObject} from './src/export_text.ts';
import type {ImportedFile, ImportTargetFile} from './src/type.d.ts';

const parsedArgs = parseArgs(Deno.args);

const importFileName =
	typeof parsedArgs['import-file'] === 'string' ? parsedArgs['import-file'] : 'assets_config.json';

let bundleList = '';

try {
	const readFile = Deno.readTextFileSync(importFileName);
	bundleList = readFile;
} catch (error) {
	if (error.name === 'NotFound') {
		console.error(`Import Config file [${importFileName}] is not Found!!\nplease confirm.`);
		Deno.exit();
	}
	throw error;
}

const bundleListArr: [ImportTargetFile] = JSON.parse(bundleList).files;

let bundledObject: {[key: string]: ImportedFile} = {};

bundleListArr.forEach(file => {
	try {
		const content = encodeBase64(Deno.readFileSync(file.importPath));
		const extension = file.importPath.split('.').slice(-1)[0];
		bundledObject[`${file.calledName}`] = {content, extension};
	} catch (error) {
		if (error.name === 'NotFound') {
			console.error(`Import file [${file.importPath}] is not Found!!\nplease confirm.`);
			Deno.exit();
		}
		throw error;
	}
});

const exportText = exportBundledObject(bundledObject);

console.log(exportText);
