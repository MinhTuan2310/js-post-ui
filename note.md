axios.delete(url[,config]): url la bat buoc phai truyen con [,config] thi co cung dc khong co cung khong sao

return axiosClient.get(url, { params, baseURL: 'google.com' }) : no se overide baseURL, su dung google.com

important: content-type phai viet dung typo, sai la tach nhe nhung nguoi ae thien lanh

interceptors: do something when request api (token, optimize data)
- handle error: 
 o dau co goi api o do phai co catch loi

 phai co await thi moi catch dc loi nhe

 loi dc catch o dau thi no stop o dau, neu k catch thi no se chay len tren thang cha

 default export, import: 1 thang duy nhat va export tuot luot het: import name from '';

 named export, import: dc nhieu thang va co the chon nhung thang minh su dung de import thoi: import {} from '';

 tree shaking: ki thuat remove nhung fn khong su dung khi bundle project

 khi hinh bi loi thi minh add them su kien error de set hinh anh default cho web nhe

 searchParams la 1 obj;

 khi muon truyen vao obj searchParams thi truyen vao 1 chuoi (window.location.search)

 window.location : lay ra obj url;

 window.location.search: lay ra chuoi query params

 window.location.assign: direct qua trang khac

 lightbox: next: (index + 1) % length
 lightbox: prev: (index - 1 + length) % length

 lay source hinh trong input thi them 1 cai input type = hidden roi set link vao