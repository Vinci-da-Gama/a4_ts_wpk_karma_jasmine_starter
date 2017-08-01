/* SystemJS module definition */
// declare var module: NodeModule;
// interface NodeModule {
//   	id: string;
// }

declare var app: {
	environment: string
}

// declare function require(id: string): any;
interface WebpackRequire {
	(id: string): any;
	context(directory: string, useSubdirectories: boolean, pattern: RegExp): any;
}

declare var require: WebpackRequire