package com.sirius.sequenziatore.server.model;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.ParameterizedRowMapper;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import com.sirius.sequenziatore.server.model.Block.BlockTypes;
import com.sirius.sequenziatore.server.model.UserStep.StepStates;

@Repository
public class StepDao implements IDataAcessObject 
{
	private JdbcTemplate jdbcTemplate;
	@Autowired
	public void setJdbcTemplate(JdbcTemplate jdbcTemplate)
	{
		this.jdbcTemplate=jdbcTemplate;
	}
	
	public Step getStep(final int id)
	{
		try
		{
			//Campi passo semplici
			String selQuery="SELECT * FROM step where id=?";
			ParameterizedRowMapper<Step> mapper = new ParameterizedRowMapper<Step>()
			{
				public Step mapRow(ResultSet rs, int rowNum) throws SQLException
				{
					Step step=new Step();
					step.setId(id);
					step.setFirst(rs.getBoolean("isFirst"));
					step.setDescription(rs.getString("description"));
					step.setNextStepId(rs.getInt("nextStepId"));
					step.setRequiresApproval(rs.getBoolean("requiresApproval"));
					step.setOptional(rs.getBoolean("optional"));
					step.setProcessId(rs.getInt("processId"));
					return step;
				}
			};
			Step step=jdbcTemplate.queryForObject(selQuery, mapper, new Object[] {id});
			//NumericData
			List<NumericData> numericDataList=new ArrayList<NumericData>();
			selQuery="SELECT * FROM data WHERE type=? AND currentStepId=?";
			List<Map<String, Object>> rows = jdbcTemplate.queryForList(selQuery, new Object[]{IDataValue.DataTypes.NUMERIC.toString(),id});
			for (Map<String, Object> row : rows)
			{
				NumericData numericData=new NumericData();
				//Campi tabella step
				numericData.setDescription((String)row.get("description"));
				int dataId=(int)row.get("id");
				//Campi tabella bond
				try
				{
					selQuery="SELECT * FROM bond WHERE associatedDataId=?";
					Map<String,Object> bondrow=jdbcTemplate.queryForMap(selQuery, new Object[]{dataId});
					numericData.setMaxValue((double)bondrow.get("masValue"));
					numericData.setMinValue((double)bondrow.get("minValue"));
					numericData.setDecimal((boolean)bondrow.get("isDecimal"));
				}
				catch(org.springframework.dao.EmptyResultDataAccessException em)
				{
					//Nessun vincolo per questo dato
				}
				finally{}
				//Completo
				numericDataList.add(numericData);
			}
			step.setNumericData(numericDataList);
			//TextualData
			List<TextualData> textualDataList=new ArrayList<TextualData>();
			selQuery="SELECT description FROM data WHERE type=? AND currentStepId=?";
			rows = jdbcTemplate.queryForList(selQuery, new Object[]{IDataValue.DataTypes.TEXTUAL.toString(),id});
			for (Map<String, Object> row : rows)
			{
				TextualData textualData=new TextualData();
				textualData.setDescription((String)row.get("description"));
				textualDataList.add(textualData);
			}
			step.setTextualData(textualDataList);
			//ImageData
			List<ImageData> imageDataList=new ArrayList<ImageData>();
			selQuery="SELECT description FROM data WHERE type=? AND currentStepId=?";
			rows = jdbcTemplate.queryForList(selQuery, new Object[]{IDataValue.DataTypes.IMAGE.toString(),id});
			for (Map<String, Object> row : rows)
			{
				ImageData imageData=new ImageData();
				imageData.setDescription((String)row.get("description"));
				imageDataList.add(imageData);
			}
			step.setImageData(imageDataList);
			//GeographicData
			selQuery="SELECT COUNT(*) FROM data WHERE type=? AND currentStepId=?";
			Object[] params=new Object[]{"GEOGRAPHIC",id};
			if(jdbcTemplate.queryForInt(selQuery, params)!=0)
			{
				//Se c'� il dato geografico
				GeographicData geographicData=new GeographicData();
				selQuery="SELECT * FROM data WHERE type=? AND currentStepId=?";
				Map<String,Object> row=jdbcTemplate.queryForMap(selQuery, new Object[]{IDataValue.DataTypes.GEOGRAPHIC.toString(), id});
				geographicData.setDescription((String)row.get("description"));
				int dataId=(int)row.get("id");
				//Vincoli geografici
				try
				{
					selQuery="SELECT * FROM bond WHERE associatedDataId=?";
					row=jdbcTemplate.queryForMap(selQuery, new Object[]{dataId});
					geographicData.setLatitude((double)row.get("latitude"));
					geographicData.setLongitude((double)row.get("longitude"));
					geographicData.setAltitude((double)row.get("altitude"));
					geographicData.setRadius((double)row.get("radius"));
				}
				catch(org.springframework.dao.EmptyResultDataAccessException em)
				{
					//Nessun vincolo per questo dato
				}
				finally{}
				//Fine
				step.setRequiredPosition(geographicData);
			}
			//Fine
			return step;
		}
		catch(Exception ex)
		{
			return null;
		}
		finally{}
	}

