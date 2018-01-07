server_start: _server_start
server_stop: _server_stop
pow: _pow
webpack: _webpack
webpack_dev: _webpack_dev
webpack_build: _webpack_build

_server_start:
	./bin/console server:start
_server_stop:
	./bin/console server:stop
_pow:
	echo "http://192.168.99.100:80" > ~/.pow/demo
	echo "http://192.168.99.100:8025" > ~/.pow/mail
_webpack:
	./node_modules/.bin/webpack
_webpack_dev:
	./node_modules/.bin/webpack-dev-server
_webpack_build:
	APP_ENV=prod ./node_modules/.bin/webpack