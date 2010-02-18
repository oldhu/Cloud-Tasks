// Copyright (C) Nik Silver 2010.
// See licence.txt for terms and conditions not explicitly stated elsewhere.

/**
 * General utilities for our tests.
 */

var TestUtils;

YUI().use('test', function(Y){

	TestUtils = {
			
		// Adapted from http://www.lshift.net/blog/2006/08/03/subclassing-in-javascript-part-2
		extend: function(superclass, prototype) {
		    var res = function () {
		        superclass.apply(this, arguments);
		    };
		    var withoutcon = function () {};
		    withoutcon.prototype = superclass.prototype;
		    res.prototype = new withoutcon();
		    for (var k in prototype) {
		        res.prototype[k] = prototype[k];
		    }
		    return res;
		},
		
		assertContains: function(string_to_test, substring_sought, failure_message) {
			Y.assert(string_to_test.indexOf(substring_sought) >= 0,
				failure_message + " (string to test is '" + string_to_test + "')");
		},
		
		getTaskIDToTaskHash: function(task_array) {
			var task_hash = {};
			task_array.each(function(task) {
				task_hash[task.taskID] = task;
			});
			return task_hash;
		},
		
		getLocalIDToTaskHash: function(task_array) {
			var task_hash = {};
			task_array.each(function(task) {
				task_hash[task.localID] = task;
			});
			return task_hash;
		},
		
		showMojoLog: function() {
			TestUtils._show_mojo_log = true;
		},
		
		captureMojoLog: function() {
			TestUtils._Mojo_Log_info = Mojo.Log.info;
			TestUtils._Mojo_Log_warn = Mojo.Log.warn;
			TestUtils._Mojo_Log_error = Mojo.Log.error;
			TestUtils._Mojo_Log_messages = "";
			Mojo.Log.info = function(msg) { TestUtils.writeMojoLog('info', msg) };
			Mojo.Log.warn = function(msg) { TestUtils.writeMojoLog('warn', msg) };
			Mojo.Log.error = function(msg) { TestUtils.writeMojoLog('error', msg) };
		},
		
		writeMojoLog: function(prefix, msg) {
			var output = prefix + ": " + msg;
			TestUtils._Mojo_Log_messages += output + "\n";
			if (TestUtils._show_mojo_log) {
				TestUtils.quickLog(output);
			}
		},
		
		getMojoLog: function() {
			return TestUtils._Mojo_Log_messages;
		},
		
		dumpMojoLog: function() {
			$('logDump').insert(TestUtils.getMojoLog());
		},
		
		restoreMojoLog: function() {
			TestUtils._show_mojo_log = false;
			Mojo.Log.info = TestUtils._Mojo_Log_info;
			Mojo.Log.warn = TestUtils._Mojo_Log_warn;
			Mojo.Log.error = TestUtils._Mojo_Log_error;
		},
		
		quickLog: function(str) {
			$('logDump').insert(str + '\n');
		},
		
		/**
		 * Perform a series of test parts, each of which will only move onto the next
		 * when test.continueRun() is called.
		 * @param {Function} test  The test function.
		 * @param {Number} millis  The number of milliseconds to wait before declaring
		 *     the series of tests a failure.
		 * @param {Array} fns  An array of functions to execute, one at a time.
		 *     Each one must call TestUtils.continueRun() to move onto the next in the series.
		 *     Even the last one must declare call TestUtils.continueRun() to declare that it's done.
		 */
		runInSeries: function(test, millis, fns) {
			var parts = new Array(fns.length + 1);
			parts[0] = fns[0];
			
			var launch = TestUtils.runLatestAndWaitBeforeRunningNextFn(test, millis, fns, parts, 0);
			Mojo.Log.info("Running launch = " + launch);
			TestUtils.continueRun = function(){};
			launch();
		},

		runLatestAndWaitBeforeRunningNextFn: function(test, millis, fns, parts, i) {
			var next;
			if (i+1 == fns.length) {
				next = function(){};
			}
			else {
				next = TestUtils.runLatestAndWaitBeforeRunningNextFn(test, millis, fns, parts, i+1);
			}
			
			var fn = function() {
				Mojo.Log.info("Running fns[" + i + "]");
				Mojo.Log.info("fns[" + i + "] = " + fns[i]);
				fns[i]();
				test.wait(
					next,
					millis
				);
			};
			return fn;
		},
		
		_runInSeries: function(test, millis, fns) {
			var run_next_function = TestUtils.makeFunctionSeries(test, fns);
			//run_next_function();
			setTimeout(run_next_function, 10);
			test.wait(millis + 10);
		},
		
		/**
		 * Used by TestUtils.runInSeries() to make a function which chains its series
		 * of functions.
		 * @param {Object} test  The test function.
		 * @param {Object} fns  The series of functions to call.
		 */
		makeFunctionSeries: function(test, fns) {
			var last_fns = fns.clone();
			var fn0 = last_fns.shift() || function(){ Mojo.Log.info("Running part 6"); test.resume() };
			Mojo.Log.info("Set fn0 = " + fn0);
			var run = function() {
				TestUtils.continueRun = TestUtils.makeFunctionSeries(test, last_fns);
				Mojo.Log.info("Running fn0 of " + last_fns.length + " = " + fn0);
				fn0();
			};
			return run;
		},
		
		prettyPrint: function(obj) {
			if (typeof obj === 'string') {
				return "'" + obj + "'";
			}
			else if (typeof obj === 'number' || typeof obj === 'boolean' || typeof obj === 'function') {
				return obj;
			}
			else if (obj instanceof Array) {
				var out = '[';
				for (var i = 0; i < obj.length; i++) {
					if (i > 0) { out += ", " }
					out = out + TestUtils.prettyPrint(obj[i]);
				}
				return out + ']';
			}
			else {
				var out = '{';
				var had_property = false;
				for (var prop in obj) {
					out = out + prop + ": " + TestUtils.prettyPrint(obj[prop]) + ", ";
					had_property = true;
				}
				if (had_property) {
					out = out.substr(0, out.length-2);
				}
				return out + '}';
			}
		}
	
	}
	
});

