
// validate 

document.getElementById('register-form').addEventListener('submit', function(event) {

    // let name=document.getElementById('name').value;
    // // alert(name);
    // if(name.length<6){
    //     alert("Username should be at least 6 characters !!");
    //     event.preventDefault();
    // }
    
    let phone=document.getElementById("phone").value;
    if(phone.length !=10 || isNaN(phone) ){
    
        alert("Enter Valid Phone Number !!");
        event.preventDefault(); // Prevent form submission
        console.log(phone.length,"  not=10")
    }

    let password = document.getElementById('pwd').value;
    if (password.length < 6) {
      alert('Password should be at least 6 characters long !!');
      event.preventDefault(); // Prevent form submission
    }

    // else{
    //     console.log(phone.length, " equal 10")
    // }
  });

// function validate(){
//     debugger;
//     let name=document.getElementById('name').value;
//     console.log(name);
//     console.log("name")
//     // alert(name);
//     if(name==""){
//         alert("enter details");
//     }

// }

