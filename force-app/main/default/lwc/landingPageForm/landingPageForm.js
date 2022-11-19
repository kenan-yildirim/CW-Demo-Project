import { LightningElement, api } from 'lwc';
import CreateAd from '@salesforce/apex/leadUI.CreateAd';
import CreateLead from '@salesforce/apex/leadUI.CreateLead';
//import { ShowToastEvent } from 'lightning/platformShowToastEvent';

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


    @api UTM_Campaign;
    @api UTM_Content;
    @api UTM_Medium;
    @api UTM_Referer;
    @api UTM_Source;
    @api UTM_Term;
    @api UTM_Id;


    connectedCallback(){

        this.UTM_Campaign = this.UTM_Campaign?this.UTM_Campaign.replaceAll('%20',' '):'';
        this.UTM_Content = this.UTM_Content?this.UTM_Content.replaceAll('%20',' '):'';
        this.UTM_Medium = this.UTM_Medium?this.UTM_Medium.replaceAll('%20',' '):'';
        this.UTM_Referer = this.UTM_Referer?this.UTM_Referer.replaceAll('%20',' '):'';
        this.UTM_Source = this.UTM_Source?this.UTM_Source.replaceAll('%20',' '):'';
        this.UTM_Term = this.UTM_Term?this.UTM_Term.replaceAll('%20',' '):'';
        this.UTM_Id = this.UTM_Id?this.UTM_Id.replaceAll('%20',' '):'';

        this.AdRecord = {
            UTM_Campaign__c:this.UTM_Campaign,
            UTM_Content__c:this.UTM_Content,
            UTM_Medium__c:this.UTM_Medium,
            UTM_Referer__c:this.UTM_Referer,
            UTM_Source__c:this.UTM_Source,
            UTM_Term__c:this.UTM_Term,
            UTM_Id__c:this.UTM_Id
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
        


    }



}