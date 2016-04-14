import autoprefixer from 'autoprefixer';
import babel from 'gulp-babel';
import browserSync from 'browser-sync';
import config from './config.json';
import cssnano from 'cssnano';
import fs from 'fs';
import gulp from 'gulp';
import inject from 'gulp-inject';
import path from 'path';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import imageOptimize from 'gulp-image';

const browser = browserSync.create();

function gobbleError(error) {
	console.error(error.toString());
	this.emit('end');
}

gulp.task('images', () => {
	gulp.src(`${config.source.root + config.source.images}**/*`)
		.pipe(imageOptimize())
		.pipe(gulp.dest(config.build.root + config.build.images.path));
});

function injectPartial(token, fileName) {
	return inject(gulp.src(`${config.source.root + config.source.partials + fileName}.html`), {
		removeTags: true,
		starttag: `<!-- inject:${token}:{{ext}} -->`,
		transform: (filePath, file) => {
			return file.contents.toString('utf8');
		}
	})
	.on('error', gobbleError)
}

gulp.task('generate-html', () => {
	const files = fs.readdirSync(config.source.root);

	files.forEach(file => {
		if (path.extname(file) === '.html') {
			gulp.src(config.source.root + file)
				.pipe(inject(gulp.src(`${config.source.root + config.source.partials}navigation.html`), {
					removeTags: true,
					starttag: '<!-- inject:navigation:{{ext}} -->',
					transform: (filePath, file) => {
						return file.contents.toString('utf8');
					}
				}))
				.pipe(gulp.dest(config.build.root))
				.pipe(browser.stream());
		}
	});
});

gulp.task('scripts', () => {
	return gulp.src(config.source.root + config.source.scripts.entry)
		.pipe(babel())
		.on('error', gobbleError)
		.pipe(rename('app.js'))
		.pipe(gulp.dest(config.build.root + config.build.scripts.path))
		.pipe(browser.stream());
});

gulp.task('styles', () => {
	const processors = [
		autoprefixer(config.source.styles.supported)
	];

	return gulp.src(config.source.root + config.source.styles.entry)
		.pipe(sass())
		.on('error', gobbleError)
		.pipe(postcss(processors))
		.pipe(rename('app.css'))
		.pipe(gulp.dest(config.build.root + config.build.styles.path))
		.pipe(postcss([cssnano]))
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

	gulp.watch(config.source.root + config.source.scripts.files, ['scripts']);
	gulp.watch(config.source.root + config.source.styles.files, ['styles']);
	gulp.watch([`${config.source.root}*.html`, `${config.source.root + config.source.partials}*.html`], ['generate-html'], browser.reload);
});

gulp.task('default', ['serve']);
