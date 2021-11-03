
function showModal(modalElement) {
  const myModal = new bootstrap.Modal(modalElement);
  myModal.show();
}

export function registerLightBox({modalId, modalImgId, modalPrevButtonId, modalNextButtonId}) {
  // const myModal = new bootstrap.Modal(document.getElementById(modalId))
  const modalElement = document.getElementById(modalId);
  if(!modalElement) return;


  let imgList = [];
  let currentIndex;
  
  function showImgWithIndex(currentIndex) {
    const imgModalElement = modalElement.querySelector(modalImgId);
    if(!imgModalElement) return;

    imgModalElement.src = imgList[currentIndex].src;
  }
  // init lightbox
  document.addEventListener('click', (e) => {
    if(e.target.tagName !== 'IMG' && !e.target.dataset.album) return;
    imgList = document.querySelectorAll(`img[data-album=${e.target.dataset.album}]`)
    currentIndex = [...imgList].findIndex(x => x === e.target); // compare by ref

    // add img with index
    showImgWithIndex(currentIndex);

    // show modal;
    showModal(modalElement);
  })

  // init lightboxPrev
  const lightboxPrevButton = modalElement.querySelector(modalPrevButtonId)
  if(!lightboxPrevButton) return;

  lightboxPrevButton.addEventListener('click', () => {
    // re-update currentIndex
    currentIndex = (currentIndex - 1 + imgList.length) % imgList.length;
    // re-render img via re-updated currentIndex
    showImgWithIndex(currentIndex);
  })
  
  //init lightboxNext button
  const lightboxNextButton = modalElement.querySelector(modalNextButtonId)
  if(!lightboxNextButton) return;

  lightboxNextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % imgList.length;
    showImgWithIndex(currentIndex);
  })
}