// ==UserScript==
// @name         OMV Customizations
// @namespace    https://www.openmediavault.org
// @version      0.1
// @description  Some tricky OMV customizations
// @author       Epik
// @match        http://192.168.1.66/*
// @grant        none
// ==/UserScript==

// ------------------------------------------------------------------------------------------------------
// REMARK: After you install this script please change the @match directive with your own publication url
// ------------------------------------------------------------------------------------------------------
(function() {
    'use strict';

    // It's time to process a container
    var checkTheConfirm = function(container){
        var check = container.querySelectorAll("input[type='checkbox']")[0];
        if(typeof(check)!='undefined'){
            check.dispatchEvent(clickEvent);
            container.querySelectorAll("button")[0].focus();
        }
    }

    // Programmatically click on an element
    var clickEvent = new MouseEvent("click", {
        "view": window,
        "bubbles": true,
        "cancelable": false
    });

    // Maybe a bit heavy but it works
    function onMutation(mutations) {

        for (const mutation of mutations) {
            // Search for the confirmation dialog
            if (mutation.type == 'childList' && mutation.addedNodes[0]?.tagName == 'OMV-CONFIRM-DIALOG') {
                setTimeout(function(){
                checkTheConfirm(mutation.addedNodes[0]);
                }, 500);
            }
        }
    }

    (new MutationObserver(onMutation)).observe(document.querySelector("body"), { 
        childList: true,
        subtree: true
    })
})();