rjs:
	cd static/js; node components/rjs/dist/r.js -o main.build.js; cd -
	cd static/js; node components/rjs/dist/r.js -o external.build.js; cd -

serve:
	python -m SimpleHTTPServer 8080
