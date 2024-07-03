// popup.js

document.addEventListener('DOMContentLoaded', function() {
    // 모달 엘리먼트
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementsByClassName('close')[0];

    // 모달 열기
    function openModal() {
        modal.style.display = 'block';
    }

    // 모달 닫기
    function closeModal() {
        modal.style.display = 'none';
    }

    // 닫기 버튼 클릭 시 모달 닫기
    if (closeBtn) {
        closeBtn.onclick = function() {
            closeModal();
        };
    }

    // 모달 외부 클릭 시 모달 닫기
    window.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    };

    // 페이지 언로드 시 모달 관련 이벤트 리스너 제거
    window.onbeforeunload = function() {
        closeBtn.onclick = null;
        window.onclick = null;
    };

    // 초기에 모달 열기 (선택사항)
    openModal();
});
