import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AssignedDevices } from './AssignedDevices';
import { Device } from './Device';
import { Employee } from './Employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  rform: any;

  employees:Employee[]=[];
  devices:Device[]=[];
  assdevs:AssignedDevices[]=[];
  
  constructor(private http:HttpClient){
    this.getEmployees();
    this.getDevices();
    this.getAssignments();
  }

  x1:boolean = false;
  x2:boolean = false;
  x3:boolean = false;
  x4:boolean = false;
  x5:boolean = false;
  x6:boolean = false;
  x7:boolean = false;
  x8:boolean = false;
  x9:boolean = false;
  x10:boolean = false;

  check1:boolean = false;
  check2:boolean = false;

  newemp!:Employee;
  newdev!:Device;
  editemp!:Employee;
  editdev!:Device;
  assignment!:AssignedDevices;

  newempform = new FormGroup({
    name: new FormControl,
    email: new FormControl,
    id: new FormControl
  })

  newdevform = new FormGroup({
    serial: new FormControl,
    description: new FormControl,
    type: new FormControl
  })

  editempform = new FormGroup({
    name: new FormControl,
    email: new FormControl,
    id: new FormControl
  })

  editdevform = new FormGroup({
    serial: new FormControl,
    description: new FormControl,
    type: new FormControl
  })

  assignform = new FormGroup({
    e_name: new FormControl,
    d_serial: new FormControl
  })

  foo1(): void{
    this.x1=!this.x1;
  }

  foo2(){
    this.x2=!this.x2;
  }

  foo3(){
    this.x3=!this.x3;
  }

  foo4(){
    this.x4=!this.x4;
  }

  foo5(){
    this.x5=!this.x5;
  }

  foo6(){
    this.x6=!this.x6;
  }

  foo7(){
    this.x7=!this.x7;
  }

  foo8(){
    this.x8=!this.x8;
  }

  foo9(){
    this.x9=!this.x9;
  }

  foo10(){
    this.x10=!this.x10;
  }

  getEmployees(){
    this.http.get("https://actproject-358ac-default-rtdb.europe-west1.firebasedatabase.app/Employees.json").subscribe((data:any)=>{
      for(let key in data){
        this.employees.push(new Employee(data[key].id, data[key].name, data[key].email));
      }
    })
  }

  getDevices(){
    this.http.get("https://actproject-358ac-default-rtdb.europe-west1.firebasedatabase.app/Devices.json").subscribe((data:any)=>{
      for(let key in data){
        this.devices.push(new Device(data[key].serial, data[key].description, data[key].type, data[key].state));
      }
    })
  }

  getAssignments(){
    this.http.get("https://actproject-358ac-default-rtdb.europe-west1.firebasedatabase.app/AssignedDevices.json").subscribe((data:any)=>{
      for(let key in data){
        this.assdevs.push(new AssignedDevices(data[key].e_name, data[key].d_serial));
      }
    })
  }

  addEmployee(){
    this.newemp = new Employee(this.newempform.controls['id'].value, this.newempform.controls['name'].value, this.newempform.controls['email'].value);
    this.http.post("https://actproject-358ac-default-rtdb.europe-west1.firebasedatabase.app/Employees.json", this.newemp).subscribe(()=>{

    })
    this.employees.push(this.newemp);
    this.newempform.reset();
    this.foo5();
  }

  addDevice(){
    this.newdev = new Device(this.newdevform.controls['serial'].value, this.newdevform.controls['description'].value, this.newdevform.controls['type'].value, false);
    this.http.post("https://actproject-358ac-default-rtdb.europe-west1.firebasedatabase.app/Devices.json", this.newdev).subscribe(()=>{

    })
    this.devices.push(this.newdev);
    this.newdevform.reset();
    this.foo6();
  } 

  delEmployee(obj: Employee){
    this.employees = this.employees.filter(item => item !== obj);
    this.http.get("https://actproject-358ac-default-rtdb.europe-west1.firebasedatabase.app/Employees.json").subscribe((data:any)=>{
      for(let key in data){
        if(obj.id==data[key].id){
          this.http.delete("https://actproject-358ac-default-rtdb.europe-west1.firebasedatabase.app/Employees/"+key+".json").subscribe((response:any)=>{

          })
          break;
        }
      }
    })
  }

  delDevice(obj: Device){
    this.devices = this.devices.filter(item => item !== obj);
    this.http.get("https://actproject-358ac-default-rtdb.europe-west1.firebasedatabase.app/Devices.json").subscribe((data:any)=>{
      for(let key in data){
        if(obj.serial==data[key].serial){
          this.http.delete("https://actproject-358ac-default-rtdb.europe-west1.firebasedatabase.app/Devices/"+key+".json").subscribe((response:any)=>{

          })
          break;
        }
      }
    })
  }

  editEmployee(obj: Employee){
    this.editemp = new Employee(this.editempform.controls['id'].value, this.editempform.controls['name'].value, this.editempform.controls['email'].value);
    this.http.get("https://actproject-358ac-default-rtdb.europe-west1.firebasedatabase.app/Employees.json").subscribe((data:any)=>{
      for(let key in data){
        if(obj.id==data[key].id){
          this.http.delete("https://actproject-358ac-default-rtdb.europe-west1.firebasedatabase.app/Employees/"+key+".json").subscribe((response:any)=>{

          })
          this.http.post("https://actproject-358ac-default-rtdb.europe-west1.firebasedatabase.app/Employees.json", this.editemp).subscribe(()=>{

          })
          break;
        }
      }
    })
    this.employees = this.employees.filter(item => item !== obj);
    this.employees.push(this.editemp);
    this.editempform.reset();
    this.foo7();
  }

  editDevice(obj: Device){
    this.editdev = new Device(this.editdevform.controls['serial'].value, this.editdevform.controls['description'].value, this.editdevform.controls['type'].value, false);
    this.http.get("https://actproject-358ac-default-rtdb.europe-west1.firebasedatabase.app/Devices.json").subscribe((data:any)=>{
      for(let key in data){
        if(obj.serial==data[key].serial){
          this.http.delete("https://actproject-358ac-default-rtdb.europe-west1.firebasedatabase.app/Devices/"+key+".json").subscribe((response:any)=>{

          })
          this.http.post("https://actproject-358ac-default-rtdb.europe-west1.firebasedatabase.app/Devices.json", this.editdev).subscribe(()=>{

          })
          break;
        }
      }
    })
    this.devices = this.devices.filter(item => item !== obj);
    this.devices.push(this.editdev);
    this.editdevform.reset();
    this.foo8();
  }

  assign(){
    for (let employee of this.employees){
      if(employee.name==this.assignform.controls['e_name'].value){
        this.check2=true;
        break;
      }
    }
    for (let device of this.devices){
      if(device.serial==this.assignform.controls['d_serial'].value && device.state==false && this.check2==true){
        this.editdev = new Device(device.serial,device.description,device.type,true);
        this.devices = this.devices.filter(item => item !== device);
        this.devices.push(this.editdev);
        this.http.get("https://actproject-358ac-default-rtdb.europe-west1.firebasedatabase.app/Devices.json").subscribe((data:any)=>{
        for(let key in data){
          if(device.serial==data[key].serial){
            this.http.delete("https://actproject-358ac-default-rtdb.europe-west1.firebasedatabase.app/Devices/"+key+".json").subscribe((response:any)=>{

            })
            this.http.post("https://actproject-358ac-default-rtdb.europe-west1.firebasedatabase.app/Devices.json", this.editdev).subscribe(()=>{

            })
            break;
          }
        }
        })
        this.assignment = new AssignedDevices(this.assignform.controls['e_name'].value, this.assignform.controls['d_serial'].value);
        this.assdevs.push(this.assignment);
        this.http.post("https://actproject-358ac-default-rtdb.europe-west1.firebasedatabase.app/AssignedDevices.json", this.assignment).subscribe(()=>{

        })
        this.check1=true;
        break;
      }
    }
    if(this.check1==false || this.check2==false){
      alert("Employee does not exist or device is already assigned or does not exist!");
    }
    this.check1=false;
    this.check2=false;
    this.assignform.reset();
    this.foo9();
  }

  unassign(obj: Device){
    this.editdev = new Device(obj.serial,obj.description,obj.type,false);
    this.devices = this.devices.filter(item => item !== obj);
    this.devices.push(this.editdev);
    this.http.get("https://actproject-358ac-default-rtdb.europe-west1.firebasedatabase.app/Devices.json").subscribe((data:any)=>{
      for(let key in data){
        if(obj.serial==data[key].serial){
          this.http.delete("https://actproject-358ac-default-rtdb.europe-west1.firebasedatabase.app/Devices/"+key+".json").subscribe((response:any)=>{

          })
          this.http.post("https://actproject-358ac-default-rtdb.europe-west1.firebasedatabase.app/Devices.json", this.editdev).subscribe(()=>{

          })
          break;
        }
      }
    })
    this.http.get("https://actproject-358ac-default-rtdb.europe-west1.firebasedatabase.app/AssignedDevices.json").subscribe((data:any)=>{
      for(let key in data){
        if(obj.serial==data[key].d_serial){
          this.http.delete("https://actproject-358ac-default-rtdb.europe-west1.firebasedatabase.app/AssignedDevices/"+key+".json").subscribe((response:any)=>{

          })
          break;
        }
      }
    })
    for(let assdev of this.assdevs){
      if(obj.serial==assdev.d_serial){
        this.assdevs = this.assdevs.filter(item => item !== assdev);
        break;
      }
    }
  }

}