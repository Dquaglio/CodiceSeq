package com.sirius.sequenziatore.server.model;

//import java.util.Date;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class DaoTest
{
	public static void main(String[] args) throws ClassNotFoundException
	{
		//Preparazione
		ApplicationContext applicationContext=new ClassPathXmlApplicationContext("com/sirius/sequenziatore/server/model/daoContext.xml");
		ProcessDao dao=applicationContext.getBean("ProcessDao", ProcessDao.class);
		//Resto... (query, ecc..)
		Process pro=new Process();
		pro.setName("Prova");
		pro.setDescription("descrizione...");
		pro.setTerminated(false);
		//System.out.println(dao.insertProcess(pro));
	}
}
