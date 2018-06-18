import {Component, OnInit} from '@angular/core';
import {Info} from './app.interface';
import {AppService} from './app.service';
import {groupInfo} from './app.interface';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title: string = 'Contact';

  // contact variable
  private contact: Info;
  /* property enable input of modal */
  public isDisabled: boolean = true;

  // group variable
  public item: groupInfo;
  // add group property
  public isHidden: boolean = true;

  // add contact
  public saveContact: boolean = true;

  // group  variable
  public groups: groupInfo[];

  // empty contact info
  public nullContact: Info;

  /* variable for modal data */
  public contactId: number;
  public contactImage: string;
  public contactName: string;
  public contactNumber: number;
  public contactGroup: string;
  public contactEmail: string;

  // contacts for json server
  public contacts: Info[];
  // filterContacts for filtered contacts by groups
  public filterContacts: Info[];

  //image to string
  public fileType: string;
  public imageString: string;
  public imageSrc: string;

  constructor(private appService: AppService, private httpClient: HttpClient) {
  }

  ngOnInit() {
    // get the contact from json server
    this.appService.getContact()
      .subscribe((contacts: Info[]) => {
        this.contacts = contacts;
        this.filterContacts = contacts;
      });


    // get the groups from the json server
    this.appService.getGroup()
      .subscribe((groups: groupInfo[]) => {
        this.groups = groups;
      });
  }

  /*'value' and 'clear' functio for assing and clear the data for modal window */
  passValue(contact): void {
    this.contactId = contact.id;
    this.contactImage = contact.image;
    this.contactName = contact.name;
    this.contactNumber = contact.number;
    this.contactGroup = contact.group;
    this.contactEmail = contact.email;
    this.imageSrc = null;
    this.isDisabled = true;
    this.saveContact = true;
  }

  clearValue(contact): void {
    this.contactId = null;
    this.contactImage = '';
    this.contactName = '';
    this.contactNumber = null;
    this.contactGroup = '';

    this.contactEmail = null;
    this.saveContact = true;
    this.imageSrc = null;
  }

  // new contact form intialization
  addContact(): void {
    this.contactId = null;
    this.imageSrc = null;
    this.contactImage = '';
    this.contactName = '';
    this.contactNumber = null;
    this.contactGroup = '';
    this.contactEmail = null;
    this.isDisabled = false;
    this.saveContact = false;

  }

  onEdit(): void {
    this.isDisabled = false;

  }

  // for saving the new group
  addGroup(): void {
    this.isHidden = false;
  }

  // for cancel the adding a new group
  hideGroup(): void {
    this.isHidden = true;
  }

  // Edit a contact
  handleSubmit(event: Info): void {

    this.appService
      .updateContact(event)
      .subscribe((data: Info) => {
        this.contacts = this.contacts.map((contact: Info) => {
          if (contact.id === event.id) {
            contact = Object.assign({}, contact, event);
          }
          return contact;
        });
        window.location.reload();
      });

  }

  // remove a contact
  removeContact(event: Info): void {
    this.appService
      .deleteContact(event)
      .subscribe((data: Info) => {
        this.contacts = this.contacts.filter((contact: Info) => {
          return contact.id !== event.id;
        });
        window.location.reload();
      });

  }

  // submit a new contact
  handleSave(event: Info): void {
    this.httpClient.post(`http://localhost:3000/contacts`, event)
      .subscribe((data: Info) => {
        console.log(data);
      });
    window.location.reload();
  }

  // submit a group
  groupSubmit(event: groupInfo) {
    this.httpClient.post(`http://localhost:3000/groups`, event)
      .subscribe((data: groupInfo) => {

      });
    window.location.reload();
  }

  // show all contact
  showAll(): void {
    this.filterContacts = this.contacts;
  }

  // Show filtered contact
  showFilter(event: string): void {
    this.filterContacts = this.contacts.filter((contact: Info) => {
      return contact.group === event;
    });
  }

  // changing image into string
  handleFileSelect(evt): void {
    let files = evt.target.files;
    let file = files[0];
    this.fileType = file.type;
    if (files && file) {
      let reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(readerEvt): void {
    let binaryString = readerEvt.target.result;
    this.imageString = btoa(binaryString);
    this.imageSrc = `data:${this.fileType};base64,${this.imageString}`;
    this.contactImage = this.imageSrc;
  }

  // search function
  searchFunction(searchValue): void {
    this.filterContacts = this.contacts.filter((contact: Info) => {
      return contact.name.toLowerCase().includes(searchValue);
    });
  }

}
