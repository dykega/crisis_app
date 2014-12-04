function showSteps() {
    var settings = document.getElementById("settings");
    var settingsIcon = settings.childNodes[0].childNodes[0];
    if(settingsIcon.classList.contains("fa-check-square-o")){
        var flipContainer = document.getElementById("myCard");
        if(flipContainer.classList.contains("flip")){
           stepsShowing = false;
        }
        else{
           stepsShowing = true;
        }
        if (stepsShowing){
            var inputSec = document.getElementById("addElem");
        }
        else {
            var inputSec = document.getElementById("addElemContacts");
        }
        var text = inputSec.value
        if(text != ""){
            addItem();
        }
       toggleEdit();
    }
    
    var flipContainer = document.getElementById("myCard");
    if(flipContainer.classList.contains("flip")){
       document.querySelector("#myCard").classList.toggle("flip");
    }

    stepsNav = document.getElementById("steps_nav");
    contactsNav = document.getElementById("contacts_nav");
    if(contactsNav.classList.contains("active")){
        contactsNav.classList.remove("active");
    }
    if(!stepsNav.classList.contains("active")){
        stepsNav.classList.add("active");
    }
}

function showContacts() {
    var settings = document.getElementById("settings");
    var settingsIcon = settings.childNodes[0].childNodes[0];
    if(settingsIcon.classList.contains("fa-check-square-o")){
        var flipContainer = document.getElementById("myCard");
        if(flipContainer.classList.contains("flip")){
           stepsShowing = false;
        }
        else{
           stepsShowing = true;
        }
        if (stepsShowing){
            var inputSec = document.getElementById("addElem");
        }
        else {
            var inputSec = document.getElementById("addElemContacts");
        }
        var text = inputSec.value
        if(text != ""){
            addItem();
        }
       toggleEdit();
    }
    
    var flipContainer = document.getElementById("myCard");
    if(!flipContainer.classList.contains("flip")){
       document.querySelector("#myCard").classList.toggle("flip");
    }

    stepsNav = document.getElementById("steps_nav");
    contactsNav = document.getElementById("contacts_nav");
    if(stepsNav.classList.contains("active")){
        stepsNav.classList.remove("active");
    }
    if(!contactsNav.classList.contains("active")){
        contactsNav.classList.add("active");
    }
}

function toggleEdit() {
    //changes edit Icon (mobile and full version) given current state
    var settings = document.getElementById("settings");
    var settings_mobile = document.getElementById("settings_mobile");
    var settingsIcon = settings.childNodes[0].childNodes[0];
    var settingsIcon_mobile = settings_mobile.childNodes[1];
    var editing = true
    if(settingsIcon.classList.contains("fa-edit")){
       editting = true
       settingsIcon.classList.remove("fa-edit");
       settingsIcon.classList.add("fa-check-square-o");
       settingsIcon.title = "Finish";
       settingsIcon_mobile.classList.remove("fa-edit");
       settingsIcon_mobile.classList.add("fa-check-square-o");
       settingsIcon_mobile.title = "Finish";
    }
    else{
       editing = false
       settingsIcon.classList.remove("fa-check-square-o");
       settingsIcon.classList.add("fa-edit");
       settingsIcon.title = "Edit";
       settingsIcon_mobile.classList.remove("fa-check-square-o");
       settingsIcon_mobile.classList.add("fa-edit");
       settingsIcon_mobile.title = "Edit";
    }
    
    //shows or hides input bar based on current state
    var flipContainer = document.getElementById("myCard");
    if(flipContainer.classList.contains("flip")){
       stepsShowing = false;
    }
    else{
       stepsShowing = true;
    }
       
    if (stepsShowing){
        var input = document.getElementById("addElemSec");
    }
    else {
        var input = document.getElementById("addElemSecContacts");
    }
    
    if (editing){
        input.classList.remove("hide_section");
        input.classList.add("show_section");
        if(!stepsShowing){
            var otherContacts = document.getElementById("otherContacts");
            otherContacts.scrollIntoView(true);
        }
    }
    else{
        input.classList.remove("show_section");
        input.classList.add("hide_section");
    }
    
    //adds delete icon to all items in editable list
    delList = document.querySelectorAll(".deleteItem");
    for(x=0;x<delList.length;x++){
        if(editing){
            delList[x].classList.add("show_section");
            delList[x].classList.remove("hide_section");
        }
        else{
            delList[x].classList.remove("show_section");
            delList[x].classList.add("hide_section");
        }
    }
}

