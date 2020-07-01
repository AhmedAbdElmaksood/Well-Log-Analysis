import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ContactUsService } from '../../services/contact-us.service'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  contactForm: FormGroup;
  submitted = false;


  constructor(private toaster: ToastrService, private formBuilder: FormBuilder, private _contactUs: ContactUsService) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      "username": ['', [Validators.required]],
      "email": ['', [Validators.required, Validators.email]],
      "subject": ['', [Validators.required]],
      "message": ['', [Validators.required]]
    })
  }

  get f() { return this.contactForm.controls; }

  onSubmit() {
    this.submitted = true;

    if(this.contactForm.invalid){return;}

    this._contactUs.submitMessage(this.contactForm.value)
      .subscribe(res => {
        this.toaster.success("Your Message Was Submitted Succesfully")
      },
        err => {
          this.toaster.error("Something Went Wrong, Please Try Again Later")
        }
      )

  }

}
