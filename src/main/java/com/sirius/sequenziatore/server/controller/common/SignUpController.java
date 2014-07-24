package com.sirius.sequenziatore.server.controller.common;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

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

@Controller
@RequestMapping(value="/signup")
public class SignUpController {
	@RequestMapping(method=RequestMethod.POST)
	@ResponseBody
	public void registerUser(@RequestBody User toBeRegistered){
		//imposto il dao con i bean
		ApplicationContext applicationContext=new ClassPathXmlApplicationContext("com/sirius/sequenziatore/server/model/daoContext.xml");
		UserDao daoUser=applicationContext.getBean("UserDao", UserDao.class);
		//controllo che non ci sia già un utente con queste credenziali
		if(daoUser.getUser(toBeRegistered.getName())==null){
			//inserisco il nuovo utente nel database in quanto non è presente
			daoUser.insertUser(toBeRegistered);
		}
		else{
			throw new IllegalStateException("Exception3 with response status");
		}
	}
	@ExceptionHandler(IllegalStateException.class)
	@ResponseStatus(value = HttpStatus.BAD_REQUEST,   reason = "Errore username già in uso")
	public void handleException3(IllegalStateException ex, HttpServletResponse response) throws IOException{
		
	}
}
