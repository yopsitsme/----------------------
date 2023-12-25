//קריאה לפונקציה המתחילה את פעולות הדף
inStart();

//הפעלת הדף והגדרת פונקציות on-click
function inStart() {
	didTheUserSignUp = true;
	document.getElementById('signUp').addEventListener('click', remuveRight);
	document.getElementById('signIn').addEventListener('click', remuveLeft);
	document.getElementById('container');
	document.getElementById('signup').addEventListener("submit", saveSignUp);
	document.getElementById('login').addEventListener("submit", saveLogIn);
	if (localStorage.getItem('users') == null) {
		localStorage.setItem('users', '[]');
		localStorage.setItem('numberOfUsers', '0');
	}
}

//פונקציה המגלה את החלק של ההתחברות
function remuveRight() {
	container.classList.add("right-panel-active");
}

//פונקציה המגלה את החלק של ההרשמה 
function remuveLeft() {
	container.classList.remove("right-panel-active");
}

// שמירת פרטי המשתמש החדש ועידכנו כמשתמש נוכחי פעיל
function saveSignUp(e) {
	e.preventDefault();
	let saveName = document.getElementById('nameL').value;
	let saveEmail = document.getElementById('emailL').value;
	let savePassword = document.getElementById('passwordL').value;
	let users = [];
	users = JSON.parse(localStorage.getItem('users'));
	let flag = true;
	for (let i = 0; i < localStorage.getItem('numberOfUsers'); i++) {
		if (users[i].email === saveEmail) {
			alert("משתמש קיים,יש להתחבר")
			flag = false;
		}
	}
	if (flag) {
		let user = {
			name: saveName,
			email: saveEmail,
			password: savePassword,
			numOfWins: 0,
			heightScoure: 0,
		};
		let oldUsers = JSON.parse(localStorage.getItem('users'));
		oldUsers.push(user)
		localStorage.setItem('users', JSON.stringify(oldUsers));
		let numberOfUsers = localStorage.getItem('numberOfUsers');
		numberOfUsers++;
		localStorage.setItem('numberOfUsers', numberOfUsers);
		console.log(localStorage.getItem('numberOfUsers'));
		localStorage.setItem('currentUser', JSON.stringify(user));
		location.assign("../html/index.html");
	}
}


//חיבור המשתמש ועידכונו כמשתמש פעיל
function saveLogIn(e) {
	e.preventDefault();
	let saveEmail = document.getElementById('emailS').value;
	let savePassword = document.getElementById('passwordS').value;
	let flag = false
	let users = [];
	users = JSON.parse(localStorage.getItem('users'));
	for (let i = 0; i < localStorage.getItem('numberOfUsers'); i++) {
		if (users[i].email === saveEmail && users[i].password === savePassword) {
			localStorage.setItem('currentUser', JSON.stringify(users[i]));
			console.log("wee");
			flag = true;
			location.assign("../html/index.html");
		}
	}
	if (flag === false) {
		alert("שם משמש או סיסמא שגויים");
	}
}

