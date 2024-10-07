package com.police.emuddemal.exception;

public class MuddemalException extends Exception {

    // Default constructor
    public MuddemalException() {
        super("An error occurred in Muddemal operations.");
    }

    // Constructor that accepts a custom error message
    public MuddemalException(String message) {
        super(message);
    }

    // Constructor that accepts a cause (another throwable)
    public MuddemalException(Throwable cause) {
        super(cause);
    }

    // Constructor that accepts both a custom message and a cause
    public MuddemalException(String message, Throwable cause) {
        super(message, cause);
    }
}