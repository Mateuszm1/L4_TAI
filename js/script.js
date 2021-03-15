

let next = document.querySelector('.next');
let previous = document.querySelector('.previous');
let list = document.querySelector('.list');
let userScorePoint = document.querySelector('.userScorePoint');
let question = document.querySelector('.question');
let answers = document.querySelectorAll('.list-group-item');
let indexshow = document.querySelector('#index');
let pointsElem = document.querySelector('.score');
let restart = document.querySelector('.restart');
let results = document.querySelector('.results');
let index = 0;
let points = 0;

fetch('https://quiztai.herokuapp.com/api/quiz')
    .then(resp => resp.json())
    .then(resp => {
        let preQuestions = resp;
			
			

		function setQuestion(index){
			indexshow.innerHTML = index;
			question.innerHTML = preQuestions[index].question;
			
			answers[0].innerHTML = preQuestions[index].answers[0];
			answers[1].innerHTML = preQuestions[index].answers[1];
			answers[2].innerHTML = preQuestions[index].answers[2];
			answers[3].innerHTML = preQuestions[index].answers[3];
			
			if(preQuestions[index].answers.length === 2){
				answers[2].style.display = 'none';
				answers[3].style.display = 'none';
			}
			else{
				answers[2].style.display = 'block';
				answers[3].style.display = 'block';
			}

		}
		
		setQuestion(index);

		function activateAnswers(){
			for (let i = 0; i < answers.length; i++) {
				answers[i].addEventListener('click', doAction);
				if (answers[i].classList.contains('correct')) {
							answers[i].classList.remove('correct');
						} else if (answers[i].classList.contains('incorrect')) {
							answers[i].classList.remove('incorrect');
						}
			}
		}

		activateAnswers();


		function disableAnswers(){
				for (let i = 0; i < answers.length; i++) {
				answers[i].removeEventListener('click', doAction);
			}
		}

		function markCorrect(elem){
			elem.classList.add('correct');
		}

		function markInCorrect(elem){
			elem.classList.add('incorrect');
		}

		function removeMark(elem){
			elem.classList.remove('correct');
			elem.classList.remove('incorrect');
		}

		next.addEventListener('click', function (){
			index++;
			if(index >= preQuestions.length){
				
				list.style.display = 'none';
				results.style.display = 'block';
				userScorePoint.innerHTML = points;
			}
			else{
			setQuestion(index);
			activateAnswers();
			}
		});

		previous.addEventListener('click', function (){
			if(index > 0){
			index--;
			setQuestion(index);
			}
		});


		function doAction(event) {
			//event.target - Zwraca referencję do elementu, do którego zdarzenie zostało pierwotnie wysłane.
			if (event.target.innerHTML === preQuestions[index].correct_answer) {
				points++;
			   pointsElem.innerText = points;
				markCorrect(event.target);
			}
			else {
				markInCorrect(event.target);
			}
			disableAnswers();
		}



		restart.addEventListener('click', function (event) {
			event.preventDefault();
			index = 0;
			points = 0;
			let userScorePoint = document.querySelector('.score');
			userScorePoint.innerHTML = points;
			setQuestion(index);
			activateAnswers();
			list.style.display = 'block';
			results.style.display = 'none';
		})
})
