// transformer1-module
import * as ts from "typescript";
import ttypescript from "ttypescript";

export default function (program: ts.Program, pluginOptions: {}) {
	return (ctx: ts.TransformationContext) => {
		return (sourceFile: ts.SourceFile) => {
			function visitor(node: ts.Node): ts.Node {
				// if (ts.isCallExpression(node)) {
				//     return ts.createLiteral('call');
				// }
				return ts.visitEachChild(node, visitor, ctx);
			}
			return ts.visitEachChild(sourceFile, visitor, ctx);
		};
	};
}

// transformer1-module
export function yo(program: ts.Program, pluginOptions: {}) {
	return (ctx: ts.TransformationContext) => {
		return (sourceFile: ts.SourceFile) => {
			function visitor(node: ts.Node): ts.Node {
				// if (ts.isCallExpression(node)) {
				//     return ts.createLiteral('call');
				// }
				return ts.visitEachChild(node, visitor, ctx);
			}
			return ts.visitEachChild(sourceFile, visitor, ctx);
		};
	};
}
