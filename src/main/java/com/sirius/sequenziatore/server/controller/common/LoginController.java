/*!
* \File: LoginController.java 
* \Author: Quaglio Davide <quaglio.davide@gmail.com> 
* \Date: 2014-04-22 
* \LastModified: 2014-09-10
* \Class: LoginController
* \Package: com.sirius.sequenziatore.server.controller.common
* \Brief: Gestione della login con il client
*/
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.sirius.sequenziatore.server.model.User;
import com.sirius.sequenziatore.server.service.LoginService;

@Controller
@RequestMapping(value="/login")
public class LoginController {
	@Autowired
	private LoginService loginService;
	@RequestMapping(method=RequestMethod.POST)
	@ResponseBody
	public String receiveLoginRequest(@RequestParam String username,@RequestParam String password){
		int result=loginService.checkLogin(username,password);
		if(result==0)
			throw new IllegalStateException("Credenziali non corrette");
		if(result==1)
			return "user";
		if(result==2)
			return "processowner";
		return null;
	}
	@ExceptionHandler(IllegalStateException.class)
	@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR,   reason = "Errore credenziali non corrette")
	public void handleException(IllegalStateException ex, HttpServletResponse response) throws IOException{
		//invia al client un errore 422
	}
}
