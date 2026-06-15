
//game state
let evidenceCollected = 0; //counts how many clues the player has found
const totalEvidence = 6; //total clues needed to finish the case
let inventory = []; //stores names of collected evidence (prevents duplicates)

// popup mode: "evidence" | "solve"
let popupMode = "evidence";



// Connects JavaScript to HTML so it can control the UI
// This includes the popups, text updates, counters, buttons, and inventory system.
// dom elements
const popup = document.getElementById("popup"); // Main popup container used for showing clues and messages
const popupTitle = document.getElementById("popupTitle"); // Title text inside popup (e.g. "Clock Discovered")
const popupText = document.getElementById("popupText"); // Description text inside popup (clue information)
const popupCount = document.getElementById("popupCount"); // Evidence progress text inside popup (e.g. 3/6 Evidence Collected)
const counter = document.getElementById("counter"); // Main on-screen counter showing total progress
// game control buttons
const solveButton = document.getElementById("solveButton"); // Button used to finish the case when all evidence is collected
const closePopup = document.getElementById("closePopup"); // Button used to close popup and continue investigating

const inventoryList = document.getElementById("inventoryList");  // List where collected evidence items will be displayed

// inventory + notes buttons/panels
const inventoryButton = document.getElementById("inventoryButton"); // Button that opens the inventory popup
const noteButton = document.getElementById("noteButton"); // Button that opens the detective notes / briefing popup

const inventoryPopup = document.getElementById("inventoryPopup"); // Inventory popup container
const notesPopup = document.getElementById("notesPopup"); // Detective notes / briefing popup container

const closeInventory = document.getElementById("closeInventory"); // Button that closes inventory popup
const closeNotes = document.getElementById("closeNotes"); // Button that closes notes popup
 

// ui update function
// This function updates the popup and game UI every time evidence is collected.
// It shows the clue details, updates progress counters, and checks win condition.
function updateUI(title, description) {   // Show the popup when new evidence is found
    popup.classList.remove("hidden"); 

    popupMode = "evidence"; // Set popup mode to normal evidence view (not solve screen)
    closePopup.style.display = "block";  // Ensure the "Continue Investigation" button is visible

    popupTitle.textContent = title;  // Update popup title with the evidence name
    popupText.textContent = description;  // Update popup description with clue details

    const text = `${evidenceCollected}/${totalEvidence} Evidence Collected`; // Create progress text (e.g. "3/6 Evidence Collected")
 
    popupCount.textContent = text;  // Update popup progress display
    counter.textContent = text;  // Update main on-screen counter

    if (evidenceCollected === totalEvidence) {  // If all evidence is collected, unlock the solve button
        solveButton.classList.add("show");
        solveButton.disabled = false;
    }
}

// -------------------------------
// INVENTORY SYSTEM
// -------------------------------
// This function adds collected evidence to the inventory list.
// It prevents duplicates and updates both the data array and the UI.

function addToInventory(itemName) {
    if (inventory.includes(itemName)) return;   // Prevent adding the same item more than once

    inventory.push(itemName); // Store item in inventory array (game data)

    const li = document.createElement("li"); // Create a new list item in the HTML
    li.textContent = itemName; // Set the text of the inventory item

    inventoryList.appendChild(li); 
    // Add the item to the visible inventory list on screen
}

// -------------------------------
// COLLECT EVIDENCE
// -------------------------------
function collectEvidence(element, title, description) {
    if (element.classList.contains("found")) return;

    element.classList.add("found");
    evidenceCollected++;

    let cleanName = title
        .replace(" Discovered", "")
        .replace(" Found", "");

    addToInventory(cleanName);

    updateUI(title, description);
}

// -------------------------------
// HOTSPOTS
// -------------------------------
document.getElementById("clock").addEventListener("click", function () {
    collectEvidence(this, "Clock Discovered", "The clock reveals a critical time clue in the case.");
});

document.getElementById("tv").addEventListener("click", function () {
    collectEvidence(this, "Broken Television", "The damaged television suggests a struggle took place.");
});

document.getElementById("note").addEventListener("click", function () {
    collectEvidence(this, "Note Found", "The note contains a mysterious message.");
});

document.getElementById("knife").addEventListener("click", function () {
    collectEvidence(this, "Knife Discovered", "A bloody knife may be the murder weapon.");
});

document.getElementById("blood").addEventListener("click", function () {
    collectEvidence(this, "Blood Stain Found", "The blood stain helps reconstruct the events.");
});

document.getElementById("plant").addEventListener("click", function () {
    collectEvidence(this, "Broken Plant Pot", "Signs of a struggle occurred near the window.");
});

// -------------------------------
// CLOSE MAIN POPUP
// -------------------------------
closePopup.addEventListener("click", function () {
    popup.classList.add("hidden");
    popupMode = "evidence";
});

// -------------------------------
// SOLVE CASE
// -------------------------------
solveButton.addEventListener("click", function () {
    popup.classList.remove("hidden");

    popupMode = "solve";
    closePopup.style.display = "none";

    popupTitle.textContent = "Case Solved";
    popupText.textContent =
        "You successfully collected all evidence and solved the mystery.";

    popupCount.textContent = `${evidenceCollected}/${totalEvidence} Evidence Collected`;
});

// -------------------------------
// INVENTORY POPUP
// -------------------------------
inventoryButton.addEventListener("click", function () {
    inventoryPopup.classList.remove("hidden");
});

closeInventory.addEventListener("click", function () {
    inventoryPopup.classList.add("hidden");
});

// -------------------------------
// NOTES POPUP
// -------------------------------
noteButton.addEventListener("click", function () {
    notesPopup.classList.remove("hidden");
});

closeNotes.addEventListener("click", function () {
    notesPopup.classList.add("hidden");
});