import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import config from './config.json';
import cssnano from 'cssnano';
import gulp from 'gulp';
import inject from 'gulp-inject';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import sass from 'gulp-sass';

// browsersync and server
const browser = browserSync.create();

function gobbleError(error) {
	console.error(error.toString());
	this.emit('end');
}

function injectPartial(token, fileName) {
	return inject(gulp.src(`${config.source.root + config.source.partials + fileName}.html`), {
		removeTags: true,
		starttag: `<!-- inject:${token}:{{ext}} -->`,
		transform: (filePath, file) => {
			return file.contents.toString('utf8');
		}
	})
}

gulp.task('inject', () => {
	return gulp.src(`${config.source.root + config.source.partials}master.html`)
		.pipe(injectPartial('navigation', 'navigation'))
		.pipe(injectPartial('main', 'main'))
		.pipe(rename('index.html'))
		.pipe(gulp.dest(config.build.root))
		.pipe(browserSync.stream());
});

gulp.task('scripts', () => {

});

gulp.task('styles', () => {
	const processors = [
		autoprefixer(config.source.styles.supported),
		cssnano
	];

	return gulp.src(config.source.root + config.source.styles.entry)
		.pipe(sass())
		.on('error', gobbleError)
		.pipe(postcss(processors))
		.pipe(rename('app.min.css'))
		.pipe(gulp.dest(config.build.root + config.build.styles.path))
		.pipe(browser.stream());
});

gulp.task('serve', ['styles', 'scripts', 'inject'], () => {
	browser.init({
		open: true,
		port: config.server.port || '8000',
		notify: false,
		ghostMode: false,
		server: {
			baseDir: config.build.root,
		},
	});

	gulp.watch(config.source.root + config.source.scripts.files, ['scripts'], browser.reload);
	gulp.watch(config.source.root + config.source.styles.files, ['styles']);
	gulp.watch(`${config.source.root + config.source.partials}*.html`, ['inject'], browser.reload);
});

gulp.task('default', ['serve']);
