//קריאה לפונקציה המפעילה את הדף
inStart();

//פונקציה המתחילה את פעילות הדף
function inStart() {
    document.getElementById("signLog").addEventListener('click', logInSignUpPage);
    document.querySelector('#signOut').addEventListener('click', signOut);
    currentUser();
    let user = document.getElementById('hello');
    let userNow = JSON.parse(localStorage.getItem('currentUser')).name;
    user.innerText = `שלום ${userNow}`;
}

//פונקציה להתנתקות ויציאה מחשבון המשתמש
function signOut() {
    localStorage.removeItem('currentUser');
    currentUser();
    inStart();
}

//פונקציה המגדירה משתמש נוכחי בררת מחדל אורח במקרה שהמשתמש לא נכנס לחשבון שלו
function currentUser() {
    if (localStorage.getItem('currentUser') === null) {
        let user = {
            name: "אורח",
            email: "guest@gmail.com",
            password: "0",
            numOfWins: "0",
            heightScoure: "0",
        }
        localStorage.setItem('currentUser', JSON.stringify(user));
    }
}

//מעבר לדף ההרשמה והתחברות
function logInSignUpPage(e) {
    e.preventDefault();
    location.assign("../html/loginSignup.html")
}
