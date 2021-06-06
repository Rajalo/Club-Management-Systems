// This function converts the text put into the associated Google Document into a template for the Task Manager to use.
//// Needs to be attached to a MessageCreationInterface doc as in the example
function CreateMessage() {
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  var mid = body.getParagraphs()[0].getText();
  var task = body.getParagraphs()[1].getText();
  var sect = body.getParagraphs()[2].getText();
  var marray = [task,sect];
  var para = body.getParagraphs()[3].getText();
  var message = para;
  for (var i=4;i<body.getParagraphs().length;i++) {
    var para = body.getParagraphs()[i].getText();
    message += "\r\n" + para;
  };
  message = message.replace(/\$\$type\$\$/gi, "$$$0$$$");
  message = message.replace(/\$\$date\$\$/gi, "$$$1$$$");
  message = message.replace(/\$\$loc\$\$/gi, "$$$2$$$");
  message = message.replace(/\$\$time\$\$/gi, "$$$3$$$");
  var a = 0;
  while (a > -1) {
    a = message.indexOf("$$");
    var box = message.slice(0,a);
    Logger.log(box);
    message = message.slice(a+2);
    marray.push(box);
    a = message.indexOf("$$");
  };
  marray.push(message);
  var ss = SpreadsheetApp.openById(mid);
  var sheet = ss.getSheetByName("Messages");
  sheet.appendRow(marray);
}
