package com.sirius.sequenziatore.server.presenter.common;

import java.io.File;
import java.io.IOException;
import java.util.List;

import javax.servlet.ServletContext;

import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.ServletContextAware;
import org.springframework.web.multipart.MultipartFile;

import com.sirius.sequenziatore.server.model.Block;
import com.sirius.sequenziatore.server.model.Process;

@Controller
@RequestMapping(value="/process/{idprocess}")
public class ProcessInfoController implements ServletContextAware {
	public class wrapper{
		public List<Block> getBlock() {
			return block;
		}
		wrapper(){}
		public void setBlock(List<Block> block) {
			this.block = block;
		}
		List<Block> block;
	}
	private ServletContext servletContext;
	//metodo che ritorna la struttura di un processo
	@RequestMapping(method=RequestMethod.GET)
	@ResponseBody
	public Process getProcessInformation(@PathVariable int idprocess){
		return null;
	}
	//metodo e oggetto per mvc annotation driven per salvare le immagini
	@RequestMapping(value="/saveimage", method=RequestMethod.POST)
	public void uploadImage(@RequestParam(value="image")MultipartFile image){
		if(image.isEmpty()){
			System.out.println("Immagine vuota!!!!");
		}
		else{
			System.out.println("Qualcosa cè");
			File file=new File(servletContext.getRealPath("/")+"/images/"+"sicazzo.jpg");
			try {
				FileUtils.writeByteArrayToFile(file, image.getBytes());
				System.out.println("THE END");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	@Override
	public void setServletContext(ServletContext servletContext) {
		this.servletContext=servletContext;
	}
}
