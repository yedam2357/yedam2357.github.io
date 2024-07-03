// submit-form.js

// Import the functions you need from the Firebase SDKs
import { ref, push } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { database } from "./firebase-config.js"; // firebase-config.js에서 export한 database 객체를 import

// 정답 리스트 및 배점 설정
const answerKey = [
    { questionNumber: 1, correctAnswer: 1, score: 5 },
    { questionNumber: 2, correctAnswer: 2, score: 5 },
    { questionNumber: 3, correctAnswer: 3, score: 5 },
    { questionNumber: 4, correctAnswer: 4, score: 5 },
    { questionNumber: 5, correctAnswer: 5, score: 5 },
    { questionNumber: 6, correctAnswer: 1, score: 5 },
    { questionNumber: 7, correctAnswer: 2, score: 5 },
    { questionNumber: 8, correctAnswer: 3, score: 5 },
    { questionNumber: 9, correctAnswer: 4, score: 5 },
    { questionNumber: 10, correctAnswer: 5, score: 5 },
    { questionNumber: 11, correctAnswer: 1, score: 5 },
    { questionNumber: 12, correctAnswer: 2, score: 5 },
    { questionNumber: 13, correctAnswer: 3, score: 5 },
    { questionNumber: 14, correctAnswer: 4, score: 5 },
    { questionNumber: 15, correctAnswer: 5, score: 5 },
    { questionNumber: 16, correctAnswer: 1, score: 5 },
    { questionNumber: 17, correctAnswer: 2, score: 5 },
    { questionNumber: 18, correctAnswer: 3, score: 5 },
    { questionNumber: 19, correctAnswer: 4, score: 5 },
    { questionNumber: 20, correctAnswer: 5, score: 5 }
];

// 폼 제출 이벤트 핸들러
document.getElementById('grading-form').addEventListener('submit', function(event) {
    event.preventDefault(); // 폼이 실제로 전송되는 것을 막습니다.

    // 입력된 값 가져오기
    var schoolName = document.getElementById('school-name').value || '천천고등학교'; // 학교 이름 기본값 설정
    var studentNumber = document.getElementById('student-number').value;
    var grade = document.getElementById('grade').value;
    var answers1to5 = document.getElementById('answers-1-5').value.trim();
    var answers6to10 = document.getElementById('answers-6-10').value.trim();
    var answers11to15 = document.getElementById('answers-11-15').value.trim();
    var answers16to20 = document.getElementById('answers-16-20').value.trim();

    // 답안 배열 생성
    var answers = [
        answers1to5.split(''),
        answers6to10.split(''),
        answers11to15.split(''),
        answers16to20.split('')
    ];

    // 점수 계산
    var totalScore = 0;
    for (let i = 0; i < answerKey.length; i++) {
        let questionNumber = answerKey[i].questionNumber;
        let correctAnswer = answerKey[i].correctAnswer;
        let score = answerKey[i].score;
        let userAnswer;
        
        // 각 문항에 따라 사용자의 답을 가져옴
        if (questionNumber <= 5) {
            userAnswer = answers[0][questionNumber - 1];
        } else if (questionNumber <= 10) {
            userAnswer = answers[1][questionNumber - 6];
        } else if (questionNumber <= 15) {
            userAnswer = answers[2][questionNumber - 11];
        } else if (questionNumber <= 20) {
            userAnswer = answers[3][questionNumber - 16];
        }

        // 사용자의 답이 정답과 일치하는지 확인하고 점수 계산
        if (userAnswer && parseInt(userAnswer) === correctAnswer) {
            totalScore += score;
        }
    }

    // Firebase에 데이터 저장
    push(ref(database, 'scores'), {
        schoolName: schoolName,
        studentNumber: studentNumber,
        grade: grade,
        totalScore: totalScore
    }).then(function() {
        // 저장 성공 시 처리할 코드
        document.getElementById('submit-result').innerHTML = '<p>총 점수: ' + totalScore + '점</p>';
        // 폼 초기화 혹은 다음 작업 처리
        document.getElementById('grading-form').reset();
    }).catch(function(error) {
        // 저장 실패 시 처리할 코드
        console.error('저장 중 오류 발생:', error);
        document.getElementById('submit-result').innerHTML = '<p>저장 중 오류가 발생했습니다. 다시 시도해주세요.</p>';
    });
});
