package com.sirius.sequenziatore.server.controller.common;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.ServletContextAware;

import com.sirius.sequenziatore.server.model.User;
import com.sirius.sequenziatore.server.model.UserDao;

@Controller
public class Test implements ServletContextAware{
	@Autowired
	private UserDao userDao;
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
	@RequestMapping(value="/test2",method=RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public List<User> test(){
		System.out.println("");
		User user=new User();
		user.setName("asdsada");
		user.setDateOfBirth(new Date(1992, 02, 25));
		user.setEmail("skfas");
		user.setPassword("asdsaw");
		user.setSurname("qwrtweas");
		user.setUserName("asdasdafrefsd");
		boolean x=userDao.insertUser(user);
		List<User> toBeReturned=new ArrayList<User>();
		toBeReturned=userDao.getAllUser();
		if(toBeReturned==null)
			System.out.println("null"+x);
		return toBeReturned;
	}
}
