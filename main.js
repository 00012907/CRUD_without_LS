let addBtn = document.querySelector('.submit');
let cardsList = document.querySelector('ul.cards');
let listItems = document.querySelectorAll('ul.cards>li')


let number = document.querySelector('#ccn');
const month = document.querySelector('#month');
const year = document.querySelector('#year');
const fullName = document.querySelector('#fullName');
const errorMsg = document.querySelector('#errorMsg')

let cardName = document.querySelectorAll('.card-name')
let cardNumber = document.querySelectorAll('.card-number')
let cardMonth=document.querySelectorAll('.expo-date-month')
let cardYear=document.querySelectorAll('.expo-date-year')
let numbers = /^[0-9]+$/;


// Validation
let id=0;
function validateForm(){
	let cardNum = document.querySelector('#ccn').value;
	const month = document.querySelector('#month').value;
	const year = document.querySelector('#year').value;
	let fulName = document.querySelector('#fullName').value;

	if(cardNum!==""&&cardNum.length==16&&cardNum.match(numbers)&&fulName!=""&&month!=""&&year!=''){
		return true;
	}
	else{
		errorMsg.innerHTML=
		`Please fill the inputs correctly!
		<br> --Inputs should not be empty!
		<br> --Card number should consist of 16 digits`
		return false;
	}
}


// Create
function addCard(id){
	cardsList.innerHTML=`<li class="box">
	<div class="buttons">
		<button class="edit-card" onclick="editCard(${id})">Edit</button>
		<button class="delete-card" onclick="removeCard(${id})">Delete</button>
	</div>
	<div class="card">
		<div class="row-1">
			<p>Credit card</p>
			<i class="fa-solid fa-coins"></i>
		</div>
			<i class="fa-solid fa-credit-card"></i>
			<span class="card-number">${number.value}</span>
			<div class="expo">
				<p class="expo-date-month">${month.value}</p>
				<p>/</p>
				<span class="expo-date-year">${year.value}</span>
			</div>
			<p class="card-name">${fullName.value}</p>
	</div>
</li>`
number.value='';
fullName.value='';
month.value='';
year.value='';
errorMsg.textContent='';
}

function editCard() {
	addCard(id)
  }
  
  let editBtn = document.querySelectorAll('ul.cards>li>.buttons>.edit-card')
  function editCard(id) {
	listItems.forEach(item => {
	  editBtn[id].addEventListener('click', () => {
		addBtn.innerHTML = `EDIT`
		fullName.value = cardName[id].innerHTML
		number.value = cardNumber[id].innerHTML
		month.value = cardMonth[id].innerHTML
		year.value = cardYear[id].innerHTML
	  })
	});
  }

  function removeCard(id) {
	const yesOrNo = confirm("Are you sure to delete the task?");
	if(yesOrNo){
		listItems[id].remove()
	}
  }
  addBtn.addEventListener('click', () => {
	if (addBtn.innerHTML == 'ADD') {
	  if (validateForm()) {
		addCard(id)
		editBtn = document.querySelectorAll('ul.cards>li>.buttons>.edit-card')
		listItems = document.querySelectorAll('ul.cards>li')
		// 
		cardName = document.querySelectorAll('.card-name')
		cardNumber = document.querySelectorAll('.card-number')
		cardMonth = document.querySelectorAll('.expo-date-month')
		cardYear = document.querySelectorAll('.expo-date-year')
		id++
	  }
	} else {
	  if (validateForm()) {
		cardName = document.querySelectorAll('.card-name')
		cardNumber = document.querySelectorAll('.card-number')
		cardMonth = document.querySelectorAll('.expo-date-month')
		cardYear = document.querySelectorAll('.expo-date-year')
  
		cardName[id - 1].innerHTML = fullName.value;
		cardNumber[id - 1].innerHTML = number.value;
		cardMonth[id-1].innerHTML=month.value;
		cardYear[id-1].innerHTML=year.value;
  
		addBtn.innerHTML = `ADD`
		fullName.value = ''
		number.value = ''
		month.value = ''
		year.value = ''
		errorMsg.textContent='';

	  }
	}
  })
  

// month/year input validation
 function focusSibling  (target, direction, callback) {
	const nextTarget = target[direction];
	nextTarget && nextTarget.focus();
	// if callback is supplied we return the sibling target which has focus
	callback && callback(nextTarget);
}

// input event only fires if there is space in the input for entry. 
month.addEventListener('input', (event) => {

	const value = event.target.value.toString(); 
	// adds 0 to month user input like 9 -> 09
	if (value.length === 1 && value > 1) {
		event.target.value = "0" + value;
	}
	// bounds
	if (value === "00") {
		event.target.value = "01";
	} else if (value > 12) {
		event.target.value = "12";
	}
	// if we have a filled input we jump to the year input
	2 <= event.target.value.length && focusSibling(event.target, "nextElementSibling");
	event.stopImmediatePropagation();
});

year.addEventListener('keydown', (event) => {
	// if the year is empty jump to the month input
	if (event.key === "Backspace" && event.target.selectionStart === 0) {
		focusSibling(event.target, "previousElementSibling");
		event.stopImmediatePropagation();
	}
});

function inputMatchesPattern (e) {
	const {
		value,
		selectionStart,
		selectionEnd,
		pattern
	} = e.target;

	const character = String.fromCharCode(e.which);
	const proposedEntry = value.slice(0, selectionStart) + character + value.slice(selectionEnd);
	const match = proposedEntry.match(pattern);

	return e.metaKey || // cmd/ctrl
		e.which <= 0 || // arrow keys
		e.which == 8 || // delete key
		match && match["0"] === match.input; // pattern regex isMatch - workaround for passing [0-9]* into RegExp
};

document.querySelectorAll('input[data-pattern-validate]').forEach(el => el.addEventListener('keypress', e => {
	if (!inputMatchesPattern(e)) {
		return e.preventDefault();
	}
}));




