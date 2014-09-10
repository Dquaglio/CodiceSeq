package com.sirius.sequenziatore.server.controller.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sirius.sequenziatore.server.model.User;
import com.sirius.sequenziatore.server.model.UserDao;
import com.sirius.sequenziatore.server.service.AccountService;

@Controller
@RequestMapping(value="/account/{username}")
public class AccountController {
	@Autowired
	AccountService accountService;
}
