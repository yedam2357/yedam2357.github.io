// submit-form.js

// Import the functions you need from the Firebase SDKs
import { ref, push } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { database } from "./firebase-config.js"; // firebase-config.js에서 export한 database 객체를 import

// 폼 제출 이벤트 핸들러
document.getElementById('grading-form').addEventListener('submit', function(event) {
  event.preventDefault(); // 폼이 실제로 전송되는 것을 막습니다.

  // 입력된 값 가져오기
  var schoolName = document.getElementById('school-name').value || '천천고등학교'; // 학교 이름 기본값 설정
  var studentNumber = document.getElementById('student-number').value;
  var grade = document.getElementById('grade').value;
  var answers1to5 = document.getElementById('answers-1-5').value;
  var answers6to10 = document.getElementById('answers-6-10').value;
  var answers11to15 = document.getElementById('answers-11-15').value;
  var answers16to20 = document.getElementById('answers-16-20').value;

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

  // Firebase에 데이터 저장
  push(ref(database, 'answers'), {
    schoolName: schoolName,
    studentNumber: studentNumber,
    grade: grade,
    answers1to5: answers1to5,
    answers6to10: answers6to10,
    answers11to15: answers11to15,
    answers16to20: answers16to20
  }).then(function() {
    // 저장 성공 시 처리할 코드
    document.getElementById('submit-result').innerHTML = '<p>답안이 성공적으로 저장되었습니다.</p>';
    // 폼 초기화 혹은 다음 작업 처리
    document.getElementById('grading-form').reset();
  }).catch(function(error) {
    // 저장 실패 시 처리할 코드
    console.error('저장 중 오류 발생:', error);
    document.getElementById('submit-result').innerHTML = '<p>저장 중 오류가 발생했습니다. 다시 시도해주세요.</p>';
  });
});
