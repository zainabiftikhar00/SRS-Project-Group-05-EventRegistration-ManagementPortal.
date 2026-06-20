//Event registration and management portal
#include <iostream>
#include <stdexcept>
using namespace std;
class Admin {
private:
    string name;
    static string EventDate;
    static string EventTime;
    static string EventType;
    static string EventVenue;
    static float EventTicket;
public:
    Admin(string n = "Admin") {
        name = n;
    }
    string GetType() { return EventType; }
    string GetDate() { return EventDate; }
    float GetTime()  { return EventTime; }
    string GetVenue() { return EventVenue; }
    float GetTicket() { return EventTicket; }
    void showMenu() {
        int choice;
        while (true) {
            cout << "\n----Admin Menu----\n";
            cout << "1.Add event" << endl;
            cout << "2.Edit Event" << endl;
            cout << "3.Delete Event" << endl;
            cout << "4.Display Event" << endl;
            cout << "5.Exit Admin Menu\n";
            cout << "Enter choice (1-5): ";
            cin >> choice;
            cin.ignore(); 

            switch (choice) {
            case 1: AddEvent(); break;
            case 2: EditEvent(); break;
            case 3: DeleteEvent(); break;
            case 4: DisplayEvent(); break;
            case 5: return;
            default: cout << "Invalid Choice!\n";
            }
        }
    }   
    void AddEvent() {
        cout << "\n-----Add Event Details-----\n" << endl;
        cout << "Enter Event Type: ";
        getline(cin, EventType);
        cout << "Enter Event Date (DD-MM-YY): ";
        getline(cin, EventDate);
        cout << "Enter Event Time: ";
        getline(cin, EventTime);
        cout << "Enter Event Venue: ";
        getline(cin, EventVenue);
        cout << "Enter Event Ticket Price: ";
	cin >> EventTicket;
	cin.ignore();

	if (EventTicket <= 0) {
    throw runtime_error("Please enter a valid ticket amount!");
		}	
    }
    void EditEvent() {
        if (EventType == "") {
            cout << "\nNo Event Available\n";
            return;
        }
        cout << "\n-----Edit Event Details-----\n" << endl;
        cout << "Enter Event Type (new): ";
        getline(cin, EventType);
        cout << "Enter Event Date (new): ";
        getline(cin, EventDate);
       cout << "Enter Event Time (new): ";
        getline(cin, EventTime);
        cout << "Enter Event Venue (new): ";
        getline(cin, EventVenue);
        cout << "Enter Event Ticket Price (new) ";
		cin >> EventTicket;
		cin.ignore();

		if (EventTicket <= 0) {
    	throw runtime_error("Please enter a valid ticket amount!");
			}	
      
    }
    void DeleteEvent() {
        EventDate = "";
        EventTime = "";
        EventType = "";
        EventVenue = "";
        EventTicket = 0;
        cout << "\nEvent Deleted Successfully!\n";
    }
    void DisplayEvent() {
        if (EventType == "")
            cout << "\nNo Event Available\n";
        else {
            cout << "\n--- Event Details ---\n";
            cout << "Type: " << EventType << endl;
            cout << "Date: " << EventDate << endl;
            cout << "Time: " << EventTime << endl;
            cout << "Venue: " << EventVenue << endl;
            cout << "Ticket Price: " << EventTicket << endl;
        }
    }
};
string Admin::EventDate = "";
string Admin::EventTime = "";
string Admin::EventType = "";
string Admin::EventVenue = "";
float Admin::EventTicket = 0;

class Organizer : public Admin {
public:
    Organizer(string n = "Organizer") : Admin(n) {}

    void showMenu() {
        int choice;
        while (true) {
            cout << "\n------ Organizer Menu ------\n";
            cout << "1. Add Event\n";
            cout << "2. Edit Event\n";
            cout << "3. Delete Event\n";
            cout << "4. Display Event\n";
            cout << "5. Exit Organizer Menu\n";
            cout << "Enter choice (1-5): ";
            cin >> choice;
            cin.ignore();

            switch (choice) {
            case 1: AddEvent(); break;
            case 2: EditEvent(); break;
            case 3: DeleteEvent(); break;
            case 4: DisplayEvent(); break;
            case 5: return;
            default: cout << "Invalid Choice!\n";
            }
        }
    }
};
class Attendee {
private:
    string name;
    bool registered;
    string bookedName;
    Admin* eventRef;

public:
    Attendee(string n = "Attendee", Admin* e = nullptr) {
        name = n;
        registered = false;
        bookedName = "";
        eventRef = e;
    }
    void showMenu() {
        int choice;
        while (true) {
            cout << "\n------ Attendee Menu ------\n";
            cout << "1. View Event\n";
            cout << "2. Register for Event\n";
            cout << "3. Cancel Registration\n";
            cout << "4. Print Ticket\n";
            cout << "5. Exit Attendee Menu\n";
            cout << "Enter choice (1-5): ";
            cin >> choice;
            cin.ignore();

            switch (choice) {
            case 1: ViewEvent(); break;
            case 2: RegisterEvent(); break;
            case 3: CancelRegistration(); break;
            case 4: PrintTicket(); break;
            case 5: return;
            default: cout << "Invalid Choice!\n";
            }
        }
    }
    void ViewEvent() {
        if (eventRef != nullptr)
            eventRef->DisplayEvent();
        else
            cout << "\nNo Event Available!\n";
    }
    void RegisterEvent() {
        if (eventRef == nullptr || eventRef->GetType() == "") {
            cout << "\nNo event available to register!\n";
            return;
        }
        registered = true;
        bookedName = eventRef->GetType();
        cout << "\nRegistered Successfully for " << bookedName << "!\n";
    }
    void CancelRegistration() {
        if (registered) {
            registered = false;
            cout << "\nRegistration Cancelled!\n";
        }
        else {
            cout << "\nNo Registration Found!\n";
        }
    }
    void PrintTicket() {
        if (registered && eventRef != nullptr) {
            cout << "\n----TICKET----\n";
            cout << "Attendee Name: " << name << endl;
            cout << "Event: " << bookedName << endl;
            cout << "Date: " << eventRef->GetDate() << endl;
            cout << "Time: " << eventRef->GetTime() << endl;
            cout << "Venue: " << eventRef->GetVenue() << endl;
            cout << "Price: " << eventRef->GetTicket() << endl;
        }
        else {
            cout << "\nNo ticket available to print!\n";
        }
    }
};

int main() {
    int role;
    try{

    cout << "\n---- Event Management System ----\n";
    cout << "Login as:\n1. Admin\n2. Organizer\nEnter choice (1-2): ";
    cin >> role;
    cin.ignore();

    Admin admin;
    Organizer organizer;

    if (role == 1) {
        admin.showMenu();
    }
    else if (role == 2) {
        organizer.showMenu();
    }
    else {
        cout << "Invalid selection! Exiting...\n";
        return 0;
    }

    cout << "\n---- Attendee Login ----\n";
    string attendeeName;
    cout << "Enter your name: ";
    getline(cin, attendeeName);

    Attendee attendee(attendeeName, &admin);
    attendee.showMenu();
}
catch(const runtime_error &e){
	cout<<"Error: "<<e.what()<<endl;
}

    return 0;
}