	public List<ITransferObject> getAll() {
		try
		{
			List<ITransferObject> all=new ArrayList<ITransferObject>();
			String selQuery="SELECT id FROM step";
			List<Map<String, Object>> rows = jdbcTemplate.queryForList(selQuery);
			for (Map<String, Object> row : rows)
			{
				ITransferObject step=getStep((int)row.get("id"));
				all.add(step);
			}
			return all;
		}
		catch(Exception ex)
		{
			return null;
		}
		finally{}
	}
	
	public List<Step> getStespOf(int processId)
	{
		try
		{
			List<Step> steps=new ArrayList<Step>();
			String selQuery="SELECT id FROM step WHERE processId=?";
			List<Map<String, Object>> rows = jdbcTemplate.queryForList(selQuery, new Object[]{processId});
			for (Map<String, Object> row : rows)
			{
				Step step=getStep((int)row.get("id"));
				steps.add(step);
			}
			return steps;
		}
		catch(Exception ex)
		{
			return null;
		}
		finally{}
	}
	
	public List<UserStep> userSteps(String username)
	{
		try
		{
			List<UserStep> uSteps=new ArrayList<UserStep>();
			String selQuery="SELECT * FROM userstep WHERE userName=?";
			List<Map<String, Object>> rows = jdbcTemplate.queryForList(selQuery, new Object[]{username});
			for (Map<String, Object> row : rows)
			{
				UserStep uStep=new UserStep();
				uStep.setUser(username);
				uStep.setCurrentStepId((int)row.get("currentStepId"));
				uStep.setState(StepStates.valueOf((String)row.get("state")));
				uSteps.add(uStep);
			}
			return uSteps;
		}
		catch(Exception ex)
		{
			return null;
		}
		finally{}
	}
	
	public List<UserStep> userProcessSteps(String username, int processId)
	{
		try
		{
			List<UserStep> uSteps=new ArrayList<UserStep>();
			String selQuery="SELECT u.currentStepId, u.state FROM userstep u JOIN step s ON u.currentStepId=s.id WHERE u.userName=? AND s.processId=?";
			List<Map<String, Object>> rows = jdbcTemplate.queryForList(selQuery, new Object[]{username, processId});
			for (Map<String, Object> row : rows)
			{
				UserStep uStep=new UserStep();
				uStep.setUser(username);
				uStep.setCurrentStepId((int)row.get("currentStepId"));
				uStep.setState(StepStates.valueOf((String)row.get("state")));
				uSteps.add(uStep);
			}
			return uSteps;
		}
		catch(Exception ex)
		{
			return null;
		}
		finally{}
	}
	
