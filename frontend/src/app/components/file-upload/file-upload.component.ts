import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../../environments/environment'
import { FileInput } from 'ngx-material-file-input';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  SERVER_URL = 'http://localhost:8000/';

  form: FormGroup = new FormGroup({
    file: new FormControl([])
  });
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {}

  upload(){
    console.log(this.form.get("file"));
    const formData = new FormData();
    formData.append('file', this.form.get("file")?.value);

    this.httpClient.post<any>(SERVER_URL + "uploadPicture", formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

}
