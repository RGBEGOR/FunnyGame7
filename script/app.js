const product = {
    crazy: {
        name: "Crazy",
        price: 1000,
        img: 'images/products/burger-1.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    light: {
        name: "Light",
        price: 1000,
        img: 'images/products/Пепе.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: "CheeseBurger",
        price: 1000,
        img: 'images/products/Yoda.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: "dBurger",
        price: 1000,
        img: 'images/products/Lady.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    }
}

const productBtns = document.querySelectorAll('.wrapper__list-btn'),
    basketBtn = document.querySelector('.wrapper__navbar-btn'),
    basketModal = document.querySelector('.wrapper__navbar-basket'),
    closeBasketModal = document.querySelector('.wrapper__navbar-close'),
    basketChecklist = document.querySelector('.wrapper__navbar-checklist'),
    totalPriceBasket = document.querySelector('.wrapper__navbar-totalprice'),
    basketBtnCount = document.querySelector('.warapper__navbar-count')
    btncard = document.querySelector('.wrapper__navbar-bottom');
    print__body = document.querySelector('.print__body'),
    print__footer = document.querySelector('.print__footer')


productBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        plusOrMinus(this);
    });
});

function plusOrMinus(btn) {
    let parent = btn.closest('.wrapper__list-card'),
        parentId = parent.getAttribute('id')
    product[parentId].amount++
    basket()
}

function basket() {
    const productArray = []
    for (const key in product) {
        let totalCount = 0;
        const po = product[key]
        const productCard = document.querySelector(`#${po.name.toLowerCase()}`),
            parentIndecator = productCard.querySelector('.wrapper__list-count')
        if (po.amount) {
            productArray.push(po)
            basketBtnCount.classList.add('active');
            parentIndecator.classList.add('active');
            parentIndecator.innerHTML = po.amount;
            totalCount += po.amount
        } else {
            parentIndecator.classList.remove('active')
            parentIndecator.innerHTML = 0
        }
        basketBtnCount.innerHTML = totalCount
    }
    basketChecklist.innerHTML = ''
    for (let i = 0; i < productArray.length; i++) {
        basketChecklist.innerHTML += cardItemBurger(productArray[i])
    }
    const allCount = totalCountProduct()
    if (allCount) {
        basketBtnCount.classList.add('active')
    } else {
        basketBtnCount.classList.remove('active')
    }
    basketBtnCount.innerHTML = allCount
    totalPriceBasket.innerHTML = totalSummProduct()
}

function totalCountProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].amount
    }
    return total
}
function totalSummProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].totalSum
    }
    return total
}

function cardItemBurger(productData) {
    const {
        name,
        amount,
        img,
        totalSum
    } = productData

    return `
  
  <div class="wrapper__navbar-product">
      <div class="wrapper__navbar-info">
         <img src="${img}" alt="" class="wrapper__navbar-productImage">
         <div class="wrapper__navbar-subInfo">
          <p class="wrapper__navbar-infoName">${name}</p>
          <p class="wrapper__navbar-infoPrice">${totalSum}</p>
         </div>
      </div>
      <div class="wrapper__navbar-option" id="${name.toLowerCase()}_card">
          <button class="wrapper__navbar-symbol fa-plus" data-symbol="+">+</button>
          <span class="wrapper__navbar-count">${amount}</span>
          <button class="wrapper__navbar-symbol fa-minus" data-symbol="-">-</button>
      </div>
  </div>
  `

}

window.addEventListener('click',function(el){
    const btn = el.target
    if (btn.classList.contains('wrapper__navbar-symbol')){
       const attr = btn.getAttribute('data-symbol')
       const parent = btn.closest('.wrapper__navbar-option')
       if (parent){
        const idProduct = parent.getAttribute('id').split('_')[0]
        if(attr == '+') product[idProduct].amount++
        else if(attr == '-') product[idProduct].amount--
        basket()
       }
    }
})

basketBtn.addEventListener('click', () => {
    basketModal.classList.add('active')
})
closeBasketModal.addEventListener('click', () => {
    basketModal.classList.remove('active')
})

btncard.addEventListener('click', function(){
    print__body.innerHTML = ''
    for (const key in product) {
       const {name, amount, totalSum} = product[key];
       if(amount){
        print__body.innerHTML += `
        <div class="print__body-item">
                <div class="print__body-item_name">
                    <span>${name}</span>
                    <span>${amount}</span>
                </div>
                <p class="print__body-item_summ">${totalSum}</p>
            </div>
        `;
       }
           
    }

    print__footer.innerHTML = totalSummProduct()

    window.print();
})










const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

class Quiz
{
	constructor(type, questions, results)
	{

		this.type = type;


		this.questions = questions;

		this.results = results;

		this.score = 0;

		this.result = 0;

		this.current = 0;
	}

	Click(index)
	{
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;


		if(value >= 1)
		{
			correct = index;
		}
		else
		{

			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}


	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}


	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 


class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}


class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}


class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}


	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}


const results = 
[
	new Result("Вам многому нужно научиться", 4),
	new Result("Вы уже неплохо разбираетесь", 8),
	new Result("Ваш уровень выше среднего", 12),
	new Result("Красавчики так держать все команды молодцы", 14)
];


