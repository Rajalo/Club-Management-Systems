var attendanceId = "1NIzC4BVq1k98wDrhE2eNwECGLLdm6MtWRf1o9UDiCNY"
/**
 * Creates the required triggers to set up the basic functions
 */
function setup() {
  ScriptApp.newTrigger("writeEmail").timeBased().onWeekDay(ScriptApp.WeekDay.SATURDAY).create();
  ScriptApp.newTrigger("dateCleaner").timeBased().onWeekDay(ScriptApp.WeekDay.FRIDAY).create();
  ScriptApp.newTrigger("signIn").forSpreadsheet(attendanceId).onFormSubmit().create();
}
/**
 * Generates an email that is sent to the secretary so they can make sure
 * there's no errors before sending it to the populace
 */
 function writeEmail() {
   var body = "Hey comrades,\r\n";
   var ss = SpreadsheetApp.openById(attendanceId);
   var date = new Date();
   var meetings = ss.getSheetByName("Meetings").getRange(2, 1, ss.getSheetByName("Meetings").getLastRow(),ss.getSheetByName("Meetings").getLastColumn()).getValues();
   if (meetings[0][0] == "")
    return;
   var events = ss.getSheetByName("Upcoming Events").getRange(2, 1, ss.getSheetByName("Upcoming Events").getLastRow(),ss.getSheetByName("Upcoming Events").getLastColumn()).getValues();
   var reminders = ss.getSheetByName("Reminders").getRange(2, 1, ss.getSheetByName("Reminders").getLastRow(),ss.getSheetByName("Reminders").getLastColumn()).getValues();
   var news = ss.getSheetByName("News").getRange(2, 1, ss.getSheetByName("News").getLastRow(),ss.getSheetByName("News").getLastColumn()).getValues();
   var sec = meetings[0][8];
  var immediates = [];
  for (var i = 0; i < meetings.length;i++)
  {
    var str = meetings[i][0];
    var comparison = new Date(str);
    if (comparison-date>0&&comparison-date<604800000)
    {
       immediates.push(meetings[i])
    } 
  }
  for (var i = 0; i < immediates.length;i++)
  {
    var meeting = immediates[i];
    body += "\r\nOn " + meeting[0].toDateString() + " at " + meeting[0].toTimeString().substring(0,5) + ", we will be having " + meeting[2];
    if (immediates[i][3] != "")
    {
      body += " with special guest "+meeting[3]+".";
    }
    else
    {
      body += ".";
    }
    if (immediates[i][4] != "")
    {
      body += "\r\nWe also have a cool activity in store: "+meeting[4];
    }
    if (meeting[2].toLowerCase().indexOf("zoom")>-1)
    {
      body += " The link to join the call is: " + meetings[0][9]; 
    }
  }
  if (reminders[0][0]!="")
  {
    body += "\r\n\r\nAdditionally, here's some reminders:";
    for (var i = 0; i <reminders.length&&reminders[i][0]!="";i++)
    {
      body += "\r\n        " + reminders[i][0];
    }
  }
  if (events[0][0]!="")
  {
    body += "\r\n\r\nAnd here's a look at what's coming up soon for us and some of our members:"
    var dates = [];
    var dateStrings = [];
    var unorderedDates = [];
    for (var i = 0; i <events.length&&events[i][0]!="";i++)
    {
      var eventDate = new Date(events[i][0]); 
      var distance = eventDate-date;
      if (distance >=0 && distance <= 5092000000)
      {
        if (dates.indexOf(eventDate-0)<0)
        {
          var num = 100*events[i][1].length+(events[i][1]+"a").charCodeAt(0);
          dates.push(eventDate+num);
          unorderedDates.push(eventDate+num);
        }
        else{
          dates.push(eventDate-0);
          unorderedDates.push(eventDate-0);
        }
        dateStrings.push(eventDate.toDateString() + ": " + events[i][1]);
      }
    }
    dates.sort();
    for (var i = 0; i < dates.length; i++)
    {
      body += "\r\n        " + dateStrings[unorderedDates.indexOf(dates[i])];
    }
    body += "\r\nGot an event coming up we should know about? Add it to our list at https://cutt.ly/MydohF9 (6 meetings required)";
  }
  if (news[0][0]!= "")
  {
    body += "\r\n\r\nFinally, here's a quick briefing of the week's top stories from some of our members:"
    for (var i = 0; i < news.length;i++)
    {
      if (news[i][0]!="")
      {
        body += "\r\n\r\n"+ news[i][1] +"\r\nSubmitted by " + news[i][0] + "\r\n" + news[i][2];  
      }
      ss.getSheetByName("News").deleteRow(2);
    }
    body += "\r\nGot a cool article you'd like to share for next week? Add it to our list at https://cutt.ly/MooMGJC (6 meetings required)";
  }
  body += "\r\n\r\nIn solidarity,\r\n" + meetings[1][8] +"\r\n"+ ss.getSheetByName("Meetings").getRange(1, 9).getValue()+ " of Sample Club";
  MailApp.sendEmail(sec,"Email Draft" , body);
}
/**
 *  Gets rid of events which have already passed.
 *  Separate from the email generation so events are given multiple notices
 */
