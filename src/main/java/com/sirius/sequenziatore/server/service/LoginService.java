/*!
* \File: LoginService.java 
* \Author: Quaglio Davide <quaglio.davide@gmail.com> 
* \Date: 2014-04-22 
* \LastModified: 2014-09-10
* \Class: LoginService
* \Package: com.sirius.sequenziatore.server.service
* \Brief: gestione login
* */
package com.sirius.sequenziatore.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sirius.sequenziatore.server.model.ProcessOwner;
import com.sirius.sequenziatore.server.model.ProcessOwnerDao;
import com.sirius.sequenziatore.server.model.User;
import com.sirius.sequenziatore.server.model.UserDao;

@Service
public class LoginService {
	@Autowired
	private UserDao userDao;
	@Autowired
	private ProcessOwnerDao processOwnerDao;
	/*il metodo dovrà ritornare 0 se non esiste, 1 se è un utente e 2 se è un processowner*/
	public String checkLogin(String username,String password){
		//eseguo il controllo per l utente
		User finded=userDao.getUser(username);
		if(finded!=null){//se l utente trovato è null, il database non contiene l utente cercato
			if(finded.getPassword().equals(password)){//l' utente esiste e la password è corretta
				return "user";
			}
		}
		//eseguo il controllo per il processOwner
		ProcessOwner processOwner=processOwnerDao.getProcessOwner();
		if(processOwner!=null)
			if(processOwner.getPassword().equals(password)){
				return "processowner";
			}
		return null;
	}
}
