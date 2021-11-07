function getValuesForm(form) {
  // // S1
  // const formValues = ['title', 'author', 'description', 'imageUrl'].reduce((formValues,name) => {
  //   const field = form.querySelector(`[name=${name}]`);
  //   if(field) {
  //     formValues[name] = field.value
  //   }

  //   return formValues;
  // }, {})

  // S2
  const formValues = {}
  const data = new FormData(form)
  for (const [key, value] of data) {
    formValues[key] = value
  }

  return formValues
}

export function initFormData({ formId, defaultValues, onSubmit }) {
  const bgPage = document.getElementById('postHeroImage')
  const form = document.getElementById(formId)
  if (!form) return
  const formTitle = form.querySelector('input[name=title]')
  const formAuthor = form.querySelector('input[name=author]')
  const formDesc = form.querySelector('textarea[name=description]')
  const formImageUrl = form.querySelector('input[name=imageUrl]')

  // render default values on DOM
  formTitle.value = defaultValues.title
  formAuthor.value = defaultValues.author
  formDesc.value = defaultValues.description
  formImageUrl.value = defaultValues.imageUrl

  bgPage.style.backgroundImage = `url("${defaultValues.imageUrl}")`

  // init change post image
  const changePostImageButton = document.getElementById('postChangeImage');
  if(changePostImageButton) {
    changePostImageButton.addEventListener('click', () => {
      formImageUrl.type = 'text';
      
    })
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    // get values from form
    getValuesForm(form);
    // hide imageUrl input
    formImageUrl.type = 'hidden';
  })
}