function dateCleaner()
{
  var sheet = SpreadsheetApp.openById(attendanceId).getSheetByName("Upcoming Events");
  var events = sheet.getRange(2, 1, sheet.getLastRow(),1).getValues();
  var deleted = 0;
  for (var i = 0; i < events.length;i++)
  {
    var date = new Date(events[i][0]);
    if (new Date() > date)
    {
      sheet.deleteRow(2+i-deleted);
      deleted++;
    }
  }
}
var underclassmenRepId = "";
/**
 * Registers a user signing in
 */
function signIn(e) {
  var values = e.values;
  var ss = SpreadsheetApp.openById(attendanceId);
  emailAddendum(values,ss);
  numberAddendum(values,ss);
  attendanceTake(values,ss);
}
/**
 * Adds the user's email if they are new
 */
function emailAddendum(values,ss,list) {
  var sheet = ss.getSheetByName("Mailing List");
  var list = sheet.getRange(2, 1, sheet.getLastRow(),1).getValues();
  var affirmation = values[3];
  var email = values[1];
  if (affirmation == "Yes")
  {
    for (var i = 0; i < list.length; i++)
    {
      if (list[i][0] == email)
      {
        return;
      }
    }
    sheet.appendRow([email]);
  }
}
/***
 * Adds the user's number if they are new
 */
function numberAddendum(values,ss) {
  var sheet = ss.getSheetByName("Numbers");
  var list = sheet.getRange(2, 1, sheet.getLastRow(),sheet.getLastColumn()+1).getValues();
  var number = values[4];
  if (number !== "")
  {
    for (var i = 0; i < list.length; i++)
    {
      if (list[i][0] == number)
      {
        return;
      }
    }
    sheet.appendRow([number]);
  }
}
/**
 * Adds the user's attendance to the record
 */
function attendanceTake(values,ss) {
  var sheet = ss.getSheetByName("Member List");
  var list = sheet.getRange(2, 1, sheet.getLastRow(),sheet.getLastColumn()).getValues();
  var msheet = ss.getSheetByName("Meetings");
  var meetings = msheet.getRange(2, 1, msheet.getLastRow(),msheet.getLastColumn()).getValues();
  var email = values[1];
  var name = values[2];
  var valid = false;
  var currentmeeting = 0;
  for (var i = 0; i < meetings.length; i++)
  {
    var start = new Date(meetings[i][0]);
    var end = new Date(meetings[i][1]);
    var now = new Date(values[0]);
    if (now>start&&now<end)
    {
      valid = true;
      currentmeeting = i;
    }
  }
  if (!valid)
  {
   return 
  }
  for (var i = 0; i < list.length; i++) //Checks if there is an existing member, if so adds this meeting to their list
  {
      if (list[i][0] == email)
      {
        var array = list[i];
        if (array.indexOf("")>-1)
          array.splice(array.indexOf(""));
        if (array[array.length-1] !== values[0].substring(0,8)+"a")
        {
          if (meetings[currentmeeting][7]!="")
          {
            SpreadsheetApp.openById(meetings[currentmeeting][7]).appendRow([values[1],values[2]]);
          }
          array.push(values[0].substring(0,8)+"a");
          array[3]++;
          sheet.getRange(2+i, 1, 1, array.length).setValues([array]);
          meetings[currentmeeting][5]++;
          msheet.getRange(2, 1, msheet.getLastRow(),msheet.getLastColumn()).setValues(meetings);
          if (array[2]=="yes" && underclassmenRepId)
          {
            var repsheet = SpreadsheetApp.openById(underclassmenRepId).getSheetByName("Leaderboard");
            var repref = SpreadsheetApp.openById(underclassmenRepId).getSheetByName("List");
            var replist = repref.getRange(2, 1,repref.getLastRow(),repref.getLastColumn()).getValues();
            for (var j = 0; j < repref.getLastRow();j++)
            {
              if (replist[j][0] == email)
              {
                repsheet.getRange(j+2,3).setValue(repsheet.getRange(j+2,3).getValue()+meetings[currentmeeting][6]);
                break;
              }
            }
          }
        }
        return;
      }
  }
  sheet.appendRow([email,name,"no",1,values[0].substring(0,8)+"a"]); //adds a new 
  meetings[currentmeeting][5]++;
  msheet.getRange(2, 1, msheet.getLastRow(),msheet.getLastColumn()).setValues(meetings);
  if (meetings[currentmeeting][7]!="")
  {
    SpreadsheetApp.openById(meetings[currentmeeting][7]).appendRow([values[1],values[2]]);
  }
}