Here is a conversion of the Google Docs manual I made for it when I originally made it back in 2018. I created a sample version last year that can be found at https://drive.google.com/drive/folders/12Zv5lpX5r28dAG6PzzJtVtVUM6bMkwPb.

# Rejasec User Manual
## Created by Reilly James Browne

## Introduction
Welcome to Rejasec, a Google-Drive Based Management Service with the capability to automate many inconvenient tasks for student-executives. The Service comprises of two files,  this user manual, a folder, a Google Calendar, and two associated Google Apps Scripts (not including any modules). These are not to be tampered with in ways outside those outlined in the instructions held within this manual. Tampering may result in termination of the service’s functionality, so proceed with caution. Under the right maintenance, Rejasec is an efficient means of managing the necessary information and communications for organized execution of operations.

The Service centers around the two Google Apps Scripts and their associated Google Drive Files. The first is the Task Manager, which is associated to a Google Sheet titled “Task Manager” with the name of your organization preceding. This will be used regularly to send emails, update a Google Calendar, and create announcements for either Remind app notifications or printables for the daily morning announcements. The second is the Message Creation Interface, which is associated to a similarly titled Google Document. This is used to generate the outline upon which the Task Manager will operate in a way which suits your organization’s needs.

## Task Manager

The Task Manager is a Google Apps Script which operates off of a Google Sheet. First, to access the script, open the Google Sheet titled “____ Task Manager” where the underscore is the name of your organization. You will see the UI for Task Manager in the form of a sheet titled “Task” as the first sheet in the document. This is the Cell-Row Command Line (CRCL), which is used to direct the Task Manager Script so that it carries out the task which you intend it to do.
### Zeroed Sheets

You will notice that all of the Sheets are “zeroed”, having the word “zero” in each one. The reason for this is to protect the programming from malfunctioning. This is the zero slot, meaning that the index of these rows are zero, the first number used by indices. When you have information for that row, simply write over the zeros with your new information. Do not remove the zeroes if you do not yet have information for that sheet.
### Planning Sheets

Next, looking at the bottom tabs for the other sheets, you will see 3 sheets title “Event”, “Meeting”, and “Fundraiser”. These are the Planning Sheets, where the information necessary for script execution is to be held. It is suggested that you use this whilst forming plans to avoid unnecessary copying and pasting, as well as for keeping track of tentative plans before you are ready to release the information to your members. 
Each Planning Sheet has 4 or more columns. The first two columns are titled “Type” (or “Name”), and “Date”. These are where you keep track of the name or type of event which you will be holding and the date on which it will occur. For “Event” and “Fundraiser”, there are also columns titled “Location” and “Time” so that you can let your members know additionally when and where non-meetings will take place. Lastly, all of the Planning Sheets have columns title “IntraInfo” and “ExoInfo”, which can be used to add on specific information for an event which your outline doesn’t account for, with “IntraInfo” meant for Emails and Remind messages whereas “ExoInfo” is meant for Announcements.
Here is an example for a Pizza Sale in the Commons afterschool on Thursday, March 14th, in which there is a limited supply of pizza and to which the members should bring gloves for serving.

Type : Pizza Sale
Date :  Thursday, March 14th
Location: in the Commons
Time: afterschool
IntraInfo: Be sure to Bring gloves for serving.
ExoInfo: Supply is limited, so come down fast for some delicious pizza

Each Row represents one event, thus when you have another event coming up simply enter the information for that event in the row directly below the last one filled. If you are using the Meeting Cancellation Module, you do not need to use the Meetings Planning Page, so just leave it zeroed.

Throughout the year, so long as these sheets are updated, you will be able to use Task Manager to address the events within the bounds of its functions and the functions of your modules with semi-automation, cutting down on wasted time.

### Information Sheets
	The next three sheets, titled “Email”, “Board” and “Messages” are known as Information Sheets. This is where essential information for the operation of the Task Manager is kept, so it is necessary to take caution in editing these spreadsheets. The first two are for your maintenance, whereas Messages is only to be used if you have a profound understanding of the Rejasec scripts, unless done as instructed in this manual.
	The Email is most manipulable. Each row signifies an individual, with their information (Name, Email, and Clearance Level) in the respective columns. The information in this sheet is used for emailing your members, with clearance level allowing you to distinguish certain members who should be privy to certain emails (such as executives or very committed members) that other members need not get. The clearance level is an argument used when instructing Task Manager to send an email, with Task Manager emailing only those with the specified level of clearance or higher.

As such, in order to use the full capabilities of Task Manager, you will need to keep a email list which has information for all of the three fields. Any number can be used for clearance levels, including negatives and decimals. You add add members whenever and they will be included in the next email sent at or below their clearance level.

