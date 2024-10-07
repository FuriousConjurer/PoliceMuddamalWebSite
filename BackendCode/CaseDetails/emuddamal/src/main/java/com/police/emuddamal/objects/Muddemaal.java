package com.police.emuddamal.objects;

import java.time.LocalDate;
import java.util.Date;

import org.springframework.stereotype.Component;
@Component
public class Muddemaal{

    private int serialNumber;
    private String correlationId;
    private String crimeNumber; // Crime number or station diary number
    private LocalDate dateOfSeizure;
    private String muddemaalReceiptNumber;
    private String typeOfMuddemaal; // As mentioned in point 3 (a)
    private String description;
    private int quantity;
    private double price;
    private String presentStatus; // Present status of Muddemaal

    // Constructors
    public Muddemaal() {}

    public Muddemaal(int serialNumber, String crimeNumber, LocalDate dateOfSeizure,
                     String muddemaalReceiptNumber, String typeOfMuddemaal, String description,
                     int quantity, double price, String presentStatus) {
        this.serialNumber = serialNumber;
        this.crimeNumber = crimeNumber;
        this.dateOfSeizure = dateOfSeizure;
        this.muddemaalReceiptNumber = muddemaalReceiptNumber;
        this.typeOfMuddemaal = typeOfMuddemaal;
        this.description = description;
        this.quantity = quantity;
        this.price = price;
        this.presentStatus = presentStatus;
        this.correlationId=Long.toString( new Date().getTime())+ Integer.toString(serialNumber); 
    }

    // Getters and Setters
    public int getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(int serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getCrimeNumber() {
        return crimeNumber;
    }

    public void setCrimeNumber(String crimeNumber) {
        this.crimeNumber = crimeNumber;
    }

    public LocalDate getDateOfSeizure() {
        return dateOfSeizure;
    }

    public void setDateOfSeizure(LocalDate dateOfSeizure) {
        this.dateOfSeizure = dateOfSeizure;
    }

    public String getMuddemaalReceiptNumber() {
        return muddemaalReceiptNumber;
    }

    public void setMuddemaalReceiptNumber(String muddemaalReceiptNumber) {
        this.muddemaalReceiptNumber = muddemaalReceiptNumber;
    }

    public String getTypeOfMuddemaal() {
        return typeOfMuddemaal;
    }

    public void setTypeOfMuddemaal(String typeOfMuddemaal) {
        this.typeOfMuddemaal = typeOfMuddemaal;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getPresentStatus() {
        return presentStatus;
    }

    public void setPresentStatus(String presentStatus) {
        this.presentStatus = presentStatus;
    }

    @Override
    public String toString() {
        return "Muddemaal{" +
                "serialNumber=" + serialNumber +
                ", crimeNumber='" + crimeNumber + '\'' +
                ", dateOfSeizure=" + dateOfSeizure +
                ", muddemaalReceiptNumber='" + muddemaalReceiptNumber + '\'' +
                ", typeOfMuddemaal='" + typeOfMuddemaal + '\'' +
                ", description='" + description + '\'' +
                ", quantity=" + quantity +
                ", price=" + price +
                ", presentStatus='" + presentStatus + '\'' +
                '}';
    }

	public String getCorrelationId() {
		return correlationId;
	}

	public void setCorrelationId(String correlationId) {
		this.correlationId = correlationId;
	}
}
