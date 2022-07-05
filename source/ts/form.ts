const FullName = document.querySelector('#FullName') as HTMLInputElement;
const Email = document.querySelector('#Email') as HTMLInputElement;
const Message = document.querySelector('#Message') as HTMLInputElement;
const submit = document.querySelector('#submit') as HTMLFormElement;

submit.addEventListener('click', function(e){
    e.preventDefault();
})