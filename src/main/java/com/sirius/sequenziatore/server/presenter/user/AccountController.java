package com.sirius.sequenziatore.server.presenter.user;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sirius.sequenziatore.server.model.User;
import com.sirius.sequenziatore.server.model.UserDao;

@Controller
@RequestMapping(value="/account/{username}")
public class AccountController {
	@RequestMapping(method=RequestMethod.GET)
	@ResponseBody
	public void prova(){
		ApplicationContext applicationContext=new ClassPathXmlApplicationContext("com/sirius/sequenziatore/server/model/daoContext.xml");
		UserDao dao=applicationContext.getBean("UserDao", UserDao.class);
		User prova=new User();
		prova = dao.getUser("userPippo");
		System.out.println(prova.getName());
		}
}
