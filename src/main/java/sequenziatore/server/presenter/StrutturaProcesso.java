package sequenziatore.server.presenter;

import java.util.List;

public class StrutturaProcesso {
	private Processo proc;
	private List<Utente> users;

	public List<Utente> getUsers() {
		return users;
	}
	public StrutturaProcesso(){}
	public void setUsers(List<Utente> utenti) {
		this.users = utenti;
	}
}
