package com.sirius.sequenziatore.server.controller.user;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.sirius.sequenziatore.server.model.DataSent;
import com.sirius.sequenziatore.server.service.ReportService;

@Controller
@RequestMapping(value="/process/{idprocess}")
public class ReportController {
	@Autowired
	private ReportService reportService;
	
	@RequestMapping(method=RequestMethod.GET,value="/{username}")
	@ResponseBody
	public List<DataSent> getReport(@PathVariable int idprocess,@PathVariable String username){
		List<DataSent> dataList=new ArrayList<DataSent>();
		dataList=reportService.getReportData(username,idprocess);
		if(dataList!=null)
			return dataList;
		throw new IllegalStateException("impossibile recuperare i dati");
	}
	@ExceptionHandler(IllegalStateException.class)
	@ResponseStatus(value = HttpStatus.NOT_FOUND,   reason = "Passi in attesa di approvazione non trovati")
	public void handleException(IllegalStateException ex, HttpServletResponse response) throws IOException{
		//invia al client un errore 422
	}
}