	public List<UserStep> getApprovedOrRejected(int processId, String username)
	{
		try
		{
			List<UserStep> uSteps=new ArrayList<UserStep>();
			String selQuery="SELECT u.currentStepId, u.state FROM userstep u JOIN step s ON u.currentStepId=s.id WHERE u.userName=? AND s.processId=? AND u.state=?";
			List<Map<String, Object>> rows = jdbcTemplate.queryForList(selQuery, new Object[]{username, processId, StepStates.APPROVED.toString()});
			rows.addAll(jdbcTemplate.queryForList(selQuery, new Object[]{username, processId, StepStates.REJECTED.toString()}));
			for (Map<String, Object> row : rows)
			{
				UserStep uStep=new UserStep();
				uStep.setUser(username);
				uStep.setCurrentStepId((int)row.get("currentStepId"));
				uStep.setState(StepStates.valueOf((String)row.get("state")));
				uSteps.add(uStep);
			}
			return uSteps;
		}
		catch(Exception ex)
		{
			return null;
		}
		finally{}
	}
	public boolean updateUserStep(UserStep userStep)
	{
		try
		{
			String upQuery="UPDATE userstep SET state=? WHERE currentStepId=? AND userName=?";
			jdbcTemplate.update(upQuery, new Object[]{userStep.getState().name(), userStep.getCurrentStepId(), userStep.getUsername()});
			return true;
		}
		catch(Exception ex)
		{
			return false;
		}
		finally{}
	}
	
	public DataSent getData(String username, int stepId)
	{
		try
		{
			DataSent data=new DataSent(); 
			//Recupero tutte le ennuple datasent per utente e passo dati
			String selQuery="SELECT * FROM datasent WHERE userName=? AND stepId=?";
			List<Map<String, Object>> rows = jdbcTemplate.queryForList(selQuery, new Object[]{username, stepId});
			//Prelevo i campi comuni
			Map<String, Object> firstRow=rows.get(0);
			data.setSentTime((Date) firstRow.get("sentTime"));
			data.setStepId(stepId);
			data.setUser(username);
			//Campi dei valori singoli
			List<IDataValue> values=new ArrayList<IDataValue>();
			for (Map<String, Object> row:rows)
			{
				//Determina il tipo di dato
				IDataValue.DataTypes dataType=IDataValue.DataTypes.valueOf((String)row.get("type"));
				IDataValue value=null;
				switch(dataType)
				{
					case NUMERIC:
						NumericValue numericValue=new NumericValue();
						numericValue.setValue((double)row.get("numericValue"));
						value=numericValue;
					break;
					case TEXTUAL:
						TextualValue textualValue=new TextualValue();
						textualValue.setValue((String)row.get("textualValue"));
						value=textualValue;
					break;
					case IMAGE:
						ImageValue imageValue=new ImageValue();
						imageValue.setImageUrl((String)row.get("imageUrl"));
						value=imageValue;
					break;
					case GEOGRAPHIC:
						GeographicValue geographicValue=new GeographicValue();
						geographicValue.setLatitude((double)row.get("latitude"));
						geographicValue.setLongitude((double)row.get("longitude"));
						geographicValue.setAltitude((double)row.get("altitude"));						
						value=geographicValue;
					break;
				}
				value.setDataId((int)row.get("associatedDataId"));
				values.add(value);
			}
			data.setValues(values);
			return data;
		}
		catch(Exception ex)
		{
			return null;
		}
		finally{}
	}
	
	public List<DataSent> getData(int stepId)
	{
		try
		{
			List<DataSent> data=new ArrayList<DataSent>();
			String selQuery="SELECT DISTINCT userName FROM datasent WHERE stepId=?";
			List<String> names=jdbcTemplate.queryForList(selQuery, new Object[]{stepId}, String.class);
			for(String username:names)
			{
				DataSent singleData=getData(username, stepId);
				data.add(singleData);
			}
			return data;
		}
		catch(Exception ex)
		{
			return null;
		}
		finally{}
	}
	
