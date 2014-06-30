package com.sirius.sequenziatore.server.presenter.processowner;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sirius.sequenziatore.server.model.DataSent;
import com.sirius.sequenziatore.server.model.IDataValue;
import com.sirius.sequenziatore.server.model.NumericValue;

@Controller
@RequestMapping(value="/approvedata")
public class ApproveStepController {
	@RequestMapping(method=RequestMethod.GET, produces = "application/json")
	@ResponseBody
	public List<DataSent> getStepToApprove(){
		System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADASDASDADS");
		 List<DataSent> ritorno=new ArrayList<DataSent>();
		 DataSent a=new DataSent();
		 a.setStepId(1);
		 a.setUsername("Marco");
		 List<IDataValue> lista=new ArrayList<IDataValue>();
		 NumericValue numero=new NumericValue();
		 numero.setNumericValue(25);
		 lista.add(numero);
		 a.setData(lista);
		 ritorno.add(a);
		return ritorno;
	}
	@RequestMapping(method=RequestMethod.POST)
	@ResponseBody
	//classe che gestisce il risultato della moderazione di un passo da parte del process owner
	public void approveResponse(@RequestParam("stepId") int stepId,@RequestParam("username")String username,@RequestParam("approved") boolean approved){
		System.out.println(stepId+username+approved);
	}
}
