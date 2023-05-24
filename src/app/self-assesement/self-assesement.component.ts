import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, Renderer2  } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SelfAssessmentService } from '../services/self-assessment/self-assessment.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-self-assesement',
  templateUrl: './self-assesement.component.html',
  styleUrls: ['./self-assesement.component.css']
})
export class SelfAssesementComponent  {
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
  // contentToConvert:any;

  
  constructor(private router: Router, private _snackBar: MatSnackBar, private service: UserService, private selfAssessmentService: SelfAssessmentService, private elementRef: ElementRef, private renderer2: Renderer2) { }
  
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
        console.log('response', response);
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
        console.log('myRes', response);

        if (response.reminder !== null) {
          this.selfAssessments = response.selfAssessment;
          console.log('self', this.selfAssessments);
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
    console.log('selected', this.selectedCategory);
    const selfAssessment = [];
    for (let i = 0; i < this.selfAssessments.length; i++) {
      const element = this.selfAssessments[i];
      if (this.selfAssessments[i].Category == this.selectedCategory) {
        selfAssessment.push(this.selfAssessments[i]);
      }
    }
    this.displayQuestions = selfAssessment;
    console.log('displayQuestions', this.displayQuestions);
    
  }

  // removeDuplicate() {
  //   return this.questionsAnswer.reduce((unique: any, current: any) => {
  //     const existing = unique.find(
  //       (person: any) => person.question === current.question && person.answer === current.answer
  //     );
  //     const sortedQuestionsAnswers = [];
  //     if (!existing) {
  //       sortedQuestionsAnswers.push(current);
  //     }
  //     console.log('sortedQuestionsAnswers', sortedQuestionsAnswers);
  //     ;
  //   }, []);
  // }

  submit() {
    this.submitloading = true;
    this.selfAssessmentPayload.username = this.userProfile.username;
    this.selfAssessmentPayload.email = this.userProfile.email;
    this.selfAssessmentPayload.category = this.selectedCategory;
    
    const questionAnswerPayload = [];
    
    for (let i = 0; i < this.answers.length; i++) {
      const element = this.answers[i];
      questionAnswerPayload.push({question: this.displayQuestions[i].Question, answer: element});
    }
    this.selfAssessmentPayload.questionsAnswers = questionAnswerPayload;

    // const sortedQuestionsAnswers = this.questionsAnswer.filter((value: any, index, self)=> index === self.findIndex((p: any)=> p.question === value.question && p.answer === value.answer))
    // console.log('sortedQuestionsAnswers', sortedQuestionsAnswers);
    
    this.selfAssessmentService.saveSelfAssessmentAnswers(this.selfAssessmentPayload).subscribe(
      data => {
        const response = data;
        console.log('myRes', response);
        this.selfAssessment = response;
        this.currentSelfAssementId = this.selfAssessment.data._id;
        console.log('id', this.currentSelfAssementId);
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

    // this.questionsAnswer.reduce((unique: any, current: any) => {
    //   const existing = unique.find(
    //     (person: any) => person.question === current.question && person.answer === current.answer
    //   );
    //   const sortedQuestionsAnswers = [];
    //   if (!existing) {
    //     sortedQuestionsAnswers.push(current);
    //   }
    //   console.log('sortedQuestion', sortedQuestionsAnswers);
      
    //   // return sortedQuestionsAnswers;
    // }, []);
    // this.removeDuplicate()
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
        console.log('selfAssessment', response);
        
        this.selfAssessmentLists = this.selfAssessment.selfAssessment.questionsAnswers;
        console.log('response', this.selfAssessmentLists);
      })
  }

  
  convertHtml() {
    setTimeout(() => {
      const element = this.elementRef.nativeElement.querySelector('.getResult-div');
      const htmlCode = this.renderer2.parentNode(element).innerHTML;;
      const tempElement = document.createElement('div');
      tempElement.innerHTML = htmlCode;
      this.plainText = tempElement.innerText;
      console.log('plainText', this.plainText);
    }, 1000); // Adjust the delay as needed
  }

  generatePDF() {
    // this.downloadinloading = true;
    const element = this.elementRef.nativeElement.querySelector('.myres');
    const htmlCode = this.renderer2.parentNode(element).innerHTML;;
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlCode;
    this.plainText = tempElement.innerText;
    const generatedDate = this.selfAssessment.selfAssessment.createdAt;
    const myDate = new Date(generatedDate).toLocaleString().replace(",", " Time:");
    console.log('generatedDate', myDate);
    console.log('contentToConvert', this.contentToConvert);
    
    
   if (this.contentToConvert) {
    const documentDefinition = {
      content: [
        this.selectedCategory,
        this.resultDescription,
        `Date of Assessement: ${myDate}`,
        this.plainText,
        // this.documentContent,
        // this.contentToConvert.nativeElement.innerHTML
         // Example content, replace with your desired content
      ]
    };
    pdfMake.createPdf(documentDefinition).download('sample.pdf');
    this.loading = false;
   }
  
  }

  cancel() {
    this.getResultStatus = false;
  }

  
}