function addItem() {
    var flipContainer = document.getElementById("myCard");
    if(flipContainer.classList.contains("flip")){
       stepsShowing = false;
    }
    else{
       stepsShowing = true;
    }
    if (stepsShowing){
        activeList = document.getElementById("steps_ul");
        var inputSec = document.getElementById("addElem");
    }
    else {
        activeList = document.getElementById("contacts_ul");
        var inputSec = document.getElementById("addElemContacts");
    }
    var text = inputSec.value
    if(stepsShowing){
        stepsStr = localStorage.getItem('steps')
        if(stepsStr == null){
            steps = []
        }
        else{
            steps = JSON.parse(stepsStr);
        }
        steps.push(text);
        stepsStr = JSON.stringify(steps);
        localStorage.setItem("steps",stepsStr);
    }
    else{
        contactsStr = localStorage.getItem('contacts')
        if(contactsStr == null){
            contacts = []
        }
        else{
            contacts = JSON.parse(contactsStr);
        }
        contacts.push(text);
        contactsStr = JSON.stringify(contacts);
        localStorage.setItem("contacts",contactsStr);
    }
    inputSec.value = ""
    var newElm = document.createElement("li")
    var t = document.createTextNode(text);
    if(stepsShowing){
        addDel = "Step";
    }
    else{
        addDel = "Contact";
        var phoneLink = document.createElement("a");
        phoneLink.setAttribute("href","tel:" + text);
        phoneLink.innerHTML = text;
        phoneLink.classList.add("phone");
        t = phoneLink;
    }
    if(localStorage.getItem("count") == null){
        var idStr = "0";
        localStorage.setItem("count", "0");
    }
    else{
        var idStr = localStorage.getItem("count");
        var idNum = parseInt(idStr) + 1;
        idStr = idNum.toString();
        localStorage.setItem("count",idStr);
    }
    newElm.innerHTML = '<button type="button" class="deleteItem" id="delButton' + addDel + idStr  + '" onClick="deleteItem(this.id);"><i class="fa fa-trash"></i></button>';
    if(stepsShowing){
        newElm.innerHTML += '<input type="checkbox" class="step_ch">'
    }
    newElm.appendChild(t);
    activeList.insertBefore(newElm,activeList.childNodes[activeList.childNodes.length-2]);
    
    //when adding trash icons to all items and initially hiding them, in button onClick add index of child to delete
}

function deleteItem(idName){
    var flipContainer = document.getElementById("myCard");
    if(flipContainer.classList.contains("flip")){
       stepsShowing = false;
    }
    else{
       stepsShowing = true;
    }
    item = document.querySelector('#' + idName);
    elemRemove = item.parentNode;
    itemRemove = elemRemove.childNodes[elemRemove.childNodes.length-1]
    if (stepsShowing){
        stepsStr = localStorage.getItem('steps');
        steps = JSON.parse(stepsStr);
        for(x=0;x<steps.length;x++){
            if(steps[x] == itemRemove.textContent){
                steps.splice(x,1);
                x += steps.length;
            }
        }
        stepsStr = JSON.stringify(steps);
        localStorage.setItem("steps",stepsStr);
    }
    else {
        contactsStr = localStorage.getItem('contacts');
        contacts = JSON.parse(contactsStr);
        for(x=0;x<contacts.length;x++){
            if(contacts[x] == itemRemove.textContent){
                contacts.splice(x,1);
                x += contacts.length;
            }
        }
        contactsStr = JSON.stringify(contacts);
        localStorage.setItem("contacts",contactsStr);
    }
    if (elemRemove.parentNode) {
    elemRemove.parentNode.removeChild(elemRemove);
    }
}

