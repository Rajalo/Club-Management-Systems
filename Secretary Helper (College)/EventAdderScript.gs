//Add in your preferred filter words here
var nonoWords = [];
var eventsId = "1F4fqMzx1acyEiZ5nMm9nA0mgRPtrD6M5gKaTzw7hry0";
var attendanceId = "1NIzC4BVq1k98wDrhE2eNwECGLLdm6MtWRf1o9UDiCNY";
/**
 * Creates the required triggers to set up the event adder
 */
function setup() {
  ScriptApp.newTrigger("addAllowance").timeBased().onWeekDay(ScriptApp.WeekDay.SATURDAY).create();
  ScriptApp.newTrigger("exportEvents").timeBased().onWeekDay(ScriptApp.WeekDay.FRIDAY).create();
  ScriptApp.newTrigger("addEvent").forSpreadsheet(eventsId).onFormSubmit().create();
}
/**
 * Adds an event to the event list
 */
function addEvent(e) {
  var values = e.values;
  var allowancess = SpreadsheetApp.openById(eventsId).getSheetByName("Allowances");
  var eventss = SpreadsheetApp.openById(eventsId).getSheetByName("Loading Dock");
  var allowance = allowancess.getRange(2,1,allowancess.getLastRow(),3).getValues();
  for (var i = 0; i < allowance.length;i++)
  {
    if (allowance[i][0]==values[1]&&allowance[i][1]>=1)
    {
      eventss.appendRow([values[2],values[3]]);
      allowance[i][1]--;
    }
  }
  allowancess.getRange(2,1,allowancess.getLastRow(),3).setValues(allowance);
}
/**
 * Adds the prescribed allowance to the user
 */
function addAllowance() {
  var allowancess = SpreadsheetApp.openById(eventsId).getSheetByName("Allowances");
  var memberss = SpreadsheetApp.openById(attendanceId).getSheetByName("Member List");
  var allowance = allowancess.getRange(2,1,allowancess.getLastRow(),3).getValues();
  var member = memberss.getRange(2,1,memberss.getLastRow(),3).getValues();
  for (var i = 0; i <allowance.length;i++)
  {
    allowance[i][1]+=allowance[i][2];
  }
  allowancess.getRange(2,1,allowancess.getLastRow(),3).setValues(allowance);
  for (var i = 0; i < member.length;i++)
  {
    if (member[i][2]>=6)
    {
      var newby = true;
      for (var j = 0; j < allowance.length;j++)
      {
        if (allowance[j][0] == member[i][0])
        {
          newby = false;
          break;
        }
      }
      if(newby)
      {
        allowancess.appendRow([member[i][0],1,.25])
      }
    }    
  }
}
/**
 * Exports the events to the attendance sheet
 */
function exportEvents()
{
  var sheet = SpreadsheetApp.openById(eventsId).getSheetByName("Loading Dock");
  if (sheet.getLastRow()==0)
    return;
  var events = sheet.getRange(1, 1, sheet.getLastRow(),2).getValues();
  var target = SpreadsheetApp.openById(attendanceId).getSheetByName("Upcoming Events");
  for (var i = 0; i < events.length;i++)
  {
    var event = " "+events[i][1].toLowerCase();
    var clean = true;
    for (var word of nonowords)
    {
      if (event.indexOf(word)>-1)
      {
        clean = false;
        break;
      }
    }
    if (clean)
    {
      target.appendRow(events[i]);
    }
    sheet.deleteRow(1);
  }
}
