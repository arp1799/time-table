/// <reference path="MindFusion.Scheduling-vsdoc.js" />
var p = MindFusion.Scheduling;

// create a new instance of the calendar
calendar = new p.Calendar(document.getElementById("calendar"));
// set the view to Timetable, which displays the allotment of resources to distinct hours of a day
calendar.currentView = p.CalendarView.Timetable;

calendar.theme = "peach";
calendar.contactNameFormat = "L";
console.log(calendar)


// console.log(calendar.mfp.getrow(6));

// console.log(calendar.getTimeCell(1,2))

var resource;

// Add some contacts to the schedule.contacts collection.
resource = new p.Contact();
resource.lastName = "Monday";
calendar.schedule.contacts.add(resource);

resource = new p.Contact();

resource.lastName = "Tuesday";
calendar.schedule.contacts.add(resource);

resource = new p.Contact();
resource.lastName = "Wednesday";
calendar.schedule.contacts.add(resource);

resource = new p.Contact();

resource.lastName = "Thrusday";
calendar.schedule.contacts.add(resource);


resource = new p.Contact();

resource.lastName = "Friday";
calendar.schedule.contacts.add(resource);

// Add some locations to the schedule.locations collection.
resource = new p.Location();
resource.name = "VLTC-406";
calendar.schedule.locations.add(resource);

resource = new p.Location();
resource.name = "VLTC-408";
calendar.schedule.locations.add(resource);

resource = new p.Location();
resource.name = "IIIT L1";
calendar.schedule.locations.add(resource);

resource = new p.Location();
resource.name = "IP LAB";
calendar.schedule.locations.add(resource);


resource = new p.Location();
resource.name = "SW2 LAB";
calendar.schedule.locations.add(resource);

resource = new p.Location();
resource.name = "IIITK LAB";
calendar.schedule.locations.add(resource);

resource = new p.Location();
resource.name = "IIITK CR";
calendar.schedule.locations.add(resource);

// group the calendar
group(p.GroupType.GroupByContacts);




// render the calendar control
calendar.render();

// datePicker = new p.Calendar(document.getElementById("datePicker"));
// datePicker.currentView = p.CalendarView.List;
// datePicker.theme = "peach";
// datePicker.listSettings.visibleCells = datePicker.listSettings.numberOfCells = 10;
// datePicker.listSettings.headerStyle = p.MainHeaderStyle.None;
// datePicker.useForms = false;
// datePicker.selectionEnd.addEventListener(handleSelectionEnd);
// datePicker.render();




function handleSelectionEnd(sender, args) {
	var startDate = args.startTime;
	var endDate = args.endTime;

	// show the selected date range in the timetable
	calendar.timetableSettings.dates.clear();
	while (startDate < endDate) {
		calendar.timetableSettings.dates.add(startDate);
		startDate = p.DateTime.addDays(startDate, 1);
	}
}

calendar.timetableSettings.headerStyle = p.MainHeaderStyle.Title
	calendar.timetableSettings.cellSize = 75;
	calendar.timetableSettings.startTime = 480
	calendar.timetableSettings.endTime = 18 * 60
	
	calendar.timetableSettings.cellTime = p.TimeSpan.fromMinutes(60);

    document.getElementById("orientation").value = calendar.timetableSettings.orientation;
    document.getElementById("orientation").onchange = function () {
        calendar.timetableSettings.orientation = +document.getElementById("orientation").value;
        document.getElementById("orientation").value = calendar.timetableSettings.orientation;
    }


function group(value) {
	calendar.contacts.clear();
	if (value == p.GroupType.GroupByContacts) {
		// add the contacts by which to group to the calendar.contacts collection
		calendar.contacts.addRange(calendar.schedule.contacts.items());
	}
	calendar.locations.clear();
	if (value == p.GroupType.GroupByLocations) {
		// add the locations by which to group to the calendar.locations collection
		calendar.locations.addRange(calendar.schedule.locations.items());
	}
	calendar.groupType = value;
}

calendar.itemDoubleClick.addEventListener(function (sender, args) {
	var form = new CustomForm(sender, args.item, "edit");
	form.showForm();
})



