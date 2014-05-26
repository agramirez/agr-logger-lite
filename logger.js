(function () {
    function Logger() {
        var _on = false, _tab = '';

        return {
            expose: {
                log: function (msg) {
                    // do not display log message if logging is not on
                    if (!_on) { return false; }

                    console.log(msg);
                }
            },
            isOn: function () {
                return _on;
            },
            isOff: function () {
                return !_on;
            },
            on: function () {
                _tab = '';
                _on = true;

                return this;
            },
            off: function () {
                _tab = '';
                _on = false;

                return this;
            },
            log: function (msg) {
                // don't do anything if logging is off...it saves cpu cycles
                if (this.isOff()) { return this; }

                this.expose.log(_tab + msg);

                return this;
            },
            msg: function (msg) {
                // don't do anything if logging is off...it saves cpu cycles
                if (this.isOff()) { return this; }

                this.expose.log(_tab + msg);

                return this;
            },
            start: function (name) {
                // don't do anything if logging is off...it saves cpu cycles
                if (this.isOff()) { return this; }

                // precede start message with an empty line, for clarity's save
                this.log('');

                // now show start message
                this.msg('START::[' + name + ']');

                // add tab indentation on start
                _tab += '  ';

                return this;
            },
            end: function (name) {
                // don't do anything if logging is off...it saves cpu cycles
                if (this.isOff()) { return this; }

                // remove tab indentation before end (so start and end match
                _tab = _tab.length > 2 ? _tab.substr(0, _tab.length - 2) : '';

                this.msg('END::::[' + name + ']');

                // postfix with an empty line, for clarity's save
                this.log('');

                return this;
            },
            val: function (vals) {
                // don't do anything if logging is off...it saves cpu cycles
                if (this.isOff()) { return this; }

                // display value of each property
                for (var p in vals) {
                    // if the property is an object call this function on that object
                    if (typeof vals[p] == '[object]') {
                        this.val(vals[p])
                    } else {
                        // for simple values display the data
                        this.msg('    ' + p + ' = ' + vals[p]);
                    }
                }

                return this;
            },
            startOn: function (name) {
                // turn debugging on and set function start
                this.on();
                this.start(name);

                return this;
            },
            endOff: function (name) {
                // set function end and turn debugging off
                this.end(name);
                this.off();

                return this;
            }
        };
    }

    if (define) {
        define([], Logger);
    }
})(window);