The Next is the Board sheet. While the Board sheet does hold untouchable information such as the id codes for your calendar and announcements folder, it is mostly manipulable. The Sheet is for holding information regarding your executive board. Simply list the names of your board members in the Name column, with their position in the Position column and whether or not they are in charge of sending emails as “TRUE” or “FALSE” in the Usage column. This is to keep track of your board and allow those with the “TRUE” label to sign-off at the end of emails.

The final Information Sheet is the Messages Sheet, which should only be manipulated when you need to change the message for a given command. To construct the messages held there, it is easiest to use the Message Creation Interface, but they are stored in this sheet. Each row is a message, so if you wish to change that message, delete the row and then rewrite the message using the Message Creation Interface, but that will be further detailed when describing how to use that. Messages are the formats which the Rejasec uses to generate the contents of emails, announcements, reminds, etc. Messages will be discussed further in the Message Creation Interface section of this manual.
### Task Sheet

The remaining sheet is the Task Sheet, which is used to invoke commands. Whenever a task needs to be done, such as sending an email, a row will be used to tell the Rejasec the necessary information to complete the task. Each command will follow the format as described below.

In the first column is where the task itself is put (“Task”). Each possible task has a 3 letter code that is written in the row’s first cell, as described here:

Task Codes:
Cal :
Creates a calendar event on the given date with the given name
Ema :
Sends an email to members with given information
Ann :
Generates an announcement on a Google Doc which can be printed and handed in to be read, with thr given information.
Rem :
Generates a reminder that can be copied and pasted into the Remind App with the given information.

	
The second column is used to distinguish the type of event for which the command will be invoked (“Type”). This is necessary for Rejasec to find the information required for completing the task. There are three types of events, each of which correspond to the Planning Sheet which holds the information necessary for task execution. Each type of event can have its own custom message for each task, so it is important that you use the correct codes. Here are the codes for the event types for each respective Planning Page:

Page Codes:
Fund :
Fundraiser
Eve :
Events :
Meet :
Meetings


The third column is the index of the event (“Number”). This is necessary for Rejasec to find the specific information for the event which you are telling your members about. In order to figure out the index number, take the row number of the event’s data and subtract 2.

The fourth and fifth columns are only used when invoking a command with the task “Ema”. The first is the safety, which will result in an email being sent to you, rather than to your members, to test whether your message is as you wish it to be (see the Message Creation Interface). To turn on safety simply type “on” (without quotes) into cell in the Safety column. The second is Clearance Level. All members of the clearance level you specify in this box or higher (as specified on your email list) will be sent the email (given that the safety is not on).

When you have constructed the command, simply press Ctrl+Shift+Alt+1 to run the command and complete the task you need to. However, the first time you run this, the Rejasec will need to get the necessary authorizations to work, so you will have to run it “manually.” To do this, simply go to Tools>Script Editor and click the run button. You will be brought to the authorization window, in which Google will give you a warning about potentially harmful scripts. This script is perfectly functional. Press “Review Permissions”, Click “Go to Rejasec(unsafe)” and enable all permissions.

With this all configured, you can now begin constructing the messages for each with the Message Creation Interface.

## Message Creation Interface

After preparing your Task Manager, you will want to create message templates for your tasks. There are two ways to set the messages for a specific task, manually and via the Message Creation Interface. Both will be reviewed here:

## Manual Message Creation

If you want to add a message template which is held within our examples, such as the default Calendar templates which are already within the system, then you will want to manually add it. To see the currently used messages, go to the Messages Sheet within your Task Manager.	

The first two columns are the “tags” which let Rejasec know when this message should be used. In this case, it is meant to be used for the creation of a Calendar event for a meeting, generally. The Rejasec will scan the rows for the appropriate tags when a command is given, so it is important that you make sure all possible combinations of commands are filled with messages for functionality.

The combinations are as follows:
    Cal Eve, Cal Meet, Cal Fund, Ann Eve, Ann Meet, Ann Fund, Rem Eve, Rem Meet, Rem Fund, Ema Eve, Ema Meet, Ema Fund

## Message Creation via the Interface
If you want to create a customized message template, you can do so using the Message Creation interface. To access this, simply open up the document titled “Message Creation Interface” in this folder. The document should be empty except for a long list of characters at the top. This is used for identifying the Task Manager for information transfer, so do not edit it.
Instead, go to the end of the line and press enter.
You will first need to distinguish the tags so the system knows what the template will be used for. Type the Task Code, then press enter, follow it with the Type Code and press enter again. Then type your message template, putting in the following Variable Tags in order to refer to specific information:

For clarity, here is an Example.

After typing your message, simply go to Tools>Script Editor and click the run button. You will be brought to the authorization window, in which Google will give you a warning about potentially harmful scripts. This script is perfectly functional. Press “Review Permissions”, Click “Go to Rejasec(unsafe)” and enable all permissions. The script will then run.

This will append your message onto the Messages page of the Task Manager, which will make it functional. If you are replacing a message, make sure to delete the previous version first.

When you want to create another message, clear the document such that all that remains is the code at the top. 
