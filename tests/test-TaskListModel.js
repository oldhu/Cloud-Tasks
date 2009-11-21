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
			model.setRemoteJSON(this.big_remote_json);
			
			var tasks = model.getRemoteTasks();
			Y.Assert.isArray(tasks, "Tasks is not an array");
			Y.assert(tasks.length > 10, "Tasks is not very long, only got " + tasks.length + " items");
			
			var sample_task;
			for (var i = 0; i < tasks.length; i++) {
				var task = tasks[i];
				Y.Assert.isNotUndefined(task.list_id, "Task " + i + " does not have a list_id");
				Y.Assert.isNotUndefined(task.task_id, "Task " + i + " does not have a task_id");
				Y.Assert.isNotUndefined(task.taskseries_id, "Task " + i + " does not have a taskseries_id");
				Y.Assert.isNotUndefined(task.name, "Task " + i + " does not have a name");
				Y.Assert.isNotUndefined(task.due, "Task " + i + " does not have a due property");
				if (task.task_id == '79139889') {
					sample_task = task;
				}
			}
			
			Y.Assert.areEqual('2637966', sample_task.list_id, "List id not correct");
			Y.Assert.areEqual('55274651', sample_task.taskseries_id, "Taskseries id not correct");
			Y.Assert.areEqual('MB, AB - Update on testing companies', sample_task.name, "Task name not correct");
			Y.Assert.areEqual('2009-12-01T00:00:00Z', sample_task.due, "Task due property not correct");			
		},
		
		testSetRemoteJSONWhichUsesArrays: function() {

			var model = new TaskListModel();
			model.setRemoteJSON(this.remote_json_with_two_lists);
			var tasks = model.getRemoteTasks();

			var task_hash = {};			
			tasks.each(function(task) {
				task_hash[task.task_id] = task;
			});
			
			Y.Assert.areEqual('11122940', task_hash['79648346'].list_id, "Test 1.1");
			Y.Assert.areEqual('55630580', task_hash['79648346'].taskseries_id, "Test 1.2");
			Y.Assert.areEqual('79648346', task_hash['79648346'].task_id, "Test 1.3");
			
			Y.Assert.areEqual('2637966', task_hash['75724449'].list_id, "Test 2.1");
			Y.Assert.areEqual('52954009', task_hash['75724449'].taskseries_id, "Test 2.2");
			Y.Assert.areEqual('75724449', task_hash['75724449'].task_id, "Test 2.3");
			
			Y.Assert.areEqual('2637966', task_hash['66459582'].list_id, "Test 3.1");
			Y.Assert.areEqual('46489199', task_hash['66459582'].taskseries_id, "Test 3.2");
			Y.Assert.areEqual('66459582', task_hash['66459582'].task_id, "Test 3.3");
		},
		
		setUp: function() {
			this.setUpBigRemoteJSON();
			this.setUpRemoteJSONWithTwoLists();
		},
		
		setUpBigRemoteJSON: function() {
			this.big_remote_json = {
			   "rsp":{
			      "stat":"ok",
			      "tasks":{
			         "list":
					 	// Might be an array of list objects, not just a single list object as here
					 	{
			            "id":"2637966",
			            "taskseries":[
			               {
			                  "id":"52954009",
			                  "created":"2009-10-22T20:49:48Z",
			                  "modified":"2009-10-22T20:49:48Z",
			                  "name":"O2 - Expect deposit credited",
			                  "source":"js",
			                  "url":"",
			                  "location_id":"",
			                  "tags":[
			
			                  ],
			                  "participants":[
			
			                  ],
			                  "notes":[
			
			                  ],
			                  "task":{
			                     "id":"75724449",
			                     "due":"2010-01-26T00:00:00Z",
			                     "has_due_time":"0",
			                     "added":"2009-10-22T20:49:48Z",
			                     "completed":"",
			                     "deleted":"",
			                     "priority":"N",
			                     "postponed":"0",
			                     "estimate":""
			                  }
			               },
			               {
			                  "id":"46489199",
			                  "created":"2009-08-06T08:42:04Z",
			                  "modified":"2009-09-03T13:43:00Z",
			                  "name":"MB - Plans for Richard Pope?",
			                  "source":"js",
			                  "url":"",
			                  "location_id":"",
			                  "tags":[
			
			                  ],
			                  "participants":[
			
			                  ],
			                  "notes":[
			
			                  ],
			                  "task":{
			                     "id":"66459582",
			                     "due":"2010-01-08T00:00:00Z",
			                     "has_due_time":"0",
			                     "added":"2009-08-06T08:42:04Z",
			                     "completed":"",
			                     "deleted":"",
			                     "priority":"N",
			                     "postponed":"6",
			                     "estimate":""
			                  }
			               },
			               {
			                  "id":"55274651",
			                  "created":"2009-11-17T10:34:49Z",
			                  "modified":"2009-11-17T10:34:49Z",
			                  "name":"MB, AB - Update on testing companies",
			                  "source":"js",
			                  "url":"",
			                  "location_id":"",
			                  "rrule":{
			                     "every":"0",
			                     "$t":"FREQ=WEEKLY;INTERVAL=2"
			                  },
			                  "tags":[
			
			                  ],
			                  "participants":[
			
			                  ],
			                  "notes":[
			
			                  ],
			                  "task":{
			                     "id":"79139889",
			                     "due":"2009-12-01T00:00:00Z",
			                     "has_due_time":"0",
			                     "added":"2009-11-17T10:34:49Z",
			                     "completed":"",
			                     "deleted":"",
			                     "priority":"N",
			                     "postponed":"0",
			                     "estimate":""
			                  }
			               },
			               {
			                  "id":"54732974",
			                  "created":"2009-11-11T14:51:28Z",
			                  "modified":"2009-11-11T14:51:28Z",
			                  "name":"MH - At furneral",
			                  "source":"js",
			                  "url":"",
			                  "location_id":"",
			                  "tags":[
			
			                  ],
			                  "participants":[
			
			                  ],
			                  "notes":[
			
			                  ],
			                  "task":{
			                     "id":"78338880",
			                     "due":"2009-11-30T00:00:00Z",
			                     "has_due_time":"0",
			                     "added":"2009-11-11T14:51:28Z",
			                     "completed":"",
			                     "deleted":"",
			                     "priority":"N",
			                     "postponed":"0",
			                     "estimate":""
			                  }
			               },
			               {
			                  "id":"54961818",
			                  "created":"2009-11-13T16:37:31Z",
			                  "modified":"2009-11-13T16:37:31Z",
			                  "name":"Roy D'Souza - Progress on DC's remote access?",
			                  "source":"js",
			                  "url":"",
			                  "location_id":"",
			                  "tags":[
			
			                  ],
			                  "participants":[
			
			                  ],
			                  "notes":[
			
			                  ],
			                  "task":{
			                     "id":"78667188",
			                     "due":"2009-11-25T00:00:00Z",
			                     "has_due_time":"0",
			                     "added":"2009-11-13T16:37:31Z",
			                     "completed":"",
			                     "deleted":"",
			                     "priority":"N",
			                     "postponed":"0",
			                     "estimate":""
			                  }
			               },
			               {
			                  "id":"30123455",
			                  "created":"2009-01-06T17:32:51Z",
			                  "modified":"2009-11-18T10:16:41Z",
			                  "name":"PIM - Write up minutes",
			                  "source":"js",
			                  "url":"",
			                  "location_id":"",
			                  "tags":[
			
			                  ],
			                  "participants":[
			
			                  ],
			                  "notes":[
			
			                  ],
			                  "task":{
			                     "id":"79230748",
			                     "due":"2009-11-25T00:00:00Z",
			                     "has_due_time":"0",
			                     "added":"2009-11-18T00:00:48Z",
			                     "completed":"",
			                     "deleted":"",
			                     "priority":"N",
			                     "postponed":"0",
			                     "estimate":""
			                  }
			               },
			               {
			                  "id":"54750411",
			                  "created":"2009-11-11T18:02:25Z",
			                  "modified":"2009-11-11T18:02:25Z",
			                  "name":"Test companies - reject",
			                  "source":"js",
			                  "url":"",
			                  "location_id":"",
			                  "tags":[
			
			                  ],
			                  "participants":[
			
			                  ],
			                  "notes":[
			
			                  ],
			                  "task":{
			                     "id":"78364799",
			                     "due":"2009-11-23T00:00:00Z",
			                     "has_due_time":"0",
			                     "added":"2009-11-11T18:02:25Z",
			                     "completed":"",
			                     "deleted":"",
			                     "priority":"N",
			                     "postponed":"0",
			                     "estimate":""
			                  }
			               },
			               {
			                  "id":"46761347",
			                  "created":"2009-08-10T14:37:54Z",
			                  "modified":"2009-11-16T10:29:52Z",
			                  "name":"Legal - Check updatedoc",
			                  "source":"js",
			                  "url":"",
			                  "location_id":"",
			                  "rrule":{
			                     "every":"1",
			                     "$t":"FREQ=WEEKLY;INTERVAL=1;BYDAY=MO"
			                  },
			                  "tags":[
			
			                  ],
			                  "participants":[
			
			                  ],
			                  "notes":[
			
			                  ],
			                  "task":{
			                     "id":"78909702",
			                     "due":"20 09-11-23T00:00:00Z",
			                     "has_due_time":"0",
			                     "added":"2009-11-16T00:01:32Z",
			                     "completed":"",
			                     "deleted":"",
			                     "priority":"N",
			                     "postponed":"0",
			                     "estimate":""
			                  }
			               },
			               {
			                  "id":"54961430",
			                  "created":"2009-11-13T16:33:34Z",
			                  "modified":"2009-11-18T16:56:07Z",
			                  "name":"Team - speak to!",
			                  "source":"js",
			                  "url":"",
			                  "location_id":"",
			                  "tags":[
			
			                  ],
			                  "participants":[
			
			                  ],
			                  "notes":[
			
			                  ],
			                  "task":{
			                     "id":"78666784",
			                     "due":"2009-11-20T00:00:00Z",
			                     "has_due_time":"0",
			                     "added":"2009-11-13T16:33:34Z",
			                     "completed":"",
			                     "deleted":"",
			                     "priority":"N",
			                     "postponed":"2",
			                     "estimate":""
			                  }
			               },
			               {
			                  "id":"38212211",
			                  "created":"2009-04-15T10:27:42Z",
			                  "modified":"2009-11-13T10:36:34Z",
			                  "name":"Stand-up - Anno unce team catch-up",
			                  "source":"js",
			                  "url":"",
			                  "location_id":"",
			                  "rrule":{
			                     "every":"1",
			                     "$t":"FREQ=WEEKLY;INTERVAL=1"
			                  },
			                  "tags":[
			
			                  ],
			                  "participants":[
			
			                  ],
			                  "notes":[
			
			                  ],
			                  "task":{
			                     "id":"78568998",
			                     "due":"2009-11-20T00:00:00Z",
			                     "has_due_time":"0",
			                     "added":"2009-11-13T00:01:38Z",
			                     "completed":"",
			                     "deleted":"",
			                     "priority":"N",
			                     "postponed":"0",
			                     "estimate":""
			                  }
			               },
			               {
			                  "id":"32135089",
			                  "created":"2009-01-29T08:16:01Z",
			                  "modified":"2009-11-18T16:58:19Z",
			                  "name":"Misc notes - Update",
			                  "source":"js",
			                  "url":"",
			                  "location_id":"",
			                  "rrule":{
			                     "every":"1",
			                     "$t":"FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR"
			                  },
			                  "tags":[
			
			                  ],
			                  "participants":[
			
			                  ],
			                  "notes":[
			
			                  ],
			                  "task":{
			                     "id":"79230749",
			                     "due":"2009-11-20T00:00:00Z",
			                     "has_due_time":"0",
			                     "added":"2009-11-18T00:00:48Z",
			                     "completed":"",
			                     "deleted":"",
			                     "priority":"N",
			                     "postponed":"1",
			                     "estimate":""
			                  }
			               },
			               {
			                  "id":"41932927",
			                  "created":"2009-06-03T14:21:01Z",
			                  "modified":"2009-11-18T16:53:56Z",
			                  "name":"Micro-apps - Track",
			                  "source":"js",
			                  "url":"",
			                  "location_id":"",
			                  "tags":[
			
			                  ],
			                  "participants":[
			
			                  ],
			                  "notes":[
			
			                  ],
			                  "task":{
			                     "id":"59675483",
			                     "due":"2009-11-20T00:00:00Z",
			                     "has_due_time":"0",
			                     "added":"2009-06-03T14:21:01Z",
			                     "completed":"",
			                     "deleted":"",
			                     "priority":"N",
			                     "postponed":"",
			                     "estimate":""
			                  }
			               },
			               {
			                  "id":"48560123",
			                  "created":"2009-09-02T10:55:14Z",
			                  "modified":"2009-11-18T10:37:18Z",
			                  "name":"MH - Roadmap measurements report?",
			                  "source":"js",
			                  "url":"",
			                  "location_id":"",
			                  "tags":[
			
			                  ],
			                  "participants":[
			
			                  ],
			                  "notes":[
			
			                  ],
			                  "task":{
			                     "id":"69463342",
			                     "due":"2009-11-20T00:00:00Z",
			                     "has_due_time":"0",
			                     "added":"2009-09-02T10:55:14Z",
			                     "completed":"",
			                     "deleted":"",
			                     "priority":"N",
			                     "postponed":"5",
			                     "estimate":""
			                  }
			               },
			               {
			                  "id":"27451945",
			                  "created":"2008-11-30T20:32:34Z",
			                  "modified":"2009-11-12T17:38:52Z",
			                  "name":"MB - Report for CDs' meeting",
			                  "source":"js",
			                  "url":"",
			                  "location_id":"",
			                  "rrule":{
			                     "every":"1",
			                     "$t":"FREQ=WEEKLY;INTERVAL=1;BYDAY=FR"
			                  },
			                  "tags":[
			
			                  ],
			                  "participants":[
			
			                  ],
			                  "notes":[
			
			                  ],
			                  "task":{
			                     "id":"78531435",
			                     "due":"2009-11-20T00:00:00Z",
			                     "has_due_time":"0",
			                     "added":"2009-11-12T17:38:52Z",
			                     "completed":"",
			                     "deleted":"",
			                     "priority":"N",
			                     "postponed":"0",
			                     "estimate":""
			                  }
			               },
			               {
			                  "id":"51963692",
			                  "created":"2009-10-12T10:55:46Z",
			                  "modified":"2009-11-06T16:22:08Z",
			                  "name":"HI - WorldPay ownership?",
			                  "source":"js",
			                  "url":"",
			                  "location_id":"",
			                  "tags":[
			
			                  ],
			                  "participants":[
			
			                  ],
			                  "notes":[
			
			                  ],
			                  "task":{
			                     "id":"74322972",
			                     "due":"2009-11-20T00:00:00Z",
			                     "has_due_time":"0",
			                     "added":"2009-10-12T10:55:46Z",
			                     "completed":"",
			                     "deleted":"",
			                     "priority":"N",
			                     "postponed":"0",
			                     "estimate":""
			                  }
			               },
			               {
			                  "id":"54965930",
			                  "created":"2009-11-13T17:29:39Z",
			                  "modified":"2009-11-18T16:55:27Z",
			                  "name":"Gumtree - Prepare presentation",
			                  "source":"js",
			                  "url":"",
			                  "location_id":"",
			                  "tags":[
			
			                  ],
			                  "participants":[
			
			                  ],
			                  "notes":[
			
			                  ],
			                  "task":{
			                     "id":"78671852",
			                     "due":"2009-11-20T00:00:00Z",
			                     "has_due_time":"0",
			                     "added":"2009-11-13T17:29:39Z",
			                     "completed":"",
			                     "deleted":"",
			                     "priority":"N",
			                     "postponed":"2",
			                     "estimate":""
			                  }
			               },
			               {
			                  "id":"54937892",
			                  "created":"2009-11-13T11:20:49Z",
			                  "modified":"2009-11-18T16:54:59Z",
			                  "name":"GB - Plan and progress on micro-app envs?",
			                  "source":"js",
			                  "url":"",
			                  "location_id":"",
			                  "tags":[
			
			                  ],
			                  "participants":[
			
			                  ],
			                  "notes":[
			
			                  ],
			                  "task":{
			                     "id":"78631928",
			                     "due":"2009-11-20T00:00:00Z",
			                     "has_due_time":"0",
			                     "added":"2009-11-13T11:20:49Z",
			                     "completed":"",
			                     "deleted":"",
			                     "priority":"N",
			                     "postponed":"0",
			                     "estimate":""
			                  }
			               },
			               {
			                  "id":"27451972",
			                  "created":"2008-11-30T20:33:00Z",
			                  "modified":"2009-11-13T10:51:11Z",
			                  "name":"Data - back up",
			                  "source":"js",
			                  "url":"",
			                  "location_id":"",
			                  "rrule":{
			                     "every":"1",
			                     "$t":"FREQ=WEEKLY;INTERVAL=1;BYDAY=FR"
			                  },
			                  "tags":[
			
			                  ],
			                  "participants":[
			
			                  ],
			                  "notes":[
			
			                  ],
			                  "task":{
			                     "id":"78568996",
			                     "due":"2009-11-20T00:00:00Z",
			                     "has_due_time":"0",
			                     "added":"2009-11-13T00:01:38Z",
			                     "completed":"",
			                     "deleted":"",
			                     "priority":"N",
			                     "postponed":"0",
			                     "estimate":""
			                  }
			               }
			            ]
			         }
			      }
			   }
			}; // big_remote_json
		},

		setUpRemoteJSONWithTwoLists: function() {
			this.remote_json_with_two_lists = {
			   "rsp":{
			      "stat":"ok",
			      "tasks":{
			         "list": [{
					 	"id": "11122940",
						"taskseries": {
							"id": "55630580",
							"created": "2009-11-20T21:11:26Z",
							"modified": "2009-11-20T21:11:26Z",
							"name": "NS - test the list number 1",
							"source": "js",
							"url": "",
							"location_id": "",
							"tags": [],
							"participants": [],
							"notes": [],
							"task": {
								"id": "79648346",
								"due": "",
								"has_due_time": "0",
								"added": "2009-11-20T21:11:26Z",
								"completed": "",
								"deleted": "",
								"priority": "N",
								"postponed": "0",
								"estimate": ""
							}
						}},
					 	{
			            "id":"2637966",
			            "taskseries":[
			               {
			                  "id":"52954009",
			                  "created":"2009-10-22T20:49:48Z",
			                  "modified":"2009-10-22T20:49:48Z",
			                  "name":"O2 - Expect deposit credited",
			                  "source":"js",
			                  "url":"",
			                  "location_id":"",
			                  "tags":[
			
			                  ],
			                  "participants":[
			
			                  ],
			                  "notes":[
			
			                  ],
			                  "task":{
			                     "id":"75724449",
			                     "due":"2010-01-26T00:00:00Z",
			                     "has_due_time":"0",
			                     "added":"2009-10-22T20:49:48Z",
			                     "completed":"",
			                     "deleted":"",
			                     "priority":"N",
			                     "postponed":"0",
			                     "estimate":""
			                  }
			               },
			               {
			                  "id":"46489199",
			                  "created":"2009-08-06T08:42:04Z",
			                  "modified":"2009-09-03T13:43:00Z",
			                  "name":"MB - Plans for Richard Pope?",
			                  "source":"js",
			                  "url":"",
			                  "location_id":"",
			                  "tags":[
			
			                  ],
			                  "participants":[
			
			                  ],
			                  "notes":[
			
			                  ],
			                  "task":{
			                     "id":"66459582",
			                     "due":"2010-01-08T00:00:00Z",
			                     "has_due_time":"0",
			                     "added":"2009-08-06T08:42:04Z",
			                     "completed":"",
			                     "deleted":"",
			                     "priority":"N",
			                     "postponed":"6",
			                     "estimate":""
			                  }
		           		   } // Close taskseries
	                  	] // Close array of taskseries
		           	 } // Close that list
		          ] // Close all lists
		       } // Close tasks object
	        } // Close rsp
		  }; // remote_json_with_two_lists


		}

	});

} );