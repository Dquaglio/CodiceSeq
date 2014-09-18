package com.sirius.sequenziatore.server.model;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.mockito.Mockito.*;

public class UserDaoTest {
	
	@Mock private UserDao muser;
	private static User us1;
	private static User us2;
	private static List<User> listuser;
	
	@Before
	public void setup(){
		//creazione campo mockato
		MockitoAnnotations.initMocks(this);
		//creazione user1 e user2 per test
		User us1= new User();
		us1.setUsername("paolo77");
		us1.setName("Paolo");
		us1.setSurname("Rossi");
		User us2= new User();
		us2.setUsername("bim77");
		us2.setName("Mario");
		us2.setSurname("Bianchi");
		//lista
		List<User> listuser = new ArrayList<User>();
		listuser.add(us1);
		listuser.add(us2);
		//setto oggetto di ritorno
		when(muser.getUser("bim77")).thenReturn(us2);
		when(muser.getAllUser()).thenReturn(listuser);
	}

	@Test
	public void testGetUser() {
		//chiamata al metodo da testare
		User result=muser.getUser("bim77");
		//test
		assertEquals(result.getSurname(), "Bianchi");
	}

	@Test
	public void testGetAllUser() {
		List<User> result = new ArrayList<User>();
		//chiamata a metodo sotto test
		result=muser.getAllUser();
		//test
		assertSame(result.get(1).getName() ,"Mario");
	}

}
