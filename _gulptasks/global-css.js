import {
	src,
	dest
} from "gulp";
import concat from "gulp-concat";
import sourcemap from "gulp-sourcemaps";
import plumber from "gulp-plumber";
import cssnano from "cssnano";
import postcss from "gulp-postcss";
import cssSort from "css-declaration-sorter";
import autoprefixer from "autoprefixer";
import {
	readFileSync
} from "graceful-fs";

export const cssGlobal = () => {
	let glob = JSON.parse(readFileSync("config.json"))
	return src(glob.css, {
			allowEmpty: true
		})
		.pipe(sourcemap.init())
		.pipe(plumber())
		.pipe(concat("plugins.min.css"))
		.pipe(postcss([
			autoprefixer({
				browsers: ["last 4 version", "IE 9"],
				cascade: false
			}),
			cssnano(),
			cssSort({
				order: "concentric-css",
			})
		]))
		.pipe(sourcemap.write("."))
		.pipe(dest("dist/css"))
}

module.exports = cssGlobal;
