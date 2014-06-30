package com.sirius.sequenziatore.server.presenter.common;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sirius.sequenziatore.server.model.Process;

@Controller
@RequestMapping(value="/process/{idprocess}")
public class ProcessInfoController {
	@RequestMapping(method=RequestMethod.GET)
	@ResponseBody
	public Process getProcessInformation(@PathVariable int idprocess){
		return null;
	}
}
