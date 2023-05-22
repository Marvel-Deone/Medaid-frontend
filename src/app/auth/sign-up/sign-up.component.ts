import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExpertService } from 'src/app/services/expert.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  @ViewChild('videoElement') videoElement!: ElementRef;
  public hide: boolean = true;
  respdata: any;
  public signupForm?: any;
  loading = false;
  errorResp?: any;
  errorMessage?: any;
  status?: boolean;
  healthJobs = [
    'Doctor',
    'Nurse',
    'Surgeon',
    'Pharmacist',
    'Dentist',
    'Therapist',
    'Radiologist',
    'Physician assistant',
    'Pharmacist',
    'Medical laboratory technician',
    'Radiologic technologist',
    'Occupational therapist',
    'Physical therapist',
    'Speech therapist',
    'Respiratory therapist',
    'Medical coder',
    'Medical transcriptionist',
    'Medical billing specialist',
    'Medical receptionist/administrative assistant',
    'Clinical research coordinator',
    'Health educator',
    'Pastor',
  ];
  isRecording = false;
  mediaStream: MediaStream | null = null;
  mediaRecorder: MediaRecorder | null = null;
  recordedChunks: Blob[] = [];
  recordingTime = 0;
  timerInterval: any;
  public recordedData!: any;
  public showPreview: boolean = false;
  public role_id: any;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    public service: UserService,
    private _snackBar: MatSnackBar,
    public expertService: ExpertService
  ) {}

  firstFormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(10)]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8), //Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      ],
    ],
  });
  secondFormGroup = this.fb.group({
    selectedJob: ['', [Validators.required]],
    placeofwork: ['', [Validators.required, Validators.minLength(10)]],
    yearofprac: ['', [Validators.required, Validators.minLength(2)]],
  });
  thirdFormGroup = this.fb.group({
    recordedvideo: [this.recordedData, Validators.required],
  });
  fourthFormGroup = this.fb.group({
    confirmPin: ['', Validators.required],
  });

  isOptional = false;

  ngOnInit(): void {
    this.role_id = 1;

    this.signupForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.minLength(10)]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
            ),
          ],
        ],
        confirm_password: ['', Validators.required],
      }
      // {
      //   validators: this.pwrdMatch('password', 'confirmpassword')
      // }
    );
  }

  get signup() {
    return this.signupForm.controls;
  }
  onSubmit(form: FormGroup) {
    this.loading = true;
    const confirm_pin = Math.floor(100000 + Math.random() * 900000);
    const userObj = {
      email: form.value.email,
      phone: form.value.phone,
      username: form.value.username,
      pin: confirm_pin.toString(),
      password: form.value.password,
      confirm_password: form.value.confirm_password,
    };

    this.service.checkUniqueDetailsandsendMail(userObj).subscribe(
      (item: any) => {
        this.respdata = item;
        if (this.respdata.status === true) {
          const data = { ...form.value, pin: confirm_pin.toString() };
          sessionStorage.setItem('med_aid', JSON.stringify(data));
          this.router.navigate(['email-verification']);
        } else if (this.respdata.status === false) {
          this.loading = false;
          this._snackBar.open(this.respdata.message, 'OK', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['green-snackbar', 'login-snackbar'],
          });
        }
        this.loading = false;
      },
      (errorResponse: any) => {
        this.loading = false;
        console.log(errorResponse);
        const errorMessage =
          errorResponse.error.message || 'An error occurred. Please try again.';
        console.log('Registration Failed:', errorMessage);

        this._snackBar.open(errorMessage, 'OK', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['green-snackbar', 'login-snackbar'],
        });
      }
    );
  }

  async toggleRecording() {
    if (this.isRecording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  }

  async startRecording() {
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      video.srcObject = this.mediaStream;
      this.mediaRecorder = new MediaRecorder(this.mediaStream);
      this.mediaRecorder.addEventListener('dataavailable', (event) => {
        this.recordedChunks.push(event.data);
      });
      this.mediaRecorder.addEventListener('stop', () => {
        const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
        const reader = new FileReader();
        reader.onload = () => {
          const base64data = reader.result?.toString();
          this.recordedData = base64data;
        };
        reader.readAsDataURL(blob);
        this.recordedChunks = [];
        this.stopTimer();
      });
      this.mediaRecorder.start();
      this.startTimer();
      this.isRecording = true;
      setTimeout(() => {
        this.stopRecording();
      }, 180000);
    } catch (error) {
      console.error(error);
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
      this.mediaRecorder = null;
      const video: HTMLVideoElement = this.videoElement.nativeElement;
      video.srcObject = null;
      this.isRecording = false;
      this.showPreview = true;
    }
    this.stopTimer();
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.recordingTime += 1000;
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerInterval);
    this.recordingTime = 0;
  }

  sendMail() {
    let confirm_pin = Math.floor(100000 + Math.random() * 900000);
    sessionStorage.setItem('med_aid', confirm_pin.toString());
    this.expertService
      .sendPin({
        pin: confirm_pin,
        email: this.firstFormGroup.value.email,
        username: this.firstFormGroup.value.username,
      })
      .subscribe((res: any) => {});
  }
  done() {
    if (
      sessionStorage.getItem('med_aid') != this.fourthFormGroup.value.confirmPin
    ) {
      this._snackBar.open('Wrong Pin', 'OK', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['green-snackbar', 'login-snackbar'],
      });
    } else {
      this.loading = true;
      let details = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
        ...this.fourthFormGroup.value,
        recordedvideo: this.recordedData,
      };
      this.expertService.signup(details).subscribe(
        (res: any) => {
          this._snackBar.open('Registeration Successful!', 'OK', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['green-snackbar', 'login-snackbar'],
          });

          this.loading = false;
          sessionStorage.removeItem('med_aid');
          this.router.navigate(['/expert/signin']);
        },
        (errorResponse) => {
          this.loading = false;
          this.errorMessage = errorResponse.error.message;
          this.status = errorResponse.error.status;
          console.log('Registration Failed', errorResponse.error.message);
          this.errorMessage
            ? this._snackBar.open(this.errorMessage, 'OK', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
                panelClass: ['green-snackbar', 'login-snackbar'],
              })
            : this._snackBar.open('Pls check your internet connection', 'OK', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
                panelClass: ['green-snackbar', 'login-snackbar'],
              });
          // this._snackbar.open(errorResponse.error.message, "X");
        }
      );
    }
  }

  register(roleId: number) {
    this.role_id = roleId;
  }
}
