// submit-form.js

// 폼 제출 이벤트 핸들러
document.getElementById('grading-form').addEventListener('submit', function(event) {
  event.preventDefault(); // 폼이 실제로 전송되는 것을 막습니다.

  // 입력된 값 가져오기
  var studentNumber = document.getElementById('student-number').value;
  var grade = document.getElementById('grade').value;
  var answers1to5 = document.getElementById('answers-1-5').value;
  var answers6to10 = document.getElementById('answers-6-10').value;
  var answers11to15 = document.getElementById('answers-11-15').value;
  var answers16to20 = document.getElementById('answers-16-20').value;

  // Firebase에 데이터 저장
  database.ref('answers').push({
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
