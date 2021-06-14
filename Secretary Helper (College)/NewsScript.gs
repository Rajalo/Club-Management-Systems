var eventsId = "1F4fqMzx1acyEiZ5nMm9nA0mgRPtrD6M5gKaTzw7hry0";
var attendanceId = "1NIzC4BVq1k98wDrhE2eNwECGLLdm6MtWRf1o9UDiCNY";
var newsId = "18XdI-Dbqkg3D-PfVeiFHHHA4pAvaC8Q1tO2Af1Dl3Us";
//Add in your preferred filter words here
var nonowords = [];
/**
 * Creates the required triggers to set up the event adder
 */
function setup() {
  ScriptApp.newTrigger("exportNews").timeBased().onWeekDay(ScriptApp.WeekDay.FRIDAY).create();
  ScriptApp.newTrigger("addNews").forSpreadsheet(newsId).onFormSubmit().create();
}
/**
 * Adds a news story to the list
 */
function addNews(e) {
  var values = e.values;
  var allowancess = SpreadsheetApp.openById(eventsId).getSheetByName("Allowances");
  var eventss = SpreadsheetApp.openById(newsId).getSheetByName("Loading Dock");
  var allowance = allowancess.getRange(2,1,allowancess.getLastRow(),3).getValues();
  for (var i = 0; i < allowance.length;i++)
  {
    if (allowance[i][0]==values[1]&&allowance[i][2]>0)
    {
      var email = values[1] + "";
      var name = email.substring(0,1).toUpperCase()+email.substring(1,email.indexOf(".")) +" " + email.substring(email.indexOf(".")+1,email.indexOf(".")+2).toUpperCase() + ".";
      eventss.appendRow([name,values[2],values[3]]);
    }
  }
  allowancess.getRange(2,1,allowancess.getLastRow(),3).setValues(allowance);;
}
/**
 * Adds the news events to the news list on the attendance sheet
 */
function exportNews()
{
  var sheet = SpreadsheetApp.openById(newsId).getSheetByName("Loading Dock");
  var events = sheet.getRange(1, 1, sheet.getLastRow()+1,3).getValues();
  var target = SpreadsheetApp.openById(attendanceId).getSheetByName("News");
  for (var i = 0; i < events.length-1;i++)
  {
    var event = " "+events[i][1].toLowerCase();
    var name = events[i][0].toLowerCase();
    var desc = events[i][2].toLowerCase();
    var clean = true;
    for (var word of nonowords)
    {
      if (event.indexOf(word)>-1||name.indexOf(word)>-1||desc.indexOf(word)>-1)
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