function addExistingData(){
    //still have to add trash icon, then hide them
    stepsStr = localStorage.getItem('steps')
    contactsStr = localStorage.getItem('contacts')
    count = 0
    if(stepsStr != null){
        stepsExist = JSON.parse(stepsStr)
        for(x=0;x<stepsExist.length;x++){
            newStep = stepsExist[x]
            //var crisisSec = document.getElementById("crisis_section");
            activeList = document.getElementById("steps_ul");
            steps = true;
            var newElm = document.createElement("li")
            var t = document.createTextNode(newStep);
            addDel = "Step";
            idStr = count.toString();
            count += 1
            newElm.innerHTML = '<button type="button" class="deleteItem hide_section" id="delButton' + addDel + idStr  + '" onClick="deleteItem(this.id);"><i class="fa fa-trash"></i></button>';
            newElm.innerHTML += '<input type="checkbox" class="step_ch">'
            newElm.appendChild(t);
            activeList.insertBefore(newElm,activeList.childNodes[activeList.childNodes.length-2]);
        }
    }
    if(contactsStr != null){
        contacts = JSON.parse(contactsStr)
        for(x=0;x<contacts.length;x++){
            newContact = contacts[x]
            activeList = document.getElementById("contacts_ul");
            //var inputSec = document.getElementById("addElemContacts");
            steps = false;
            var newElm = document.createElement("li")
            var phoneLink = document.createElement("a");
            phoneLink.setAttribute("href","tel:" + newContact);
            phoneLink.innerHTML = newContact;
            phoneLink.classList.add("phone");
            var t = phoneLink;
            addDel = "Contact";
            idStr = count.toString();
            count += 1;
            newElm.innerHTML = '<button type="button" class="deleteItem hide_section" id="delButton' + addDel + idStr  + '" onClick="deleteItem(this.id);"><i class="fa fa-trash"></i></button>';
            newElm.appendChild(t);
            activeList.insertBefore(newElm,activeList.childNodes[activeList.childNodes.length-2]);
        }
    }
    localStorage.setItem("count",count.toString());
}

function flipSide(){
    var top = document.getElementById("topOfPage");
    var settings = document.getElementById("settings");
    var settingsIcon = settings.childNodes[0].childNodes[0];
    top.scrollIntoView(true);
    if(settingsIcon.classList.contains("fa-check-square-o")){
       var flipContainer = document.getElementById("myCard");
        if(flipContainer.classList.contains("flip")){
           stepsShowing = false;
        }
        else{
           stepsShowing = true;
        }
        if (stepsShowing){
            var inputSec = document.getElementById("addElem");
        }
        else {
            var inputSec = document.getElementById("addElemContacts");
        }
        var text = inputSec.value
        if(text != ""){
            addItem();
        }
       toggleEdit();
    }
    var flipContainer = document.getElementById("myCard");
    if(flipContainer.classList.contains("flip")){
       toSteps = true;
    }
    else{
       toSteps = false;
    }
       
    document.querySelector("#myCard").classList.toggle("flip");
    
    stepsNav = document.getElementById("steps_nav");
    contactsNav = document.getElementById("contacts_nav");
    
    if(toSteps){
        if(contactsNav.classList.contains("active")){
            contactsNav.classList.remove("active");
        }
        if(!stepsNav.classList.contains("active")){
            stepsNav.classList.add("active");
        }
    }
    else{
       if(stepsNav.classList.contains("active")){
        stepsNav.classList.remove("active");
        }
        if(!contactsNav.classList.contains("active")){
            contactsNav.classList.add("active");
        } 
    }
}