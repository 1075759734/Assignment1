import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { GroupService } from '../group.service';
import { AlertService } from '../alert.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register2.component.html',
  styleUrls: ['./register2.component.css']
})
export class Register2Component implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService,
      private groupService: GroupService,
      private alertService: AlertService
  ) { 
      // redirect to home if already logged in
      if (this.authenticationService.currentGroupValue) { 
          this.router.navigate(['/Group']);
      }
  }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          name: ['', Validators.required],
          // roleName: ['', Validators.required],
          // username: ['', Validators.required],
          // password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      this.loading = true;
      console.log(this.registerForm.value)
      this.groupService.register(this.registerForm.value)
          .pipe(first())
          .subscribe(
              data => {
                  // this.alertService.success('Registration successful', true);
                  this.router.navigate(['/Group']);
              },
              error => {
                  // this.alertService.error(error);
                  this.loading = false;
              });
  }
}
