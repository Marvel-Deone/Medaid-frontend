import { Clipboard } from '@angular/cdk/clipboard';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SelfAssessmentService } from '../services/self-assessment/self-assessment.service';
import { UserService } from '../services/user.service';



@Component({
  selector: 'app-self-assesement',
  templateUrl: './self-assesement.component.html',
  styleUrls: ['./self-assesement.component.css']
})
export class SelfAssesementComponent {
  public role_id: any;
  public loading: boolean = false;
  public downloadinloading: boolean = false;
  public submitloading: boolean = false;
  public fetchingloading: boolean = false;
  public downloadDiv: boolean = false;
  public showmenu: boolean = false;
  public userProfile: any;
  selectedCategory: any = "choose your condition";
  public currentSelfAssementId: any;
  public conditions: string[] = [
    'Depression',
    'Pregnant',
    'Substance Abuse',
    'Eating Disorders',
    'Stress',
    'Obsessive-Compulsive Disorder',
    'Post-Traumatic Stress Disorder (PTSD)',
    'Anxiety',
  ]

  public selfAssessments: any;
  displayQuestions: any;

  answers: string[] = [];
  public selfAssessmentPayload: any = {
    username: '',
    email: '',
    category: '',
    questionsAnswers: [],
  }
  selfAssessment: any;
  showAlertModal: boolean = false;
  public getResultStatus: boolean = false;
  selfAssessmentLists: any;
  documentContent: string = '';
  resultDescription: string = 'This result is based on the answers you provider earlier from the self assessment';
  plainText: string = '';
  getDownloadStatus: boolean = false;
  copyText: string = '';
  selfAssessmentLength: number = 0;
  myQuest: string[] = [];
  downloadResult: any;
  downloadme: boolean = false;
  // contentToConvert:any;


  constructor(private router: Router, private _snackBar: MatSnackBar, private service: UserService, private selfAssessmentService: SelfAssessmentService, private clipboard: Clipboard, private renderer2: Renderer2, private elementRef: ElementRef) { }

  @ViewChild('contentToConvert', { static: false }) contentToConvert!: ElementRef;

  // ngAfterViewInit() {
  //   setTimeout(() => {
  //     this.generatePDF();
  //   }, 0);
  // }


  ngOnInit(): void {

    this.service.GetProfile().subscribe(
      data => {
        const response = data;
        this.userProfile = response.profile;
        this.role_id = this.userProfile.role_id;
      },
      error => {
        const errorResponse = error;
        console.log('errorResponse', errorResponse);
      }
    )

    this.selfAssessmentService.getSelfAssessment().subscribe(
      data => {
        const response = data;
        if (response.reminder !== null) {
          this.selfAssessments = response.selfAssessment;
        }
      },
      error => {
        const errorResponse = error;
        console.log('errorResponse', errorResponse);

      }
    )

  }

  changeMenuStatus() {
    this.showmenu = !this.showmenu;
    // alert(this.showmenu);
  }

  logout() {
    localStorage.removeItem('token');
    this._snackBar.open("Logout Successful", "OK", {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['green-snackbar', 'login-snackbar'],
    });
    this.router.navigate(['/sign-in']);
  }

  changeCondition() {
    const selfAssessment = [];
    for (let i = 0; i < this.selfAssessments.length; i++) {
      const element = this.selfAssessments[i];
      if (this.selfAssessments[i].Category == this.selectedCategory) {
        selfAssessment.push(this.selfAssessments[i]);
      }
    }
    this.displayQuestions = selfAssessment;

  }

  submit() {
    this.submitloading = true;
    this.selfAssessmentPayload.username = this.userProfile.username;
    this.selfAssessmentPayload.email = this.userProfile.email;
    this.selfAssessmentPayload.category = this.selectedCategory;

    const questionAnswerPayload = [];
    if (this.answers.length == 0 || null) {
      this.submitloading = false;
      this._snackBar.open("Please, provide all answer", "OK", {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['green-snackbar', 'login-snackbar'],
      })
    } else {
      for (let i = 0; i < this.answers.length; i++) {
        const element = this.answers[i];
        questionAnswerPayload.push({ question: this.displayQuestions[i].Question, answer: element });
      }

      this.selfAssessmentPayload.questionsAnswers = questionAnswerPayload;
      this.selfAssessmentLength = this.selfAssessmentPayload.questionsAnswers.length;

      this.selfAssessmentService.saveSelfAssessmentAnswers(this.selfAssessmentPayload).subscribe(
        data => {
          const response = data;
          this.selfAssessment = response;
          this.currentSelfAssementId = this.selfAssessment.data._id;
          this.selfAssessmentPayload.answers = [];
          this.showAlertModal = true;
          this.submitloading = false;
        },
        error => {
          this.submitloading = false;
          const errorResponse = error;
          console.log('errorResponse', errorResponse);
          this._snackBar.open("Something went wrong, pls try again", "OK", {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['green-snackbar', 'login-snackbar'],
          });
        }
      )

    }
  }

  updateAlertModal() {
    this.showAlertModal = false;
  }

  getResult() {
    this.showAlertModal = false;
    this.getResultStatus = true;
    this.selfAssessmentService.getSingleSelfAssessment(this.currentSelfAssementId).subscribe(
      data => {
        const response = data;
        this.selfAssessment = response;
        this.selfAssessmentLists = this.selfAssessment.selfAssessment.questionsAnswers;
        for (let i = 0; i < this.displayQuestions.length; i++) {
          const element = this.displayQuestions[i].Question;
          this.myQuest.push(element)
        }
      })
  }


  convertHtml() {
    setTimeout(() => {
      const element = this.elementRef.nativeElement.querySelector('.myres');
      const htmlCode = this.renderer2.parentNode(element).innerHTML;;
      const tempElement = document.createElement('div');
      tempElement.innerHTML = htmlCode;
      const generatedDate = this.selfAssessment.selfAssessment.createdAt;
      const myDate = new Date(generatedDate).toLocaleString().replace(",", " Time:");
      this.plainText = tempElement.innerText;
      this.copyText = `${this.resultDescription} Date of Assessment: ${myDate} ${this.selectedCategory} ${this.plainText}. Copied from Medaid `
    }, 1000);
  }

  generatePDF() {
    // this.downloadinloading = true;
    // this.getDownloadStatus = true;
    this.downloadme = true;
    console.log('currrentSelfAssessmentId', this.currentSelfAssementId);

    console.log('long');
    this.selfAssessmentService.downloadPDF(this.currentSelfAssementId).subscribe(data => {
      const response = data;
      this.downloadme = false;
      this.downloadResult = response;

      console.log('response', response);
      console.log(response.filedirectory);
      // window.open(window.document.location.href = this.downloadResult.filedirectory, '_blank');
      window.location.href = this.downloadResult.filedirectory;
    },
      err => {
        console.log('errorResponse', err);
      })


  }

  copy() {
    this.convertHtml();
    this.clipboard.copy(this.copyText);
    this._snackBar.open("Text copied to clipboard", "OK", {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['green-snackbar', 'login-snackbar'],
    });
  }

  cancel() {
    this.getResultStatus = false;
  }


}