	public List<DataSent> getProcessData(String username, int processId)
	{
		try
		{
			List<DataSent> data=new ArrayList<DataSent>();
			String selQuery="SELECT DISTINCT d.stepId FROM datasent d JOIN step s ON d.stepId=s.id WHERE d.userName=? AND s.processId=?";
			List<Integer> ids=jdbcTemplate.queryForList(selQuery, new Object[]{username, processId}, Integer.class);
			for(int stepId:ids)
			{
				DataSent singleData=getData(username, stepId);
				data.add(singleData);
			}
			return data;
		}
		catch(Exception ex)
		{
			return null;
		}
		finally{}
	}
	
	public List<DataSent> getWaitingData()
	{
		try
		{
			List<DataSent> waitingData=new ArrayList<DataSent>();
			String selQuery="SELECT currentStepId FROM userstep WHERE state=?";
			List<Integer> waitingSteps=jdbcTemplate.queryForList(selQuery, new Object[]{StepStates.EXPECTANT.toString()}, Integer.class);
			for(int waitingStep:waitingSteps)
			{
				List<DataSent> partial=this.getData(waitingStep);
				waitingData.addAll(partial);
			}
			return waitingData;
		}
		catch(Exception ex)
		{
			return null;
		}
		finally{}
	}
	
	public boolean delete(String username, int processId)
	{
		try
		{
			String delQuery="DELETE FROM userstep WHERE userName=? AND currentStepId IN(SELECT id FROM step WHERE processId=?)";
			jdbcTemplate.update(delQuery, new Object[]{username, processId});
			return true;
		}
		catch(Exception ex)
		{
			return false;
		}
		finally{}
	}
	
	public boolean completeStep(String username, DataSent dataSent)
	{
		try
		{
			//Inserimento dati ricevuti
			int stepId=dataSent.getStepId();
			List<IDataValue> values=dataSent.getValues();
			for(IDataValue dataValue:values)
			{
				IDataValue.DataTypes dataType=dataValue.getType();
				SimpleJdbcInsert sji=new SimpleJdbcInsert(jdbcTemplate).withTableName("datasent");
				Map<String, Object> params = new HashMap<String, Object>();
				params.put("userName", username);
				params.put("stepId", stepId);
				params.put("type", dataType);
				params.put("associatedDataId", dataValue.getDataId());
				switch(dataType)
				{
					case NUMERIC:
						NumericValue numericValue=(NumericValue)dataValue;
						params.put("numericValue", numericValue.getValue());
					break;
					case TEXTUAL:
						TextualValue textualValue=(TextualValue)dataValue;
						params.put("textualValue", textualValue.getValue());
					break;
					case IMAGE:
						ImageValue imageValue=(ImageValue)dataValue;
						params.put("imageUrl", imageValue.getImageUrl());
					break;
					case GEOGRAPHIC:
						GeographicValue geographicValue=(GeographicValue)dataValue;
						params.put("latitude", geographicValue.getLatitude());
						params.put("longitude", geographicValue.getLongitude());
						params.put("altitude", geographicValue.getAltitude());
					break;
				}
				sji.execute(params);
			}
			//Avanzamento
			//Verifica se il passo richiede approvazione
			String selQuery="SELECT requiresApproval FROM step WHERE id=?";
			boolean requiresApproval=(boolean)jdbcTemplate.queryForObject(selQuery, Boolean.class, new Object[]{stepId});
			String upQuery="UPDATE userstep SET state=? WHERE currentStepId=? AND userName=?";
			if(requiresApproval)
			{
				//Richiede approvazione
				jdbcTemplate.update(upQuery, new Object[]{UserStep.StepStates.EXPECTANT, stepId, username});
			}
			else
			{
				//Non richiede approvazione
				jdbcTemplate.update(upQuery, new Object[]{UserStep.StepStates.APPROVED, stepId, username});
				//Determinazione passo successivo
				//Determinazione del tipo di blocco
				selQuery="SELECT b.id, b.type FROM block b JOIN step s ON b.id=s.idBlock WHERE s.id=?";
				Map<String,Object> row=jdbcTemplate.queryForMap(selQuery, new Object[]{stepId});
				int blockId=(int)row.get("id");
				Block.BlockTypes blockType=Block.BlockTypes.valueOf((String)row.get("type"));
				if(blockType==Block.BlockTypes.SEQUENTIAL)
				{
					//Il blocco � sequenziale
					selQuery="SELECT nextStepId FROM step WHERE id=?";
					int nextStepId=jdbcTemplate.queryForInt(selQuery, stepId);
					if(nextStepId!=0)
					{
						//Non � l'ultimo passo del blocco, impostazione passo succesivo
						SimpleJdbcInsert sji=new SimpleJdbcInsert(jdbcTemplate).withTableName("datasent");
						Map<String, Object> args = new HashMap<String, Object>();
						args.put("currentStepId", nextStepId);
						args.put("userName", username);
						args.put("state",StepStates.ONGOING.toString());
						sji.execute(args);
					}
					else
					{
						//E' l'ultimo passo del blocco, vai al blocco successivo
						return nextBlock(username, blockId);
					}
				}
				else
				{
					//Il blocco � non ordinato
					selQuery="SELECT requiredStep FROM block WHERE id=?";
					int requiredStep=jdbcTemplate.queryForInt(selQuery, new Object[]{blockId});
					selQuery="SELECT COUNT(*) FROM userstep WHERE currentStepId IN(SELECT id FROM step WHERE idBlock=?)";
					int stepCompleted=jdbcTemplate.queryForInt(selQuery, new Object[]{blockId});
					if(requiredStep==stepCompleted)
					{
						//Il blocco ha le condizione per passare al blocco succesivo
						return nextBlock(username, blockId);
					}
				}	
			}
			return true;
		}
		catch(Exception ex)
		{
			return false;
		}
		finally{}
	}
	
