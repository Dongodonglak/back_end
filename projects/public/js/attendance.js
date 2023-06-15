const checkedEls = document.getElementsByClassName("checked");
const uncheckedEls = document.getElementsByClassName("unchecked");

const managerAttEls = document.getElementsByClassName("manager_att");
const memberAttEls = document.getElementsByClassName("member_att");

// 저장 버튼
const saveBtnEl = document.getElementById("saveBtn");
// 취소 버튼
const cancelBtnEl = document.getElementById("cancelBtn");

// checkedEls에 대한 이벤트 처리기 연결
for (let i = 0; i < checkedEls.length; i++) {
  checkedEls[i].addEventListener('click', () => {
    checkedEls[i].style.display = 'none';
    // 관련된 unchecked 요소의 스타일 변경
    uncheckedEls[i].style.display = 'block';
  });
}

// uncheckedEls에 대한 이벤트 처리기 연결
for (let i = 0; i < uncheckedEls.length; i++) {
  uncheckedEls[i].addEventListener('click', () => {
    uncheckedEls[i].style.display = 'none';
    // 관련된 checked 요소의 스타일 변경
    checkedEls[i].style.display = 'block';
  });
}


// 저장 버튼 클릭 시 발생하는 이벤트
saveBtnEl.addEventListener('click', () => {
    for (let i = 0; i < managerAttEls.length; i++) {
        managerAttEls[i].style.display = 'none';
          // 관련된 checked 요소의 스타일 변경
        memberAttEls[i].style.display = 'block';
      }
})

// 취소 버튼 클릭 시 발생하는 이벤트
cancelBtnEl.addEventListener('click', () => {
    for (let i = 0; i < managerAttEls.length; i++) {
        managerAttEls[i].style.display = 'block';
          // 관련된 checked 요소의 스타일 변경
        memberAttEls[i].style.display = 'none';
        // 체크 박스도 원래대로
        checkedEls[i].style.display = 'block';
      }
})

// '저장' 버튼 클릭 이벤트 핸들러
saveBtnEl.addEventListener('click', async () => {
  const checkboxes = document.getElementsByName('checkbox');
  const selectedUserIds = [];
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
     selectedUserIds.push(checkbox.value);
    }
  });
  
  const requestBody = {
    userIds: selectedUserIds,
    status: '하이',
  };
  
  fetch('/app/members/:groupId/attendance/:scheduleId/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((data) => {
      // 업데이트 성공한 경우 처리
      console.log('업데이트 성공');
    })
    .catch((error) => {
      // 오류 발생한 경우 처리
      console.error('업데이트 오류:', error);
    });
})
   






