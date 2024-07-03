import { ref, push, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { database } from "./firebase-config.js"; 

// 폼 제출 이벤트 핸들러
document.getElementById('grading-form').addEventListener('submit', async function(event) {
  event.preventDefault(); // 폼이 실제로 전송되는 것을 막습니다.

  // 입력된 값 가져오기
  const studentNumber = document.getElementById('student-number').value;
  const grade = document.getElementById('grade').value;
  const schoolName = document.getElementById('school-name').value;
  const answers1to5 = document.getElementById('answers-1-5').value;
  const answers6to10 = document.getElementById('answers-6-10').value;
  const answers11to15 = document.getElementById('answers-11-15').value;
  const answers16to20 = document.getElementById('answers-16-20').value;

  // 정답 리스트 가져오기 함수
  async function fetchAnswerList() {
    const answersRef = ref(database, 'answer');
    const snapshot = await get(answersRef); // get 함수 사용
    return snapshot.val();
  }

  // 채점 함수
  async function gradeExam() {
    try {
      const answerList = await fetchAnswerList();
      if (!answerList) {
        throw new Error('정답 리스트를 가져올 수 없습니다.');
      }

      let totalScore = 0;

      // 사용자 답안과 정답 비교 및 점수 계산
      const userAnswers = [
        answers1to5, answers6to10, answers11to15, answers16to20
      ];

      const submissionData = {
        studentNumber: studentNumber,
        grade: grade,
        schoolName: schoolName,
        answers: [],
        totalScore: 0,
        timestamp: new Date().toISOString()
      };

      for (let i = 0; i < userAnswers.length; i++) {
        for (let j = 1; j <= 5; j++) {
          const userAnswer = parseInt(userAnswers[i][j-1]);
          const currentList = answerList[5 * i + j];
          const ans = currentList[0];
          const obtained = userAnswer === ans ? currentList.score : 0;
          totalScore += obtained;
  
          // 각 문제의 사용자 답안과 점수를 submissionData에 추가
          submissionData.answers.push({
            correctAnswer: ans,
            userAnswer: userAnswer,
            score: obtained
          });
        }
      }

      submissionData.totalScore = totalScore;

      // 채점 결과 처리
      document.getElementById('submit-result').innerHTML = `<p>총 점수: ${totalScore}</p>`;

      // Firebase에 저장
      const submissionsRef = ref(database, 'submissions');
      push(submissionsRef, submissionData).then(() => {
        console.log('Submission added to Firebase');
      }).catch((error) => {
        console.error('Error adding submission to Firebase:', error);
      });

      // 폼 초기화
      document.getElementById('grading-form').reset();
    } catch (error) {
      console.error('Error grading exam:', error);
      document.getElementById('submit-result').innerHTML = '<p>채점 중 오류가 발생했습니다. 다시 시도해주세요.</p>';
    }
  }

  // 채점 함수 호출
  gradeExam();
});
