package com.sirius.sequenziatore.server.controller.common;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;

import com.sirius.sequenziatore.server.model.Process;
import com.sirius.sequenziatore.server.service.ProcessInfoService;

@Controller
@RequestMapping(value="/process/{idprocess}")
public class ProcessInfoController  { //classe addetta a ritornare le informazioni riguardanti i processi
	@Autowired
	private ProcessInfoService processInfoService;
	//metodo che ritorna la struttura di un processo
	@RequestMapping(method=RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public Process getProcessInformation(@PathVariable int idprocess){
		Process toBeReturned=processInfoService.getProcess(idprocess);//ottengo il processo da ritornare
		if(toBeReturned!=null){//se il processo esiste lo ritorno
			return toBeReturned;
		}
		throw new IllegalStateException("Processo non presente");
	}
	
	//metodo per salvare le immagini
	@RequestMapping(value="/saveimage", method=RequestMethod.POST)
	@ResponseBody
	public void uploadImage(@RequestParam(value="image")MultipartFile image){
		boolean result=processInfoService.saveImage(image);
		if(result==false)
			throw new IllegalStateException("impossibile salvare l' immagine");
	}
	
	@ExceptionHandler(IllegalStateException.class)
	@ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY,   reason = "Il processo cercato non è presente")
	public void handleException3(IllegalStateException ex, HttpServletResponse response) throws IOException{
		//invia al client un errore 422
	}
	
}
