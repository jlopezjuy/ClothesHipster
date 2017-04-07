package com.anelsoftware.clothes.cucumber.stepdefs;

import com.anelsoftware.clothes.AnelapiApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = AnelapiApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
