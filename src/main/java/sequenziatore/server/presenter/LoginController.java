package sequenziatore.server.presenter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Vector;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;


@Controller
@RequestMapping(value = "/login")
public class LoginController {
	UserDao asd=new ;
	public class UtenteList extends ArrayList<Utente> {
		public UtenteList(){}
		 public UtenteList(Collection<? extends Utente> c) {
			         super(c);
			     }

	}
	@RequestMapping(method=RequestMethod.POST)
	@ResponseBody
	public void CheckLogin(@RequestBody Utente a) {
		System.out.println(a.getUsername()+a.getPassword()+"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaa");
		UserDao asd=new ;
		Utente a= asd.get
				
    }
	
	@RequestMapping(method=RequestMethod.GET, produces = "application/json")
	@ResponseBody//metodo che controlla i dati dell' utente
   
	public Vector<Utente> asd() {
		System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
		Vector<Utente> ciccio=new Vector<Utente>();
		Utente a=new Utente();
		Utente b=new Utente();
		ciccio.add(a);
		ciccio.add(b);
		return ciccio;
    }/*
		@RequestMapping(method=RequestMethod.POST, consumes = "application/json", produces = "application/json")
		@ResponseBody
		public void CheckLogin(@RequestBody String a) {
			System.out.println(a);
	    }
		@RequestMapping(method=RequestMethod.GET, produces = "application/json")
		@ResponseBody//metodo che controlla i dati dell' utente
	   
		public Vector<Utente> asd() {
			System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
			Vector<Utente> ciccio=new Vector<Utente>();
			Utente a=new Utente();
			Utente b=new Utente();
			ciccio.add(a);
			ciccio.add(b);
			return ciccio;
	    }
	*/
    	/*@RequestMapping(method=RequestMethod.POST, consumes = "application/json", produces = "application/json")
	@ResponseBody//metodo che controlla i dati dell' utente
	public Messaggio CheckPippo(@RequestBody Dumbo a) {
		System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+a.getPassword()+a.getUsername().get(0).getCiao());
		Messaggio b=new Messaggio("processowner");
        return b;
    	}*/
	/*@RequestMapping( method = RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public Messaggio exception3()
	{	
		int a,b;
		a=5;
		b=7;
		if(a==b){
	    throw new IllegalStateException("Exception3 with response status");
		}
		else{
			return new Messaggio("adasd");
		}
	}
	@ExceptionHandler(IllegalStateException.class)
	@ResponseStatus(value = HttpStatus.BAD_REQUEST,   reason = "Errore mail già presente")
	public void handleException3(IllegalStateException ex, HttpServletResponse response) throws IOException
	{
	 
	}*/
	/*@RequestMapping(method=RequestMethod.GET, consumes = "application/json", produces = "application/json")
	@ResponseBody
	public Messaggio prova() {
		Messaggio b=new Messaggio("processowner");
        return b;
    }*/
}
