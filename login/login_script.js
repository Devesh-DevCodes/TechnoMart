// validate 

document.getElementById('login-form').addEventListener('submit', function(event) {

    let name=document.getElementById('name').value;
    // alert(name);
    if(name.length<6){
        alert("Username should be at least 6 characters !!");
        event.preventDefault();
    }

    var password = document.getElementById('pwd').value;
    if (password.length < 6) {
      alert('Password should be at least 6 characters long !!');
      event.preventDefault(); // Prevent form submission
    }
  });

  