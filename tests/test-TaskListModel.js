/**
 * Test the task list model
 */

testCases.push( function(Y) {

	return new Y.Test.Case({

		testConstructor: function() {
			var model = new TaskListModel();
			Y.Assert.isNotUndefined(model, "Model can't be constructed");
		},
		
		testSetRemoteJSON: function() {
			var model = new TaskListModel();
			model.setRemoteJSON(SampleTestData.big_remote_json);
			
			var tasks = model.getRemoteTasks();
			Y.Assert.isArray(tasks, "Tasks is not an array");
			Y.assert(tasks.length > 10, "Tasks is not very long, only got " + tasks.length + " items");
			
			var sample_task;
			for (var i = 0; i < tasks.length; i++) {
				var task = tasks[i];
				Y.Assert.isNotUndefined(task.listID, "Task " + i + " does not have a listID");
				Y.Assert.isNotUndefined(task.taskID, "Task " + i + " does not have a taskID");
				Y.Assert.isNotUndefined(task.taskseriesID, "Task " + i + " does not have a taskseriesID");
				Y.Assert.isNotUndefined(task.name, "Task " + i + " does not have a name");
				Y.Assert.isNotUndefined(task.due, "Task " + i + " does not have a due property");
				if (task.taskID == '79139889') {
					sample_task = task;
				}
			}
			
			Y.Assert.areEqual('2637966', sample_task.listID, "List id not correct");
			Y.Assert.areEqual('55274651', sample_task.taskseriesID, "Taskseries id not correct");
			Y.Assert.areEqual('MB, AB - Update on testing companies', sample_task.name, "Task name not correct");
			Y.Assert.areEqual('2009-12-01T00:00:00Z', sample_task.due, "Task due property not correct");			
		},
		
		testSetRemoteJSONWhichUsesArrays: function() {

			var model = new TaskListModel();
			model.setRemoteJSON(SampleTestData.remote_json_with_two_lists);
			var tasks = model.getRemoteTasks();

			var task_hash = {};
			tasks.each(function(task) {
				task_hash[task.taskID] = task;
			});
			
			Y.Assert.areEqual('11122940', task_hash['79648346'].listID, "Test 1.1");
			Y.Assert.areEqual('55630580', task_hash['79648346'].taskseriesID, "Test 1.2");
			Y.Assert.areEqual('79648346', task_hash['79648346'].taskID, "Test 1.3");
			
			Y.Assert.areEqual('2637966', task_hash['75724449'].listID, "Test 2.1");
			Y.Assert.areEqual('52954009', task_hash['75724449'].taskseriesID, "Test 2.2");
			Y.Assert.areEqual('75724449', task_hash['75724449'].taskID, "Test 2.3");
			
			Y.Assert.areEqual('2637966', task_hash['66459582'].listID, "Test 3.1");
			Y.Assert.areEqual('46489199', task_hash['66459582'].taskseriesID, "Test 3.2");
			Y.Assert.areEqual('66459582', task_hash['66459582'].taskID, "Test 3.3");
		},
		
		testGetRemoteTasksIsSorted: function() {
			var model = new TaskListModel();
			model.setRemoteJSON(SampleTestData.big_remote_json);
			var tasks = model.getRemoteTasks();
			var last_date = tasks[0].due;
			
			for (var i = 0; i < tasks.length; i++) {
				var this_date = tasks[i].due;
				Y.assert(last_date <= this_date, "Date for task[" + i + "] is " + this_date + " but comes after " + last_date);
				last_date = this_date;
			}
		},

		testDueTasksFlagged: function() {

			var model = new TaskListModel();

			model.setRemoteJSON(SampleTestData.remote_json_with_overdue_tasks);
			var tasks = model.getRemoteTasks();

			var task_hash = {};			
			tasks.each(function(task) {
				task_hash[task.taskID] = task;
				task.today = function() {
					return Date.parse('1 Dec 2009'); // 1st Dec 2009 is a Tuesday
				};
				task.update();
			});
			
			Y.Assert.areEqual(true, task_hash['79648346'].isDueFlag, "Test 1: No due date");
			Y.Assert.areEqual(true, task_hash['75724449'].isDueFlag, "Test 2: A while back");
			Y.Assert.areEqual(false, task_hash['66459582'].isDueFlag, "Test 3: The future");
			Y.Assert.areEqual(true, task_hash['11223344'].isDueFlag, "Test 4: Today");
		},
		
		testOverdueTasksFlagged: function() {

			var model = new TaskListModel();
			model.today = function() {
				return Date.parse('1 Dec 2009'); // 1st Dec 2009 is a Tuesday
			};

			model.setRemoteJSON(SampleTestData.remote_json_with_overdue_tasks);
			var tasks = model.getRemoteTasks();

			var task_hash = {};
			tasks.each(function(task) {
				task_hash[task.taskID] = task;
			});
			
			Y.Assert.areEqual(false, task_hash['79648346'].isOverdueFlag, "Test 1: No due date");
			Y.Assert.areEqual(true, task_hash['75724449'].isOverdueFlag, "Test 2: A while back");
			Y.Assert.areEqual(false, task_hash['66459582'].isOverdueFlag, "Test 3: The future");
			Y.Assert.areEqual(false, task_hash['11223344'].isOverdueFlag, "Test 4: Today");
		},
		
		testDueDateFormatter: function() {
			var model = new TaskListModel();
			model.today = function() {
				return Date.parse('1 Dec 2009'); // 1st Dec 2009 is a Tuesday
			};
			
			// Various forms of today (Tue)
			Y.Assert.areEqual('Today', model.dueDateFormatter('2009-12-01T00:00:00Z'), 'Test today 1');
			Y.Assert.areEqual('Today', model.dueDateFormatter('2009-12-01T13:27:08Z'), 'Test today 2');
			
			// Various forms of tomorrow (Wed)
			Y.Assert.areEqual('Tomorrow', model.dueDateFormatter('2009-12-02T00:00:00Z'), 'Test tomorrow 1');
			Y.Assert.areEqual('Tomorrow', model.dueDateFormatter('2009-12-02T14:54:22Z'), 'Test tomorrow 2');
			
			// Dates within the next week (Thu to Mon)
			Y.Assert.areEqual('Thu', model.dueDateFormatter('2009-12-03T14:54:22Z'), 'Test Thu');
			Y.Assert.areEqual('Fri', model.dueDateFormatter('2009-12-04T14:54:22Z'), 'Test Fri');
			Y.Assert.areEqual('Sat', model.dueDateFormatter('2009-12-05T14:54:22Z'), 'Test Sat');
			Y.Assert.areEqual('Sun', model.dueDateFormatter('2009-12-06T14:54:22Z'), 'Test Sun');
			Y.Assert.areEqual('Mon', model.dueDateFormatter('2009-12-07T14:54:22Z'), 'Test Mon');
			
			// Dates with the next 12 months
			Y.Assert.areEqual('Fri 8 Jan', model.dueDateFormatter('2010-01-08T14:54:22Z'), 'Test year 1');
			Y.Assert.areEqual('Mon 12 Jul', model.dueDateFormatter('2010-07-12T14:54:22Z'), 'Test year 2');
			Y.Assert.areEqual('Tue 30 Nov', model.dueDateFormatter('2010-11-30T14:54:22Z'), 'Test year 3');
			
			// Dates beyond next 12 months
			Y.Assert.areEqual('Wed 1 Dec 2010', model.dueDateFormatter('2010-12-01T14:54:22Z'), 'Test over year 1');
			Y.Assert.areEqual('Thu 2 Dec 2010', model.dueDateFormatter('2010-12-02T14:54:22Z'), 'Test over year 2');
			Y.Assert.areEqual('Fri 25 Feb 2011', model.dueDateFormatter('2011-02-25T14:54:22Z'), 'Test over year 3');
			
			// Non-times should give 'None'
			Y.Assert.areEqual('None', model.dueDateFormatter(''), 'Test none-time 1');
			Y.Assert.areEqual('None', model.dueDateFormatter('xxx'), 'Test none-time 2');
			Y.Assert.areEqual('None', model.dueDateFormatter({}), 'Test none-time 3');
			Y.Assert.areEqual('None', model.dueDateFormatter(), 'Test none-time 4');
			
			// Overdue dates
			Y.Assert.areEqual('Sun 22 Nov', model.dueDateFormatter('2009-11-22T14:54:22Z'), 'Test overdue 1');
			Y.Assert.areEqual('Mon 2 Jun', model.dueDateFormatter('2008-06-02T14:54:22Z'), 'Test overdue 2');
		},
				
		testTaskListStorage: function() {
			var tasklist = new TaskListModel();
			
			tasklist.setTaskList({ something: 'here' });
			Y.Assert.areEqual('here', tasklist.getTaskList().something, 'Task list does not hold properties after being set');

			tasklist.saveTaskList();
			var tasklist2 = new TaskListModel();
			Y.Assert.isArray(tasklist2.getTaskList(), "Task list is not initially an array");
			Y.Assert.areEqual(0, tasklist2.getTaskList().length, "Task list array is not initially empty");
			
			tasklist2.loadTaskList();
			Y.Assert.areEqual('here', tasklist2.getTaskList().something, 'Task list does not hold properties after being set');
		},

	});

} );