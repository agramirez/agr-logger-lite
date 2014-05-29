(function (w, undefined) {
    function Logger() {
        var _on = false, _tab = '';

        return {
            /** 
             * @description Exposes internal properties for testing purposes...poke around in hee at your own riks 
             */
            expose: {
                log: function (msg) {
                    // do not display log message if logging is not on
                    if (!_on) { return false; }

                    console.log(msg);
                },
                on: _on,
                tab: _tab
            },
            /** 
             * @description Checks if logger is on or off.
             * @returns True if on, false otherwise.
             */
            isOn: function () {
                return _on;
            },
            /** 
             * @description Checks if logger is on or off.
             * @returns True if off, false otherwise.
             */
            isOff: function () {
                return !_on;
            },
            /** 
             * @description Turns logging output on.
             * @returns Reference to this.
             */
            on: function () {
                _tab = '';
                _on = true;

                return this;
            },
            /** 
             * @description Turns logging output off.
             * @returns Reference to this.
             */
            off: function () {
                _tab = '';
                _on = false;

                return this;
            },
            /** 
             * @description Logs output messages regardless of whether or not logging is on.
             * @returns Reference to this.
             */
            log: function (msg) {
                this.expose.log(_tab + msg);

                return this;
            },
            /** 
             * @description Logs output messages if loggin is on.
             * @param {String} [msg] Message to log.
             * @returns Reference to this.
             */
            msg: function (msg) {
                // don't do anything if logging is off...it saves cpu cycles
                if (this.isOff()) { return this; }

                this.expose.log(_tab + msg);

                return this;
            },
            /** 
             * @description Displays the start of a code block and indents any subsequent messages.  
             *              Displays output only when loggin is on.
             * @param {String} [name] Name of the function or code block being started.
             * @returns Reference to this.
             */
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
            /** 
             * @description Displays the end of a code block and indents any subsequent messages.  
             *              Displays output only when loggin is on.
             * @param {String} [name] Name of the function or code block being ended.
             * @returns Reference to this.
             */
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
            /** 
             * @description Displays the properties of the vals parameter as name/value pairs..
             * @param {Object} [vals] Object with properties to be displayed..
             * @returns Reference to this.
             */
            val: function (vals) {
                // don't do anything if logging is off...it saves cpu cycles
                if (this.isOff()) { return this; }

                // display value of each property
                for (var p in vals) {
                    // if the property is an object call this function on that object
                    if (typeof vals[p] == 'object') {
                        this.val(vals[p])
                    } else {
                        // for simple values display the data
                        this.msg('    ' + p + ' = ' + vals[p]);
                    }
                }

                return this;
            },
            /** 
             * @description Displays the start of a code block and indents any subsequent messages.
             *              It also implicitly calls logger.on() to turn on any subsequent messages.
             *              Always displays ouput and any messages after calling this function will also
             *              be displayed.
             * @param {String} [name] Name of the function or code block being started.
             * @returns Reference to this.
             */
            startOn: function (name) {
                // turn debugging on and set function start
                this.on();
                this.start(name);

                return this;
            },
            /** 
             * @description Displays the end of a code block and indents any subsequent messages.
             *              It also implicitly calls logger.off() to stop any subsequent messages from 
             *              being displayed.  Displays output only when loggin is on.
             * @param {String} [name] Name of the function or code block being ended.
             * @returns Reference to this.
             */
            endOff: function (name) {
                // set function end and turn debugging off
                this.end(name);
                this.off();

                return this;
            }
        };
    }

    // used for requirejs define
    if (define !== undefined && define !== null) {
        define([], Logger);
    }

    // used for node's require
    if (module !== undefined && module !== null) {
        module = Logger
    }

    // if all else fails try to bing directory to the window for web contexts
    if (define === undefined && module === undefined && w !== undefined) {
        w.logger = new Logger();
    }
})(window);
