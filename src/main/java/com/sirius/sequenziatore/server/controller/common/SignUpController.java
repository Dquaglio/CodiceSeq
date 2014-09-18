package com.sirius.sequenziatore.server.controller.common;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.sirius.sequenziatore.server.model.User;
import com.sirius.sequenziatore.server.service.SignUpService;

@Controller
@RequestMapping(value="/signup")
public class SignUpController {// classe che gestisce la registrazione di un nuovo utente
	@Autowired
	private SignUpService signUpService;
	@RequestMapping(method=RequestMethod.POST)
	@ResponseBody
	public boolean registerUser(@RequestBody User toBeRegistered){
		boolean result=signUpService.checkSignUp(toBeRegistered);
		if(result==false){
			throw new IllegalStateException("Utente già registrato");
		}
		else return result;
	}
	@ExceptionHandler(IllegalStateException.class)
	@ResponseStatus(value = HttpStatus.CONFLICT,   reason = "Errore username già in uso")
	public void handleException3(IllegalStateException ex, HttpServletResponse response) throws IOException{
		//invia al client un errore di conflitto 409
	}
}
