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

import com.sirius.sequenziatore.server.model.DataSent;
import com.sirius.sequenziatore.server.model.ProcessDao;
import com.sirius.sequenziatore.server.model.ProcessOwner;
import com.sirius.sequenziatore.server.model.ProcessOwnerDao;
import com.sirius.sequenziatore.server.model.Step;
import com.sirius.sequenziatore.server.model.StepDao;
import com.sirius.sequenziatore.server.model.User;
import com.sirius.sequenziatore.server.model.UserDao;
import com.sirius.sequenziatore.server.model.Process;
import com.sirius.sequenziatore.server.model.UserStep;

@Controller
public class Test implements ServletContextAware{
	@Autowired
	private UserDao userDao;
	@Autowired
	private ProcessDao processDao;
	@Autowired
	private StepDao stepDao;
	@Autowired
	private ProcessOwnerDao processOwnerDao;
	private ServletContext servletContext;
	
	@RequestMapping(value="/test" ,method=RequestMethod.GET,produces = "application/json")
	@ResponseBody
	public List<DataSent> prova(){
		/*if(processOwnerDao==null)
			System.out.println("è null stepDao cazzooooooo");
		else
			System.out.println("StepDao ok");
		ProcessOwner po=processOwnerDao.getProcessOwner();
		if(po==null)
			System.out.println("po ritornato nullo..vai che passi swe... già");
		return po;*/
		//System.out.println(servletContext.getRealPath("/"));
	/*	if(stepDao==null)
			System.out.println("è null stepDao cazzooooooo");
		else
			System.out.println("StepDao ok");
		Step list=stepDao.getStep(34);
		if(list==null)
			System.out.println("Si pure questo ..ottimo");
		return list;*/
		/*List<Process> list=new ArrayList<Process>();
		if(processDao==null)
			System.out.println("è null cazzooooooo");
		else
			System.out.println("processDao ok");
		Process p=processDao.getProcess(52);
		if(p==null)
			System.out.println("è vuoto pure questo diaodadj a");
		list=processDao.getAllProcess();
		return list;*/
		List<DataSent> userStatus=new ArrayList<DataSent>();
		userStatus=stepDao.getWaitingData();
		return userStatus;
	}

	@Override
	public void setServletContext(ServletContext servletContext) {
		this.servletContext=servletContext;
	}
	@RequestMapping(value="/test2",method=RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public List<User> test(){
		/*System.out.println("");
		User user=new User();
		user.setName("asdsada");
		user.setDateOfBirth(new Date(1992, 02, 25));
		user.setEmail("skfas");
		user.setPassword("asdsaw");
		user.setSurname("qwrtweas");
		user.setUserName("asdasdafrefsd");
		boolean x=userDao.insertUser(user);*/
		List<User> toBeReturned=new ArrayList<User>();
		toBeReturned=userDao.getAllUser();
		if(toBeReturned==null)
			System.out.println("null");
		return toBeReturned;
	}
}
