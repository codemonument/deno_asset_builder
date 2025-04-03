import type {ImportedFile} from './type.d.ts';

const exportTextFn = (exportText: string) =>
	`import { decodeBase64 } from "jsr:@std/encoding@~1.0.8";

const bundledObject = {
  files:{
  ${exportText}
  }
} 

export default bundledObject`;

const exportObjectText = (bundledObject: {[key: string]: ImportedFile}) => {
	return Object.keys(bundledObject)
		.map(
			(key, index) =>
				`${index > 0 ? '  ' : ''}  "${key}":{\r\n      content:decode("${
					bundledObject[key].content
				}"),\r\n      extension: "${bundledObject[key].extension}"\r\n    }`
		)
		.join(',\r\n');
};

export const exportBundledObject = (bundledObject: {[key: string]: ImportedFile}) => {
	const tmp = exportObjectText(bundledObject);
	return exportTextFn(tmp);
};
