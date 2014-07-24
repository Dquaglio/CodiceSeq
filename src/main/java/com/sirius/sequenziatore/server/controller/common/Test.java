package com.sirius.sequenziatore.server.controller.common;

import javax.servlet.ServletContext;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.ServletContextAware;

@Controller
public class Test implements ServletContextAware{
	private ServletContext servletContext;
	
	@RequestMapping(value="/test" ,method=RequestMethod.GET)
	@ResponseBody
	public String prova(){
		System.out.println(servletContext.getRealPath("/"));
		return "OK";
	}

	@Override
	public void setServletContext(ServletContext servletContext) {
		this.servletContext=servletContext;
	}
}
