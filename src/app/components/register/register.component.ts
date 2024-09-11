import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private readonly _FormBuilder= inject(FormBuilder);
  private readonly _AuthService= inject(AuthService);
  private readonly _Router=inject(Router)
  errMsg:any


  signupForm:FormGroup = this._FormBuilder.group({
    name:[null, [Validators.required, Validators.minLength(3)]],
    email:[null, [Validators.required, Validators.email]],
    password:[null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{4,}$/)]],
    age:[null, [Validators.required, Validators.min(20)]],
    phone:[null, [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]]
  })

 
  signup(){
    
    if(this.signupForm.valid){
      this._AuthService.signUp(this.signupForm.value).subscribe({
        next:(res)=>{
  
          this._Router.navigate(['/login'])
          console.log(res)
        },
        error:(err)=>{
          this.errMsg = err.error.msg;
          
          console.log(err)
        }
      })

      console.log(this.signupForm.value)
    }

    
  }
}
