// popup.js

window.onload = function() {
    // 모달 엘리먼트 1
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementsByClassName('close')[0];

    // 모달 창 열기
    modal.style.display = 'block';

    // 닫기 버튼 클릭 시 모달 닫기
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };

    // 모달 외부 클릭 시 모달 닫기
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
};
