import { LightningElement, api } from 'lwc';

export default class CalendlyLWC extends LightningElement {

    @api calendlyURL;

    connectedCallback(){
        this.calendlyURL = this.calendlyURL?this.calendlyURL.replaceAll('%3A', ':').replaceAll('%2F', '/'):'';
    }

}