
var xhr = new XMLHttpRequest()
var mail = document.querySelector('.mail')
var pass = document.querySelector('.pass')
var btn = document.querySelector('.btn')
var title = document.querySelector('.title')
var toggles = document.querySelector('.toggle')
var choice = document.querySelector('.choice')
var check = document.querySelector('.check')

function send(){
	var array = {
		email: mail.value,
		password: pass.value
	}


	if(mail.value == '' && pass.value == ''){
		mail.style.boxShadow = "0 0 5px #F92C2C"
		pass.style.boxShadow = "0 0 5px #F92C2C"
		return
	} else if(pass.value == '' && mail.value !== ''){
		pass.style.boxShadow = "0 0 5px #F92C2C"
		return
	} else if(pass.value !== '' && mail.value == ''){
		mail.style.boxShadow = "0 0 5px #F92C2C"
		return
	}
  

  var data = null

  if(title.innerText == 'Sign In'){
    xhr.open('post','https://hexschool-tutorial.herokuapp.com/api/signin',true)
    xhr.setRequestHeader('Content-type','application/json')
    data = JSON.stringify(array)
  } else {
  	xhr.open('post','https://hexschool-tutorial.herokuapp.com/api/signup',true)
  	xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded')
  	  data = 'email='+array.email+'&password='+array.password
  }
	xhr.send(data)
  
  mail.value = ''
  pass.value = ''
  choice.checked = false
  
  xhr.onload = function(){
  	var response = JSON.parse(xhr.responseText)
  	switch(response.message){
  	  case '帳號註冊成功':
  	  alert(response.message)
  	    break;
  	  case '此帳號已被使用':
  	  alert(response.message)
  	    break;
  	  case '登入成功':
  	  alert(response.message)
  	    break;
  	  case '此帳號不存在或帳號密碼錯誤':
  	  alert(response.message)
  	    break;
  	  case 'Email 格式不正確':
  	  alert(response.message)
  	    break;
  	}
  }
}

function updateStatus(e){
	e.preventDefault()

  if(title.innerText == 'Sign In'){
  	title.innerText = 'Register'
  	btn.innerText = '註冊'
  	toggles.innerText = '已有帳號了?'
  	check.innerText = '同意條款'
  	choice.checked = false
  } else {
  	title.innerText = 'Sign In'
  	btn.innerText = '送出'
  	toggles.innerText = '還沒註冊嗎?'
  	check.innerText = '記住我'
  	choice.checked = false
  }

  pass.style.boxShadow = "0 0 5px #707070"
  mail.style.boxShadow = "0 0 5px #707070"
}


function passcheck(){
	if(pass.value == ''){
	  pass.style.boxShadow = "0 0 5px #F92C2C"
	} else{
		pass.style.boxShadow = "0 0 5px #707070"
	}
}
function mailcheck(){
  if(mail.value == ''){
    mail.style.boxShadow = "0 0 5px #F92C2C"
  } else{
  	mail.style.boxShadow = "0 0 5px #707070"
  }
}
pass.addEventListener('blur',passcheck)
mail.addEventListener('blur',mailcheck)
toggles.addEventListener('click',updateStatus)
btn.addEventListener('click',send)