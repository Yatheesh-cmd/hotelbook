import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  formData = { name: '', email: '', message: '' };
  loading = false;

  constructor(private toastr: ToastrService) {}

  handleSubmit() {
    this.loading = true;
    setTimeout(() => {
      this.toastr.success('Thank you for reaching out! We will get back to you soon.');
      this.formData = { name: '', email: '', message: '' };
      this.loading = false;
    }, 1000);
  }
}