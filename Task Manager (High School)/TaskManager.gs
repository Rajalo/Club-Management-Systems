// This function runs a command given in the Task Sheet
// Needs to be attached to a TaskManager sheet as in the example
function TaskManager() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ssname = ss.getName();
  var clubo = ssname.replace(/ Task Manager/g, "");
  if (ss !== null) {
    var names = ["Task", "Messages", "Board", "Email", "Meeting", "Event", "Fundraiser"];
    var codes = ["Meta", "Auto", "Ebo", "Ema", "Meet", "Eve", "Fund"];
    var sheets = [];
    var ranges = [];
    var values = [];
    for (var i = 0; i < names.length; i++) {
      var sheet = ss.getSheetByName(names[i]);
      if (sheet != null) {
        var range = sheet.getRange(2,1,sheet.getLastRow()- 1, sheet.getLastColumn());
        var value = range.getValues();
        sheets.push(sheet);
        ranges.push(range);
        values.push(value);
      };
    };
    var eid = values[2][0][4];
    var fid = values[2][0][6];
    var cid = values[2][0][8];
    var special = values[0];
    for (var i = 0; i < special.length; i++) {
      var row = special[i];
      var task = row[0];
      var indA = row[1];
      var ind1 = row[2];
      for (var j = 0; j < values[1].length; j++) {
        var valuest = values[1][j];
        if (valuest != null && valuest[0] == task && valuest[1] == indA ) {
          var esprow = valuest;
        };
      };
      var valueoi = values[codes.indexOf(indA)][ind1];
      var cvalues = esprow.slice(2, esprow.indexOf(""));
      var message = ""
      for (var i = 0; i < cvalues.length; i++) {
        if ((i/2) == Math.floor(i/2)) {
          message += cvalues[i];
        } else {
          message += valueoi[cvalues[i]];
        };
      };
      if (task == "Ann" || task =="Rem" ) {
        var doc = DocumentApp.create("New " + names[(codes.indexOf(indA))] + " " + task);
        var body = doc.getBody();
        body.insertParagraph(0, message);
        body.editAsText().setFontSize(14);
        body.editAsText().setFontFamily("sans-serif");
        var docId = doc.getId();
        var docfile = DriveApp.getFileById(docId);
        var folder = DriveApp.getFolderById(fid); //Gets Announcement folder
        folder.addFile(docfile); //Sorts doc
      };
      if (task == "Cal") {
        var calendar = CalendarApp.getCalendarById(cid);
        var event = calendar.createEventFromDescription(message);
      };
      if (task == "Ema") {
        var emails = "";
        var safety = row[3];
        var classified = row[4];
        if (classified == null) {
          classified = 0;
        };
        var bname = [];
        var bpos = [];
        for (var i = 0; i < values[2].length; i++) {
          var brow = values[2][i];
          if (brow[2] == true) {
            bname.push(brow[1]);
            bpos.push(brow[0]);
          };
        };
        var signatures = "";
        var positions = "";
        for (var i = 0; i < bpos.length; i++) {
          if (i == 0) {
            signatures += "-" + bname[i];
            positions += bpos[i];
          } else if (i == bpos.length - 1) {
            signatures += " and " + bname[i];
            positions += " and " + bpos[i];
          } else {
            signatures += ", " + bname[i];
            positions += ", " + bpos[i]; 
          };
        };
        var signoff = "\nSincerely,\n" + signatures + "\n " + clubo + " " + positions;
        message += signoff;
        if (safety == "on") {
          emails = eid;
        } else {
          for (var i = 0;i < values[3].length ;i++){
            var edatum = values[3][i];
            var email = edatum[1];
            var clearance = edatum[2];
            if (clearance >= classified) {
              emails += email + ",";
            };
          };
        };
        Logger.log(emails)
        var title = clubo +" " + names[codes.indexOf(indA)];
        MailApp.sendEmail(email,title,message);
      };
    };
  };
};