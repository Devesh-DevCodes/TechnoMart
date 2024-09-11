
function login() {
    let pop = document.getElementById("login_page");
    pop.style.visibility = "visible";
}
function login_reverse() {
    let pop = document.getElementById("login_page");
    pop.style.visibility = "hidden";
}

window.onload = login();
