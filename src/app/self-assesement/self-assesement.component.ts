import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SelfAssessmentService } from '../services/self-assessment/self-assessment.service';

@Component({
  selector: 'app-self-assesement',
  templateUrl: './self-assesement.component.html',
  styleUrls: ['./self-assesement.component.css']
})
export class SelfAssesementComponent {
  public role_id: any;
  public loading: boolean = false;
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
    questions: [],
    answers: []
  }
  selfAssessment: any;
  showAlertModal: boolean = false;
  public getResultStatus: boolean = false;
  selfAssessmentLists: any;
  obj:any

  // answer: [] = []

  constructor(private router: Router, private _snackBar: MatSnackBar, private service: UserService, private selfAssessmentService: SelfAssessmentService) { }
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
        // console.log();
      }
    }
    this.displayQuestions = selfAssessment;
    // this.count = this.displayQuestions.length
    console.log('displayQuestions', this.displayQuestions);
    
  }

  submit() {
    const answerLength = this.selfAssessmentPayload.answers.length;
    
    // for (let i = 0; i < this.selfAssessmentPayload.answers.length; i++) {
    //   const element = this.selfAssessmentPayload.answers[i];
    //   if (element == null) {
        
    //   }
    // }

    // if (this.selfAssessmentPayload.answers.some(element => !element)) {
    //   console.log("Empty answer");
    // }else {
    //   console.log('No empty answer');
      
    // }

    this.selfAssessmentPayload.username = this.userProfile.username;
    this.selfAssessmentPayload.email = this.userProfile.email;
    this.selfAssessmentPayload.category = this.selectedCategory;
    this.selfAssessmentPayload.questions = this.displayQuestions;

    console.log('answers', this.selfAssessmentPayload);

    this.selfAssessmentService.saveSelfAssessmentAnswers(this.selfAssessmentPayload).subscribe(
      data => {
        const response = data;
        console.log('myRes', response);
        this.selfAssessment = response;
        this.currentSelfAssementId = this.selfAssessment.data._id;
        console.log('id', this.currentSelfAssementId);
        
        this._snackBar.open("Answer submitted successfully", "OK", {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['green-snackbar', 'login-snackbar'],
        });
        this.selfAssessmentPayload.answers = [];
        this.showAlertModal = true;
      },
      error => {
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
        this.selfAssessmentLists = this.selfAssessment.selfAssessment;
        console.log('response', this.selfAssessment.selfAssessment);
        const questionAnswer = [
          {
            question: 'How is your pregnancy going? How are you feeling?',
            answer: 'Good thanks'
          }
        ]
        const myAnswer = [];
        this.obj = {
          question: '',
          answer: ''
        }
        for (let i = 0; i < this.selfAssessmentLists.questions.length; i++) {
          const element = this.selfAssessmentLists.questions[i];
          // console.log('element', element);
          
          // obj.question = this.selfAssessmentLists.questions[i].Question;

          
          questionAnswer.push(this.selfAssessmentLists.questions[i].Question);
          // console.log('QuestionAnswer', questionAnswer);
        }

        for (let i = 0; i < this.selfAssessmentLists.answers.length; i++) {
          const element = this.selfAssessmentLists.answers[i];
          // console.log('element', element);
          
          // obj.question = this.selfAssessmentLists.questions[i].Question;

          
          myAnswer.push(this.selfAssessmentLists.answers[i]);
          // console.log('QuestionAnswer', myAnswer);
        }
        
        console.log('QuestionAnswer', questionAnswer, 'QuestionAnswer', myAnswer);

        const questionsAnswersArr = [
          ...questionAnswer.map(value => ({ label: 'questions', value })),
          ...myAnswer.map(value => ({ label: 'answers', value }))
        ];

        // const questionsAnswersArr = questionAnswer.concat(myAnswer);
        console.log('questionsAnswersArr', questionsAnswersArr);
        
        
        
      })
  }
}
