package com.sirius.sequenziatore.server.model;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.mockito.Mockito.*;
import scala.annotation.meta.setter;

import com.sirius.sequenziatore.server.model.ProcessDao;
import com.sirius.sequenziatore.server.model.Process;

public class ProcessDaoTest {
	private static Process pcess1;
	private static Process pcess2;
	private static List<Process> listprocess;
	@Mock private ProcessDao mproc;

	@Before
	public void setup() {
		//creazione del campo mockato
		MockitoAnnotations.initMocks(this);
		//creo e setto primo oggetto di ritorno
		Process pcess1 = new Process();
		pcess1.setName("process1");
		pcess1.setDescription("processo uno di prova");
		pcess1.setCompletionsMax(5);
		pcess1.setId(2);
		pcess1.setTerminated(false);
		pcess1.setEliminated(true);
		//creo e setto secondo oggetto di ritorno
		Process pcess2 = new Process();
		pcess2.setName("process2");
		pcess2.setDescription("processo due di prova");
		pcess2.setCompletionsMax(5);
		pcess2.setId(2);
		pcess2.setTerminated(false);
		pcess1.setEliminated(false);
		//setto lista di processi
		List<Process> listprocess = new ArrayList<Process>();
		listprocess.add(pcess1);
		listprocess.add(pcess2);
		//setta oggetto da ritornare sul metodo di test
		when(mproc.getProcess(1)).thenReturn(pcess1);
		when(mproc.getProcess(2)).thenReturn(pcess2);
		when(mproc.getAllProcess()).thenReturn(listprocess);
		when(mproc.getNotEliminated()).thenReturn(listprocess);
		
	}

	@Test
	public void testGetProcess() throws Exception{
		//chiamata a metodo sotto test
		Process result=mproc.getProcess(1);
		//test1
		assertEquals(result.getName(),"process1");
		//test2
		assertEquals(result.getDescription(),"processo uno di prova");
		//verify (mproc); //cosa fa?????
	}

	@Test
	public void testGetAllProcess() {
		List<Process> result = new ArrayList<Process>();
		//chiamata a metodo sotto test
		result=mproc.getAllProcess();
		//test
		assertSame(result.get(1).getName() ,"process2");
		assertSame(result.get(0).getName() ,"process1");
	}

	@Test
	public void testGetAll() {
		//da fare
		assertSame("process1" ,"process1");
	}

	@Test
	public void testInsertProcess() {//no test
		fail("Not yet implemented");
	}

	@Test
	public void testUpdateProcess() {//no test
		fail("Not yet implemented");
	}

	@Test
	public void testGetNotEliminated() {//no test
		List<Process> result = new ArrayList<Process>();
		//chiamata a metodo sotto test
		result=mproc.getNotEliminated();
		//test
		assertSame(result.get(0).isEliminated() ,false);
	}

	@Test
	public void testGetProcesses() {//no test
		fail("Not yet implemented");
	}

	@Test
	public void testSubscribe() {//no test
		fail("Not yet implemented");
	}

}