	private boolean nextBlock(String username, int actualBlockId)
	{
		try
		{
			String selQuery="SELECT nextBlockId FROM block WHERE id=?";
			int nextBlockId=jdbcTemplate.queryForInt(selQuery, actualBlockId);
			if(nextBlockId!=0)
			{
				//Se non era l'ultimo blocco del processo
				selQuery="SELECT id, type FROM block WHERE id=?";
				Object[] params=new Object[]{nextBlockId};
				ParameterizedRowMapper<Block> mapper = new ParameterizedRowMapper<Block>()
				{
					public Block mapRow(ResultSet rs, int rowNum) throws SQLException
					{
						Block block=new Block();
						//Solo campi necessari
						block.setId(rs.getInt("id"));
						block.setType(BlockTypes.valueOf(rs.getString("type")));
						return block;
					}
				};
				Block nextBlock=jdbcTemplate.queryForObject(selQuery, mapper, params);
				SimpleJdbcInsert sji=new SimpleJdbcInsert(jdbcTemplate).withTableName("userstep");
				if(nextBlock.getType()==BlockTypes.SEQUENTIAL)
				{
					//Se � sequenziale
					selQuery="SELECT id FROM step WHERE isFirst=1 AND idBlock=?";
					params=new Object[]{nextBlock.getId()};
					int firstStepId=jdbcTemplate.queryForInt(selQuery, params);
					Map<String, Object> args = new HashMap<String, Object>();
					args.put("currentStepId", firstStepId);
					args.put("userName", username);
					args.put("state", StepStates.ONGOING);
					sji.execute(args);
				}
				else
				{
					//Se � non ordinato
					selQuery="SELECT id FROM step WHERE idBlock=?";
					params=new Object[] {nextBlock.getId()};
					Map<String, Object> args = new HashMap<String, Object>();
					List<Map<String, Object>> rows = jdbcTemplate.queryForList(selQuery, params);
					for (Map<String, Object> row : rows)
					{
						int stepId=(int)row.get("id");
						args.clear();
						args.put("currentStepId", stepId);
						args.put("userName", username);
						args.put("state",StepStates.ONGOING);
						sji.execute(args);
					}
				}
			}
			return true;
		}
		catch(Exception ex)
		{
			return false;
		}
	}
}