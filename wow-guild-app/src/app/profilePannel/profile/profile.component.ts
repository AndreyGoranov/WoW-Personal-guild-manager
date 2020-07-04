import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor() { }
  img: File = null;
  imgURL: any;
  message: string;
  email:string;
  ngOnInit(): void {
    
  }

  onFileSelected(event) {
    this.img = event.target.files[0];
    this.preview(this.img);
    // Upload to database
  }

  preview(img: File) {
    if (!img) {
       return;
    }
     
    let mimeType = img.type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(img); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

}
