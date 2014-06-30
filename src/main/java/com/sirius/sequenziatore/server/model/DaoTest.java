/*package com.sirius.sequenziatore.server.model;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.sirius.sequenziatore.server.model.ITelephoneDao;

public class DaoTest
{
	public static void main(String[] args) throws ClassNotFoundException
	{
		//Preparazione
		ApplicationContext applicationContext=new ClassPathXmlApplicationContext("dao/daoContext.xml");
		ITelephoneDao dao=applicationContext.getBean("telephoneDao", ITelephoneDao.class);
		//Resto... (query, ecc..)
		
		System.out.println(dao.selectTelephone("Marco", "Botter").getNumber()); //SELEZIONE: OK
		
		//dao.deleteTelephone("Gilberto", "File"); //CANCELLAZIONE: OK
		
		//dao.insertTelephone(new Telephone("Tullio", "Vardanega", "3030303030")); //INSERIMENTO: OK
		
		/*try {
			dao.updateTelephone(new Telephone("Tullio", "Vardanega", "3333333333")); //AGGIORNAMENTO: OK
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		
	}
}
*/