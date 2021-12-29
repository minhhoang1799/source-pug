import {
	series,
	parallel
} from "gulp";

// Import tasks
import server from "./_gulptasks/server";
import cssGlobal from "./_gulptasks/global-css";
import jsGlobal from "./_gulptasks/global-js";
import pugTask from "./_gulptasks/html";
import sassTask from "./_gulptasks/css";
import jsTask from "./_gulptasks/script";
import {
	cleanDist
} from "./_gulptasks/clean";
import {
	copyFonts,
	copyImage,
	copyFavicon
} from "./_gulptasks/copy";

exports.default = series(
	cleanDist,
	parallel(
		copyImage,
		copyFavicon,
		copyFonts
	),
	parallel(
		jsGlobal,
		cssGlobal
	),
	pugTask,
	sassTask,
	jsTask,
	server
)
