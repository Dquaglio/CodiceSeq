package com.sirius.sequenziatore.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sirius.sequenziatore.server.model.User;
import com.sirius.sequenziatore.server.model.UserDao;

@Service
public class SignUpService {
	@Autowired
	private UserDao userDao;
	public boolean checkSignUp(User toBeChecked){
		User dummy=userDao.getUser(toBeChecked.getUserName());//cerco se è già presente un utente registrato con lo stesso username
		if(dummy!=null){//se è presente ritorno false
			return false;
		}
		userDao.insertUser(toBeChecked);//altrimenti registro il nuovo utente
		return true;
	}
}
