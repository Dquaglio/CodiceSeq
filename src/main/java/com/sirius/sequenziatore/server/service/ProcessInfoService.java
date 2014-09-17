package com.sirius.sequenziatore.server.service;

import java.io.File;
import java.io.IOException;

import javax.servlet.ServletContext;

import com.sirius.sequenziatore.server.model.Process;
import com.sirius.sequenziatore.server.model.ProcessDao;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.ServletContextAware;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ProcessInfoService implements ServletContextAware{
	@Autowired
	private ProcessDao processDao;
	private ServletContext servletContext;
	@Override
	public void setServletContext(ServletContext servletContext) {
		this.servletContext=servletContext;
	}
	public boolean saveImage(MultipartFile image){
		if(image.isEmpty()){
			return false;
		}
		else{
			System.out.println(servletContext.getRealPath("/"));
			File file=new File(servletContext.getRealPath("/")+"/images/"/*+image.getName()*/+"sicazzo.jpg");
			try {
				FileUtils.writeByteArrayToFile(file, image.getBytes());
			} catch (IOException e) {
				e.printStackTrace();
				return false;
			}
		}
		return true;
	}
	public Process getProcess(int id){
		Process toBeReturned;
		toBeReturned=processDao.getProcess(id);
		return toBeReturned;
	}
	
}
