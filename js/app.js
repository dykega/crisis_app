function showSteps() {
    var settings = document.getElementById("settings");
    var settingsIcon = settings.childNodes[0].childNodes[0];
    if(settingsIcon.classList.contains("fa-check-square-o")){
       toggleEdit();
    }
    steps = document.getElementById("crisis_section");
    contact = document.getElementById("contact_section");
    stepsNav = document.getElementById("steps_nav");
    contactsNav = document.getElementById("contacts_nav");
    if(contact.classList.contains("show_section")){
       contact.classList.remove("show_section");
    }
    if(!contact.classList.contains("hide_section")){
        contact.classList.add("hide_section");
    }
    if(steps.classList.contains("hide_section")){
       steps.classList.remove("hide_section");
    }
    if(!steps.classList.contains("show_section")){
        steps.classList.add("show_section");
    }
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
       toggleEdit();
    }
    steps = document.getElementById("crisis_section");
    contact = document.getElementById("contact_section");
    stepsNav = document.getElementById("steps_nav");
    contactsNav = document.getElementById("contacts_nav");
    if(steps.classList.contains("show_section")){
       steps.classList.remove("show_section");
    }
    if(!steps.classList.contains("hide_section")){
        steps.classList.add("hide_section");
    }
    if(contact.classList.contains("hide_section")){
       contact.classList.remove("hide_section");
    }
    if(!contact.classList.contains("show_section")){
        contact.classList.add("show_section");
    }
    if(stepsNav.classList.contains("active")){
        stepsNav.classList.remove("active");
    }
    if(!contactsNav.classList.contains("active")){
        contactsNav.classList.add("active");
    }
}

function toggleEdit() {
    //changes edit Icon given current state
    var settings = document.getElementById("settings");
    var settingsIcon = settings.childNodes[0].childNodes[0];
    var editing = true
    if(settingsIcon.classList.contains("fa-edit")){
       editting = true
       settingsIcon.classList.remove("fa-edit");
       settingsIcon.classList.add("fa-check-square-o");
       settingsIcon.title = "Finish";
    }
    else{
       editing = false
       settingsIcon.classList.remove("fa-check-square-o");
       settingsIcon.classList.add("fa-edit");
       settingsIcon.title = "Edit";
    }
    
    //shows or hides input bar based on current state
    var crisisSec = document.getElementById("crisis_section");
    if (crisisSec.classList.contains("show_section")){
        var input = document.getElementById("addElemSec");
    }
    else {
        var input = document.getElementById("addElemSecContacts");
    }
    
    if (editing){
        input.classList.remove("hide_section");
        input.classList.add("show_section");
    }
    else{
        input.classList.remove("show_section");
        input.classList.add("hide_section");
    }
    
    //changes the wording of the mobile nav given the current state
    var editNav = document.getElementById("editNavMenu");
    if (editing){
        editNav.innerHTML = "Finish Editing";
    }
    else{
        editNav.innerHTML = "Edit";
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
    var crisisSec = document.getElementById("crisis_section");
    if (crisisSec.classList.contains("show_section")){
        activeList = document.getElementById("steps_ul");
        var inputSec = document.getElementById("addElem");
        steps = true;
    }
    else {
        activeList = document.getElementById("contacts_ul");
        var inputSec = document.getElementById("addElemContacts");
        steps = false;
    }
    var text = inputSec.value
    if(steps){
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
    if(steps){
        addDel = "Step";
    }
    else{
        addDel = "Contact";
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
    if(steps){
        newElm.innerHTML += '<input type="checkbox" class="step_ch">'
    }
    newElm.appendChild(t);
    activeList.insertBefore(newElm,activeList.childNodes[activeList.childNodes.length-2]);
    
    //when adding trash icons to all items and initially hiding them, in button onClick add index of child to delete
}

function deleteItem(idName){
    var crisisSec = document.getElementById("crisis_section");
    item = document.querySelector('#' + idName);
    elemRemove = item.parentNode;
    itemRemove = elemRemove.childNodes[elemRemove.childNodes.length-1]
    if (crisisSec.classList.contains("show_section")){
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
            var crisisSec = document.getElementById("crisis_section");
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
            var inputSec = document.getElementById("addElemContacts");
            steps = false;
            var newElm = document.createElement("li")
            var t = document.createTextNode(newContact);
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
