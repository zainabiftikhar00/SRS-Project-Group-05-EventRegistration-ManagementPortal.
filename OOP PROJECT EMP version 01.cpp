#include <iostream>
using namespace std;

class User {
protected:
    string name;
public:
    User(string n="User") { name = n; } ;
    virtual void showMenu() = 0;
};

class Admin: public User{
	
	private:
		string EventDate;
		string EventTime;
		string EventType;
		string EventVenue;
		string EventTicket;
	  	
	public:
	Admin(string n="Admin") : User(n) {}
	
    string GetType()   { return EventType; }
    string GetDate()   { return EventDate; }
    string GetTime()   { return EventTime; }
    string GetVenue()  { return EventVenue; }
    string GetTicket() { return EventTicket; }
	void showMenu (){
		int choice;
		while(true){
		cout << "\n----Admin Menu----\n";
            cout << "1.Add event"<<endl;
            cout << "2.Edit Event"<<endl;;
            cout << "3.Delete Event"<<endl;;
            cout<< "4.Display Event"<<endl;
            cout << "5.Exit Admin Menu\n";
            
            cout << "Enter choice (1-5): ";
            cin >> choice;
            
            switch(choice){
                case 1: AddEvent(); break;
                case 2: EditEvent(); break;
                case 3: DeleteEvent(); break;
                case 4: DisplayEvent(); break;
                case 5: return;
                default: cout << "Invalid Choice!\n";
            }
        }
    }
    
	void AddEvent(){
		cout<<"\n-----Add Event Details-----\n"<<endl;
		cout<<"Enter Event Type: ";
		cin>>EventType;
		cout<<"Enter Event Date (DD-MM-YY): ";
		cin>>EventDate;
		cout<<"Enter Event Time: ";
		cin>>EventTime;
		cout<<"Enter Event Venue: ";
		cin>>EventVenue;
		cout<<"Enter Event Ticket Price: ";
		cin>>EventTicket;
	}
void EditEvent(){
    if(EventType=="") {              
        cout<<"\nNo Event Available\n"; 
        return;
    }
    cout<<"\n-----Edit Event Details-----\n"<<endl;
    cout<<"Enter Event Type (new): ";
    cin>>EventType;
    cout<<"Enter Event Date (new): ";
    cin>>EventDate;
    cout<<"Enter Event Time (new): ";
    cin>>EventTime;
    cout<<"Enter Event Venue (new): ";
    cin>>EventVenue;
    cout<<"Enter Event Ticket Price (new): ";
    cin>>EventTicket;
}

	void DeleteEvent(){
		EventDate="";
		EventTime="";
		EventType="";
		EventVenue="";
		EventTicket="";
		
		cout<<"\nEvent Deleted Successfully!\n";
	}
		void DisplayEvent(){
		if(EventType=="") cout<<"\nNo Event Available\n";
		else{
			cout<<"\n--- Event Details ---\n";
			cout<<"Type: "<<EventType<<endl;
			cout<<"Date: "<<EventDate<<endl;
			cout<<"Time: "<<EventTime<<endl;
			cout<<"Venue: "<<EventVenue<<endl;
			cout<<"Ticket Price: "<<EventTicket<<endl;
		}
	}
};
class Organizer {
private:
    Admin& adminRef; 
public:
    Organizer(Admin& a) : adminRef(a) {}  
    void showMenu(){
    int choice;
    while(true){
        cout << "\n------ Organizer Menu ------\n";
        cout << "1. Add Event\n";
        cout << "2. Edit Event\n";
        cout << "3. Delete Event\n";
        cout << "4. Display Event\n";
        cout << "5. Exit Organizer Menu\n";

        cout << "Enter choice (1-5): ";
        cin >> choice;

        switch(choice){
            case 1: adminRef.AddEvent(); break;      
            case 2: adminRef.EditEvent(); break;    
            case 3: adminRef.DeleteEvent(); break;  
            case 4: adminRef.DisplayEvent(); break;  
            case 5: return;
            default: cout << "Invalid Choice!\n";
        }
    }
   }
};

class Attendee : public User {
private:
    bool registered;      
    string bookedName;    
    Admin* eventRef;   

public:
    Attendee(string n="Attendee", Admin* e=nullptr) : User(n) {
        registered = false;
        bookedName = "";
        eventRef = e;
    }

    void showMenu(){
        int choice;
        while(true){
            cout << "\n------ Attendee Menu ------\n";
            cout << "1. View Event\n";
            cout << "2. Register for Event\n";
            cout << "3. Cancel Registration\n";
            cout << "4. Print Ticket\n";
            cout << "5. Exit Attendee Menu\n";

            cout << "Enter choice (1-5): ";
            cin >> choice;

            switch(choice){
                case 1: ViewEvent(); break;
                case 2: RegisterEvent(); break;
                case 3: CancelRegistration(); break;
                case 4: PrintTicket(); break;
                case 5: return;
                default: cout << "Invalid Choice!\n";
            }
        }
    }

    void ViewEvent(){
        if(eventRef != nullptr)
            eventRef->DisplayEvent();  
        else
            cout << "\nNo Event Available!\n";
    }

    void RegisterEvent(){
        if(eventRef == nullptr || eventRef->GetType() == ""){
            cout << "\nNo event available to register!\n";
            return;
        }
        registered = true;
        bookedName = eventRef->GetType();
        cout << "\nRegistered Successfully for "<< bookedName << "!\n";
    }

    void CancelRegistration(){
        if(registered){
            registered = false;
            cout << "\n? Registration Cancelled!\n";
        } else {
            cout << "\nNo Registration Found!\n";
        }
    }

    void PrintTicket(){
        if(registered && eventRef != nullptr){
            cout << "\n----TICKET----\n";
            cout << "Attendee Name: " << name << endl;
            cout << "Event: " << bookedName << endl;
            cout << "Date: " << eventRef->GetDate() << endl;
            cout << "Time: " << eventRef->GetTime() << endl;
            cout << "Venue: " << eventRef->GetVenue() << endl;
            cout << "Price: " << eventRef->GetTicket() << endl;
        } else {
            cout << "\nNo ticket available to print!\n";
        }
    }
};
int main() {
    int role;
    cout << "\n---- Event Management System ----\n";

    cout << "Login as:\n1. Admin\n2. Organizer\nEnter choice (1-2): ";
    cin >> role;

    Admin admin;          
    Organizer organizer(admin);  

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
    cin >> attendeeName;

    Attendee attendee(attendeeName, &admin); 
    attendee.showMenu(); 

    return 0;
}

