package com.sirius.sequenziatore.server.presenter.common;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.sirius.sequenziatore.server.model.Process;

@Controller
@RequestMapping(value="/process/{idprocess}")
public class ProcessInfoController {
	//metodo che ritorna la struttura di un processo
	@RequestMapping(method=RequestMethod.GET)
	@ResponseBody
	public Process getProcessInformation(@PathVariable int idprocess){
		return null;
	}
	//metodo e oggetto per mvc annotation driven per salvare le immagini
	private String imagesFolder;
	
	@RequestMapping(value = "/saveimage", method = RequestMethod.POST)
	@ResponseBody
	public String uploadFile(@RequestParam MultipartFile file) {
		InputStream inputStream = null; 
		OutputStream outputStream = null;
		String fileName=file.getName();
		File newImage = new File(imagesFolder + fileName);
		try {
			
			inputStream = file.getInputStream();	
			   if (!newImage.exists()) {  
				    newImage.createNewFile();  
				   }  
				   outputStream = new FileOutputStream(newImage);  
				   int read = 0;  
				   byte[] bytes = new byte[1024];
				   while ((read = inputStream.read(bytes)) != -1) {  
				    outputStream.write(bytes, 0, read);  
				   } 
		} catch (IOException e) {
			// Eccezzione lanciata dal metodo getInputStream()
			e.printStackTrace();
		}  
		return  null;
	}
}
