package com.police.emuddamal.objects;

import org.springframework.stereotype.Component;

@Component
public class MuddemalResponse {
      boolean isSuccess;
      String responseMessage;
      String correlationId;
      Muddemaal body;
	public boolean isSuccess() {
		return isSuccess;
	}
	public void setSuccess(boolean isSuccess) {
		this.isSuccess = isSuccess;
	}
	public String getResponseMessage() {
		return responseMessage;
	}
	public void setResponseMessage(String responseMessage) {
		this.responseMessage = responseMessage;
	}
	public String getCorrelationId() {
		return correlationId;
	}
	public void setCorrelationId(String correlationId) {
		this.correlationId = correlationId;
	}
	public Muddemaal getBody() {
		return body;
	}
	public void setBody(Muddemaal body) {
		this.body = body;
	}
	
}
