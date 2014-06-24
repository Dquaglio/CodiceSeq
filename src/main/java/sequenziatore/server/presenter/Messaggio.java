package sequenziatore.server.presenter;

public class Messaggio {
	private String usertype;
	private String prova;
	public Messaggio(){}
	public Messaggio(String a){
		setUsertype(a);
	}
	public String getUsertype() {
		return usertype;
	}
	public void setUsertype(String usertype) {
		this.usertype = usertype;
	}
	public String getProva() {
		return prova;
	}
	public void setProva(String prova) {
		this.prova = prova;
	}
}
