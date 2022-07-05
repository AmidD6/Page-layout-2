let Persons = [
    {
        name: "Zoltan Nemeth",
        message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores assumenda temporibus voluptatum ea perferendis necessitatibus.",
        stars: [1, 1, 1, 1, 0.5]
    },
    {
        name: "Patrick Jackman",
        message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores assumenda temporibus.",
        stars: [1, 0.5, 0, 0, 0]
    },
    {
        name: "Elizabeth Watson",
        message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores assumenda temporibus voluptatum.",
        stars: [1, 1, 0.5, 0, 0]
    }
];

const container__message = document.querySelector('#container__message') as HTMLElement;
const container__name = document.querySelector('#container__name') as HTMLElement;
const container__stars = document.querySelectorAll<HTMLElement>('#container__stars');

var num = 0;

document.addEventListener('DOMContentLoaded', function(){
    CommentPerson(num);
    
    function clickComment(event: Event){
        let elem = event.target as HTMLElement;
        if (elem.classList.contains('testimony__page__container__message__buttons__next')) {
            num++;
            isLength(num, elem);
        }
        else if (elem.classList.contains('testimony__page__container__message__buttons__back')) {
            num--;
            isLength(num, elem);
        }
    }

    document.addEventListener('click', clickComment, false)

    function isLength(item: number, elem: HTMLElement) {
        if (item < 0) {
            num = 0;
            elem.removeEventListener('click', clickComment, false);
        }
        else if (item > Persons.length - 1) {
            num = Persons.length - 1;
            elem.removeEventListener('click', clickComment, false);
        }
        else {
            elem.classList.remove('disabled');
            CommentPerson(item);
        }
    }
})

function CommentPerson(num: number) {
    container__message.innerHTML = Persons[num].message;
    container__name.innerHTML = Persons[num].name;
    for (var i = 0; i < container__stars.length; i++) {
        container__stars[i].className = '';
        if (Persons[num].stars[i] == 1) container__stars[i].classList.add('fa-solid', 'fa-star');
        else if (Persons[num].stars[i] == 0.5) container__stars[i].classList.add('fa-solid', 'fa-star-half-stroke');
        else if (Persons[num].stars[i] == 0) container__stars[i].classList.add('fa-regular', 'fa-star');
    }
}
