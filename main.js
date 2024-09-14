document.getElementById("resumeForm")?.addEventListener('submit', function (event) {
    event.preventDefault();
    let profilePicInput = document.getElementById('profilePic');
    let nameElement = document.getElementById('name');
    let emailElement = document.getElementById('email');
    let phoneElement = document.getElementById('phone');
    let addressElement = document.getElementById('address');
    let educationElement = document.getElementById('edu');
    let experienceElement = document.getElementById('experience');
    let skillElement = document.getElementById('skill');
    const userNameElement = document.getElementById("userName");
    if (profilePicInput && nameElement && emailElement && phoneElement && educationElement && experienceElement && skillElement && userNameElement) {
        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const address = addressElement.value;
        const edu = educationElement.value;
        const experience = experienceElement.value;
        const skill = skillElement.value;
        const userName = userNameElement.value;
        const uniquePath = `resume/${userName.replace(/\s+/g, '_')}_cv.html`;
        const profilePicFile = profilePicInput.files?.[0];
        const profilePicUrl = profilePicFile ? URL.createObjectURL(profilePicFile) : '';
        // Generate resume output HTML
        const resumeOutput = `
            <h2>Resume</h2>
            ${profilePicUrl ? `<img src="${profilePicUrl}" alt="Profile Picture" class="profilePic" >` : ''}

            <div id="personalInfo" >
            <p class="personalInfo"><strong>Name:</strong> <span id="editName" class="editable">${name}</span></p>
            <p class="personalInfo"><strong>Email:</strong> <span id="editEmail" class="editable">${email}</span></p>
            <p class="personalInfo"><strong>Phone:</strong> <span id="editPhone" class="editable">${phone}</span></p>
            <p class="personalInfo"><strong>Address:</strong> ${address}</p>
            
            </div>
            
        
            <h3>Education</h3>
            <p id="editEducation" class="editable">${edu}</p>
            <h3>Experience</h3>
            <p id="editExperience" class="editable">${experience}</p>
            <h3>Skills</h3>
            <p id="editSkill" class="editable">${skill}</p>
        `;
        const resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            resumeOutputElement.classList.remove("hidden");
            // Create container for buttons
            const buttonContainer = document.createElement("div");
            buttonContainer.id = "buttonContainer";
            resumeOutputElement.appendChild(buttonContainer);
            // Add download PDF button
            const downloadButton = document.createElement("button");
            downloadButton.textContent = "Download as PDF";
            downloadButton.addEventListener("click", () => {
                const element = document.getElementById('resumeOutput');
                if (element) {
                    window.print(); // Option for PDF download via browser print-to-PDF
                }
            });
            buttonContainer.appendChild(downloadButton);
            // Create shareable link button
            const shareableButton = document.createElement("button");
            shareableButton.textContent = "Copy Shareable Link";
            shareableButton.addEventListener("click", async () => {
                try {
                    const shareableLink = `https://yourdomain.com/resume/${name.replace(/\s+/g, "_")}_cv.html`;
                    // Clipboard API to copy the shareable link
                    await navigator.clipboard.writeText(shareableLink);
                    alert("Shareable link copied to clipboard");
                }
                catch (err) {
                    console.error("Failed to copy link:", err);
                    alert("Failed to copy link to clipboard. Please try again");
                }
            });
            buttonContainer.appendChild(shareableButton);
            // Create download link for HTML resume
            const downloadLink = document.createElement('a');
            downloadLink.href = `data:text/html;charset=utf-8,` + encodeURIComponent(resumeOutput);
            downloadLink.download = uniquePath;
            // downloadLink.textContent = "Download your resume";
            resumeOutputElement.appendChild(downloadLink);
            makeEditable(); // Enable content editing
        }
        else {
            console.error("Resume output container not found");
        }
    }
    else {
        console.log("Form elements are missing");
    }
});
function makeEditable() {
    const editableElement = document.querySelectorAll('.editable');
    editableElement.forEach(element => {
        element.addEventListener('click', function () {
            const currentElement = element;
            const currentValue = currentElement.textContent || "";
            if (currentElement.tagName === "P" || currentElement.tagName === 'SPAN') {
                const input = document.createElement('input');
                input.value = currentValue;
                input.classList.add('editing-input');
                input.addEventListener('blur', function () {
                    currentElement.textContent = input.value;
                    currentElement.style.display = 'inline';
                    input.remove();
                });
                currentElement.style.display = 'none';
                currentElement.parentNode?.insertBefore(input, currentElement);
                input.focus();
            }
        });
    });
}
export {};
