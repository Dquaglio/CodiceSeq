package com.sirius.sequenziatore.server.controller.common;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.sirius.sequenziatore.server.model.User;
import com.sirius.sequenziatore.server.model.UserDao;
import com.sirius.sequenziatore.server.service.SignUpService;

@Controller
@RequestMapping(value="/signup")
public class SignUpController {// classe che gestisce la registrazione di un nuovo utente
	@Autowired
	SignUpService signUpService;
	
	@RequestMapping(method=RequestMethod.POST)
	@ResponseBody
	public void registerUser(@RequestBody User toBeRegistered){
		//imposto il dao con i bean
		//ApplicationContext applicationContext=new ClassPathXmlApplicationContext("com/sirius/sequenziatore/server/model/daoContext.xml");
		//UserDao daoUser=applicationContext.getBean("UserDao", UserDao.class);
		//controllo che non ci sia già un utente con queste credenziali
		boolean result=signUpService.checkSignUp(toBeRegistered);
		if(result==false){
			throw new IllegalStateException("Utente già registrato");
		}
	}
	@ExceptionHandler(IllegalStateException.class)
	@ResponseStatus(value = HttpStatus.CONFLICT,   reason = "Errore username già in uso")
	public void handleException3(IllegalStateException ex, HttpServletResponse response) throws IOException{
		//invia al client un errore di conflitto 409
	}
}
