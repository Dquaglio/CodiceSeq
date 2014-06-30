package com.sirius.sequenziatore.server.presenter.processowner;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping(value="/stepdata/{idstep}/processowner")
public class ProcessController {
	@RequestMapping(method=RequestMethod.POST,consumes = "application/json", produces = "application/json")
	public void createProcess(@RequestBody Process toBeCreated,@RequestParam(value="idstep") int idstep){
		
	}

}
