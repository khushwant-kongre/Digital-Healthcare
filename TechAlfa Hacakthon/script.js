let currentRole = "";

function login(role) {
    currentRole = role;
    document.getElementById("dashboard").innerHTML = "";

    if(role === "doctor") doctorDashboard();
    if(role === "pharmacy") pharmacyDashboard();
    if(role === "patient") patientDashboard();
}

function doctorDashboard() {
    document.getElementById("dashboard").innerHTML = `
        <div class="card">
            <h2>Doctor Dashboard</h2>
            <input type="text" id="patientName" placeholder="Patient Name">
            <textarea id="diagnosis" placeholder="Diagnosis"></textarea>
            <textarea id="medicines" placeholder="Medicines (comma separated)"></textarea>
            
            <label>Privacy:</label>
            <select id="privacy">
                <option value="public">Public</option>
                <option value="private">Private (Patient Approval Needed)</option>
            </select>
            
            <button onclick="generatePrescription()">Generate Prescription</button>
            <div id="qrcode"></div>
        </div>
    `;
}

function generatePrescription() {
    let patient = document.getElementById("patientName").value;
    let diagnosis = document.getElementById("diagnosis").value;
    let medicines = document.getElementById("medicines").value;
    let privacy = document.getElementById("privacy").value;

    let prescription = {
        patient,
        diagnosis,
        medicines,
        privacy,
        completed: false
    };

    localStorage.setItem("prescription", JSON.stringify(prescription));

    document.getElementById("qrcode").innerHTML = "";
    new QRCode(document.getElementById("qrcode"), JSON.stringify(prescription));

    alert("Prescription Generated with QR Code!");
}

function pharmacyDashboard() {
    document.getElementById("dashboard").innerHTML = `
        <div class="card">
            <h2>Pharmacy Dashboard</h2>
            <button onclick="loadPrescription()">Scan Prescription</button>
            <div id="prescriptionData"></div>
        </div>
    `;
}

function loadPrescription() {
    let prescription = JSON.parse(localStorage.getItem("prescription"));

    if(!prescription) {
        alert("No prescription found!");
        return;
    }

    if(prescription.privacy === "private") {
        let approval = confirm("This is Private Prescription. Patient Approval Required. Continue?");
        if(!approval) return;
    }

    document.getElementById("prescriptionData").innerHTML = `
        <p><b>Patient:</b> ${prescription.patient}</p>
        <p><b>Diagnosis:</b> ${prescription.diagnosis}</p>
        <p><b>Medicines:</b> ${prescription.medicines}</p>
        <button onclick="markSold()">Confirm Medicines Sold</button>
    `;
}

function markSold() {
    let prescription = JSON.parse(localStorage.getItem("prescription"));
    prescription.completed = true;
    localStorage.setItem("prescription", JSON.stringify(prescription));
    alert("Medicine Sale Recorded & Updated!");
}

function patientDashboard() {
    let prescription = JSON.parse(localStorage.getItem("prescription"));

    if(!prescription) {
        document.getElementById("dashboard").innerHTML = "<p>No prescription found.</p>";
        return;
    }

    document.getElementById("dashboard").innerHTML = `
        <div class="card">
            <h2>Patient Dashboard</h2>
            <p><b>Diagnosis:</b> ${prescription.diagnosis}</p>
            <p><b>Medicines:</b> ${prescription.medicines}</p>
            <p><b>Status:</b> ${prescription.completed ? "Completed ✅" : "Not Completed ❌"}</p>
        </div>
    `;
}