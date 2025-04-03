# Deno asset-builder for deno compile

Bundles asset files (eg, text, image) for deno compile into base64 encoded strings in a typescript file.
This TS file can be used with `deno compile` to load these assets at runtime.

# Usage - directly run from jsr

```sh
# Import config file from default ./assets_config.json.
deno run --allow-read jsr:@codemonument/asset-builder >> asset.ts

# Set Import config file.
deno run --allow-read jsr:@codemonument/asset-builder --import-file my_assets_config.json  >> asset.ts
```

# Usage - install as a global binary

```sh
# change the name for this binary by passing a different -n argument
deno install --global --allow-read -n asset-builder jsr:@codemonument/asset-builder

# Use default config (./assets_config.json)
asset-builder >> asset.ts

# Use a custom config file
asset-builder --import-file my_assets_config.json >> asset.ts
```

# Configuration

The configuration file is described in json.  
Write as follows.

```json
{
	"files": [
		{
			"importPath": "./sample.txt",
			"calledName": "sample-text"
		}
	]
}
```

# Example of using bundled files

The file created by asset_builder is used as follows.

```ts
import asset from './asset.ts';

for (const [key, value] of Object.entries(asset.files)) {
	console.log(
		`key: ${key}, extension: ${value.extension}, content: ${new TextDecoder().decode(
			value.content
		)}`
	);
}
// key: test-text, extension: txt, content: Hello World!!
// key: test-text2, extension: txt, content: Hello World!!
```
