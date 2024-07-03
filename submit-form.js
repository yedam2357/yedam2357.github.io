// submit-form.js

// Import the functions you need from the Firebase SDKs
import { ref, push, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { database } from "./firebase-config.js"; 

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

  // 정답 리스트 가져오기 함수
  async function fetchAnswerList() {
    const answersRef = ref(database, 'answer');
    const snapshot = await get(answersRef); // get 함수 사용
    return snapshot.val();
  }

  // 학번 형식 검증 함수
  function validateStudentNumber(studentNumber) {
    // 학번은 5자리여야 함
    if (studentNumber.length !== 5) {
      return false;
    }

    // 각 자리별 조건 검증
    var A = parseInt(studentNumber.charAt(0), 10);
    var B = parseInt(studentNumber.charAt(1), 10);
    var C = parseInt(studentNumber.charAt(2), 10);
    var D = parseInt(studentNumber.charAt(3), 10);
    var E = parseInt(studentNumber.charAt(4), 10);

    // 조건 검증
    if (!(A >= 1 && A <= 3) || !(B === 0 || B === 1) || !(D >= 0 && D <= 2)) {
      return false;
    }

    return true;
  }

  // 학번 검증
  if (!validateStudentNumber(studentNumber)) {
    // 조건을 만족하지 않으면 오류 메시지 표시 후 제출 막기
    document.getElementById('submit-result').innerHTML = '<p>올바른 학번 형식이 아닙니다.</p>';
    return;
  }

  var totalScore = 0;      
  var results = []; // 각 문제의 결과를 저장할 배열

  async function gradeExam() {
    try {
      const answerList = await fetchAnswerList();
      if (!answerList) {
        throw new Error('정답 리스트를 가져올 수 없습니다.');
      }

      // 답안 배열 생성
      var answers = [
        answers1to5.split(''),
        answers6to10.split(''),
        answers11to15.split(''),
        answers16to20.split('')
      ];

    // 사용자의 답안을 Firebase에 저장하기 위한 객체 생성
      var userAnswers = {
        answers1to5: answers[0],
        answers6to10: answers[1],
        answers11to15: answers[2],
        answers16to20: answers[3]
      };

      // 점수 계산 및 정답 여부 판단

      for (let i = 0; i < answerKey.length; i++) {
        answerKey[i].correctAnswer = answerList[i].correctAnswer;
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
        let isCorrect = userAnswer && parseInt(userAnswer) === correctAnswer;
        if (isCorrect) {
            totalScore += score;
        }

        // 결과를 배열에 저장
        results.push({
            questionNumber: questionNumber,
            userAnswer: userAnswer,
            correctAnswer: correctAnswer,
            isCorrect: isCorrect,
            score: isCorrect ? score : 0

        });

        console.log(totalScore);
        console.log(results);

      }
    } catch (error) {
      console.error('Error grading exam:', error);
      document.getElementById('submit-result').innerHTML = '<p>채점 중 오류가 발생했습니다. 다시 시도해주세요.</p>';
    }
  }

  gradeExam();

  console.log(totalScore);
  console.log(results);

  // Firebase에 데이터 저장
  push(ref(database, 'answers'), {
    schoolName: schoolName,
    studentNumber: studentNumber,
    grade: grade,
    totalScore: totalScore,
    // userAnswers: userAnswers,
    results: results
  }).then(function() {
    // 저장 성공 시 처리할 코드
    document.getElementById('submit-result').innerHTML = '<p>답안이 성공적으로 저장되었습니다. (총 점수: ${totalScore})</p>';
    // 폼 초기화 혹은 다음 작업 처리
    document.getElementById('grading-form').reset();
  }).catch(function(error) {
    // 저장 실패 시 처리할 코드
    console.error('저장 중 오류 발생:', error);
    document.getElementById('submit-result').innerHTML = '<p>저장 중 오류가 발생했습니다. 다시 시도해주세요.</p>';
  });
});
