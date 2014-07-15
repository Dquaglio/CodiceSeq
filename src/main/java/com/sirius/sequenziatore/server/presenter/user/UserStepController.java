package com.sirius.sequenziatore.server.presenter.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sirius.sequenziatore.server.model.DataSent;

@Controller
@RequestMapping(value="/stepdata/user")
public class UserStepController {
	@RequestMapping(method=RequestMethod.POST)
	@ResponseBody
	public void saveStepData(@RequestBody DataSent step,@RequestBody int nextStep){
		
	}
	
	

}
