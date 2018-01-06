server_start: _server_start
server_stop: _server_stop
pow: _pow

_server_start:
	./bin/console server:start
_server_stop:
	./bin/console server:stop
_pow:
	echo "http://192.168.99.100:80" > ~/.pow/demo
	echo "http://192.168.99.100:8025" > ~/.pow/mail
