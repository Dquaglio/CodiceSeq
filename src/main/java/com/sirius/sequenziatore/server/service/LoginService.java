package com.sirius.sequenziatore.server.service;

import org.springframework.stereotype.Service;

import com.sirius.sequenziatore.server.model.ProcessOwner;
import com.sirius.sequenziatore.server.model.User;
import com.sirius.sequenziatore.server.model.UserDao;

@Service
public class LoginService {
	/*il metodo dovrà ritornare 0 se non esiste, 1 se è un utente e 2 se è un processowner*/
	public int checkLogin(User toBeChecked){
		UserDao userDao;
		ProcessOwnerDao processOwnerDao;
		//eseguo il controllo per l utente
		User finded=userDao.getUser(toBeChecked.getUserName());
		if(finded!=null){//se l utente trovato è null, il database non contiene l utente cercato
			if(finded.getPassword().equals(toBeChecked.getPassword())){//l' utente esiste e la password è corretta
				return 1;
			}
		}
		//eseguo il controllo per il processOwner
		ProcessOwner processOwner=processOwnerDao.getProcessOwner(toBeChecked.getUserName());
		if(processOwner!=null)
			if(processOwner.getPassword().equals(toBeChecked.getUserName())){
				return 2;
			}
		return 0;
	}
}
