import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
constructor(){}
ngOnInit(): void {
  this.radioCheckbox()
}
Login:FormGroup = new FormGroup({
  email : new FormControl("",[Validators.required,Validators.email]),
  password:new FormControl("",[Validators.required,Validators.minLength(8),Validators.maxLength(15)])
})
LoginFunc(){
  console.log(this.Login)
}
radioCheckbox(){
  let items = document.querySelectorAll('.checkbox') as NodeListOf <HTMLInputElement>;
  items.forEach(e=> {
    e.onclick = ()=>{
      if(e.checked){
        items.forEach(m=> m.checked = false);
      e.checked = true;
      }else{
        e.checked = false;
      }
    }
  })
}
}
