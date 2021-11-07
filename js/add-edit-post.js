import postApi from './api/postApi'
import { initFormData } from './utils'

;(async () => {
  try {
    const queryParams = new URLSearchParams(window.location.search)

    // get default data beetween edit and add mode;
    const defaultParams = queryParams.get('id')
      ? await postApi.getById(queryParams.get('id'))
      : {
          title: '',
          author: '',
          description: '',
          imageUrl: '',
        }

    // bind data into form
    initFormData({
      formId: 'postForm',
      defaultValues: defaultParams,
      onSubmit: (formValues) => console.log('formValues', formValues),
    })
  } catch (error) {
    console.log('can not access form data from api')
  }
})()
