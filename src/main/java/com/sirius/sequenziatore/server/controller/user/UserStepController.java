package com.sirius.sequenziatore.server.controller.user;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.sirius.sequenziatore.server.model.DataSent;
import com.sirius.sequenziatore.server.service.UserStepService;

@Controller
@RequestMapping(value="/stepdata/user")
public class UserStepController {
	@Autowired
	UserStepService userStepService;
	@RequestMapping(method=RequestMethod.POST,value="/{username}")
	@ResponseBody
	public void saveStepData(@RequestBody DataSent step,@PathVariable String username){
		
	}
	@ExceptionHandler(IllegalStateException.class)
	@ResponseStatus(value = HttpStatus.NOT_FOUND,   reason = "Passi in attesa di approvazione non trovati")
	public void handleException(IllegalStateException ex, HttpServletResponse response) throws IOException{
		//invia al client un errore 422
	}
	

}
