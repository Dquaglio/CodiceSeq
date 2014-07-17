package com.sirius.sequenziatore.server.presenter.processowner;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sirius.sequenziatore.server.model.Block;
import com.sirius.sequenziatore.server.model.Process;
import com.sirius.sequenziatore.server.presenter.utilities.ListBlock;

@Controller
@RequestMapping(value="/process/processowner")
public class ProcessController {
	@RequestMapping(method=RequestMethod.POST,consumes = "application/json", produces = "application/json")
	@ResponseBody
	public int createProcess(@RequestBody Process process,@RequestBody ListBlock blocks){
		System.out.println("Creato processo"+process.getName()/*+blocks*/);
		return 1;
	}

}