const questions = 
[
	
	new Question("Годы Столетней войны: ", 
	[
		new Answer('1338-1456', 0),
		new Answer("1335-1455", 0),
		new Answer("1327-1546", 0),
		new Answer("1337-1456", 1)
	]),
	new Question("Первый период Столетней войны завершился:", 
	[
		new Answer('Победой Англии', 1),
		new Answer("Победой Франции", 0),
		new Answer("Победой Крестоносцев", 0),
		new Answer("Поражением Англии", 0)
	]),
	new Question("Третий период Столетней войны завершился:", 
	[
		new Answer('Феодалы победили', 0),
		new Answer("Опять победили Крестоносцы", 0),
		new Answer("Победой Франции", 0),
		new Answer("Победой Англии", 1)
	]),
	new Question("В 1429 году во главе французской армии оказался человек называвший себя «спасителем Франции» это:", 
	[
		new Answer('Пастух Иоан', 0),
		new Answer("Жанна из деревни Дореми", 1),
		new Answer("Мария Анжу де ла Круа", 0),
		new Answer("Кал VII Дафин", 0)
	]),
	new Question("По обвинению в ереси суд инквизиции приговорил Орлеанскую деву Жанну к:", 
	[
		new Answer('Сожжению на костре', 1),
		new Answer("Четвертованию ", 0),
		new Answer("Отрубление головы ", 0),
		new Answer("Пожизненное заключение ", 0)

	]),
	new Question("В результате Столетней войны:", 
	[
		new Answer('Франция проиграла вещде где можно', 0),
		new Answer("Франция одержала победу", 1),
		new Answer("Англия победила ", 0),
		new Answer("В Англии началась гражданская война", 0)
	]),
	new Question(" Не соответствует событиям Столетней войны сражение:", 
	[
		new Answer('при Слейсе', 0),
		new Answer("у Креси  ", 0),
		new Answer("у Тулона", 1),
		new Answer("у Пуатье", 0)
	]),
	new Question("Какая территория осталась во владении англииского короля после окончания Столетней войны?", 
	[
		new Answer('Бретань', 0),
		new Answer("Аквитания ", 0),
		new Answer("Фландрия  ", 0),
		new Answer("Порт Кале", 1)
	]),
	new Question("Как звали монарха, который взошел на французский престол благодаря Жанне д’Арк? ", 
	[
		new Answer('Карл VII', 1),
		new Answer("Карл V", 0),
		new Answer("Генрих VII", 0),
		new Answer("Генрих V", 0)
	]),
	new Question("Сколько уровней в игре Стандоф?", 
	[
		new Answer('43', 0),
		new Answer("22", 0),
		new Answer("50", 1),
		new Answer("12", 0)
	]),


	new Question("Сколько видов валюты в игре Стандоф", 
	[
		new Answer('4 ', 0),
		new Answer("1 ", 0),
		new Answer("2", 1),
		new Answer("5", 0)
	]),
	new Question("С каким оружием скорость бега выше?", 
	[
		new Answer('Нож', 1),
		new Answer("SMG", 0),
		new Answer("Пистолет", 0),
		new Answer("SM1014", 0)
	]),
	new Question("Какая ночь была в мультвфильме про Алладина ?", 
	[
		new Answer('Узбекская', 0),
		new Answer("Кавказская ", 0),
		new Answer("Персидская ", 0),
		new Answer("Арабская ", 1)
	]),
	new Question("Какого мальчика воспитывали животные в джунглях", 
	[
		new Answer('Алладина', 0),
		new Answer("Маугли", 1),
		new Answer("черного", 0),
		new Answer("Дикого ", 0)
	]),
	new Question("Сколько лет спала спящая красавица? ", 
	[
		new Answer('100 лет ', 1),
		new Answer("милион", 0),
		new Answer("2 года", 0),
		new Answer("50 лет", 0)

	]),
	new Question("Какие животные владели магазином мороженого в «Зверополисе»? ", 
	[
		new Answer('Слоны ', 1),
		new Answer("Суслики", 0),
		new Answer("Тигры", 0),
		new Answer("Зайцы", 0)

	]),
	new Question("Что еще, кроме часов, держит в лапках Белый кролик в «Алисе в стране чудес»? ", 
	[
		new Answer('Зонтик ', 1),
		new Answer("Лапату", 0),
		new Answer("Шляпу", 0),
		new Answer("Трость", 0)

	]),
	new Question("Эпидемия какой болезни на время остановила военные действия во время Столетней войны? ", 
	[
		new Answer('Чума ', 1),
		new Answer("Ветрянка", 0),
		new Answer("Оспа", 0),
		new Answer("Коронавирус", 0)

	]),

];


const quiz = new Quiz(1, questions, results);

Update();


function Update()
{

	if(quiz.current < quiz.questions.length) 
	{

		headElem.innerHTML = quiz.questions[quiz.current].text;


		buttonsElem.innerHTML = "";


		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		

		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		Init();
	}
	else
	{

		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Ваши очки: " + quiz.score;
	}
}

function Init()
{

	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{

		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{

	let correct = quiz.Click(index);


	let btns = document.getElementsByClassName("button");


	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{

		btns[index].className = "button button_correct";
	}


	setTimeout(Update, 1000);
}



