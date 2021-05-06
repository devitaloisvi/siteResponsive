function acesso(form) {

	form.nome.value = form.nome.value.toLowerCase()
	form.senha.value = form.senha.value.toLowerCase()

	if (form.nome.value == "marta@hotmail.com" && form.senha.value == "123") {
		location = "itech.html"
	} else {
		form.nome.value = ""
		form.senha.value = ""

		alert("Dados incorretos")
	}
}