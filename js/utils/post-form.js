import * as yup from 'yup'

function getValuesForm(form) {
  
  // S2
  const formValues = {}
  const data = new FormData(form)
  for (const [key, value] of data) {
    formValues[key] = value
  }

  return formValues
}

function getPostSchema() {
  return yup.object().shape({
    title: yup.string().required('Please enter the title'),
    author: yup.string().required('enter the author'),
    description: yup.string().required('Please enter the description'),
    imageUrl: yup.string().required('Please enter url')
  })
}

async function validationForm(form, formValues) {
  try {
    ['title', "author"].forEach(name => {
      const element = document.querySelector(`[name=${name}]`)
      if(element) {
        element.setCustomValidity('');
        const inValidText = element.nextElementSibling
        if(inValidText) {
          inValidText.textContent = '';
        }
      }
    })
    const schema = getPostSchema();
    await schema.validate(formValues, {abortEarly: false})
  } catch (error) {
    console.log(error);
    for(const validationError of error.inner) {
      const element = form.querySelector(`[name=${validationError.path}]`);
      if(element) {
        element.setCustomValidity(validationError.message);
        const inValidText = element.nextElementSibling
        if(inValidText) {
          inValidText.textContent = validationError.message;
        }
      }

    }
  }
  // add class validation
  const isValid = form.checkValidity()
  if (!isValid) {
    form.classList.add('was-validated')
  }

  return isValid;
}

export function initFormData({ formId, defaultValues, onSubmit }) {
  const bgPage = document.getElementById('postHeroImage')
  const form = document.getElementById(formId)
  // if (!form) return
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
  const changePostImageButton = document.getElementById('postChangeImage')
  if (changePostImageButton) {
    changePostImageButton.addEventListener('click', () => {
      formImageUrl.type = 'text'
    })
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('submit form');
    // get values from form
    const formValues = getValuesForm(form)
    console.log(formValues);
    // hide imageUrl input
    formImageUrl.type = 'hidden'

    if(!validationForm(form, formValues)) return;
  })
}
