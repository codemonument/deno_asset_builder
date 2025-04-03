import type {ImportedFile} from './type.d.ts';

function exportTextFn(exportText: string): string {
	return `
  import { decodeBase64 } from "jsr:@std/encoding@~1.0.8";
  
  const bundledObject = {
    files:{
    ${exportText}
    }
  } 
  export default bundledObject;
`;
}

function exportObjectText(bundledObject: {[key: string]: ImportedFile}): string {
	return Object.keys(bundledObject)
		.map(
			(key, index) =>
				`${index > 0 ? '  ' : ''}  "${key}":{\r\n      content:decodeBase64("${
					bundledObject[key].content
				}"),\r\n      extension: "${bundledObject[key].extension}"\r\n    }`
		)
		.join(',\r\n');
}

export const exportBundledObject = (bundledObject: {[key: string]: ImportedFile}) => {
	const tmp = exportObjectText(bundledObject);
	return exportTextFn(tmp);
};
