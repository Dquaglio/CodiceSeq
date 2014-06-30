package com.sirius.sequenziatore.server.presenter.common;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value="/signup")
public class SignUpController {
	@RequestMapping(method=RequestMethod.POST)
	@ResponseBody
	public void registerUser(@RequestBody User toBeRegistered){
		
	}

}
