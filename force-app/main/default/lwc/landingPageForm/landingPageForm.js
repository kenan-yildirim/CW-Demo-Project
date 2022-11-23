import { LightningElement, api } from 'lwc';
import CreateAd from '@salesforce/apex/leadUI.CreateAd';
import CreateLead from '@salesforce/apex/leadUI.CreateLead';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LandingPageForm extends LightningElement {

    isRegistered = false;
    firstName;
    lastName;
    email;
    phone;
    street;
    city;
    state;
    zipCode;
    country;
    infoDate;
    course;

    advertiseId;

    leadRecord = {
        FirstName:'',
        LastName:'',
        Street:'',
        City:'',
        State:'',
        PostalCode:'',
        Country:'',
        Email:'',
        Phone:''
    }

    AdRecord = {
        UTM_Campaign__c:'',
        UTM_Content__c:'',
        UTM_Medium__c:'',
        UTM_Referer__c:'',
        UTM_Source__c:'',
        UTM_Term__c:'',
        UTM_Id__c:''
    }


    @api utm_campaign;
    @api utm_content;
    @api utm_medium;
    @api utm_referer;
    @api utm_source;
    @api utm_term;
    @api utm_id;


    connectedCallback(){

        this.utm_campaign = this.utm_campaign?this.utm_campaign.replaceAll('%20',' '):'';
        this.utm_content = this.utm_content?this.utm_content.replaceAll('%20',' '):'';
        this.utm_medium = this.utm_medium?this.utm_medium.replaceAll('%20',' '):'';
        this.utm_referer = this.utm_referer?this.utm_referer.replaceAll('%20',' '):'';
        this.utm_source = this.utm_source?this.utm_source.replaceAll('%20',' '):'';
        this.utm_term = this.utm_term?this.utm_term.replaceAll('%20',' '):'';
        this.utm_id = this.utm_id?this.utm_id.replaceAll('%20',' '):'';

        this.AdRecord = {
            UTM_Campaign__c:this.utm_campaign,
            UTM_Content__c:this.utm_content,
            UTM_Medium__c:this.utm_medium,
            UTM_Referer__c:this.utm_referer,
            UTM_Source__c:this.utm_source,
            UTM_Term__c:this.utm_term,
            UTM_Id__c:this.utm_id
        }

        CreateAd({singleAd:this.AdRecord})
        .then(res => {
            this.advertiseId = res;
            console.log(this.advertiseId + ' named record created');
        })
        .catch(err => {
            console.log(err.body.message);
        });
    }

    onchangeHandler(event){
        switch(event.target.name){
            case 'fname':
                this.firstName = event.target.value;
                break;
            case 'lname':
                this.lastName = event.target.value;
                break;
            case 'email':
                this.email = event.target.value;
                break; 
            case 'phone':
                this.phone = event.target.value;
                break;
            case 'street':
                this.street = event.target.value;
                break;
            case 'city':
                this.city = event.target.value;
                break;
            case 'state':
                this.state = event.target.value;
                break; 
            case 'zipcode':
                this.zipCode = event.target.value;
                break;
            case 'country':
                this.country = event.target.value;
                break;
            case 'infodate':
                this.infoDate = event.target.value;
                break;
            case 'course':
                this.course = event.target.value;
                break;
            default:
                break;            
        }

        this.leadRecord = {
            FirstName: this.firstName,
            LastName: this.lastName,
            Street: this.street,
            City: this.city,
            State: this.state,
            PostalCode: this.zipCode,
            Country: this.country,
            Email: this.email,
            Phone: this.phone,
            Company: 'Test Account',
            Ad__c: this.advertiseId?this.advertiseId:''
        }

    }

    createLeadHandler(){

        CreateLead({singleLead:this.leadRecord, Search:this.UTM_Source})
        .then(data =>{
            this.isRegistered = true;

            const evt = new ShowToastEvent({
                title: 'Success',
                message: 'Lead record has been created!' ,
                variant: 'success',
                mode: 'dismissable'
              });
              this.dispatchEvent(evt);
        })
        .catch(error =>{
            this.isRegistered = false;

            const evt = new ShowToastEvent({
                title: 'Error',
                message: error.body.message ,
                variant: 'error',
                mode: 'dismissable'
              });
              this.dispatchEvent(evt);
            })
        }

    }
