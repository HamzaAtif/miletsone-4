document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resumeForm") as HTMLFormElement;
    const resumeOutput = document.getElementById("resumeOutput") as HTMLDivElement;
    const saveChangesButton = document.getElementById("saveChanges") as HTMLButtonElement;
    const profilePreview = document.getElementById("profilePreview") as HTMLImageElement;
    const profilePictureInput = document.getElementById("profilePicture") as HTMLInputElement;
  
    profilePictureInput.addEventListener("change", () => {
      const file = profilePictureInput.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target) {
            profilePreview.src = event.target.result as string;
            profilePreview.style.display = "block";
          }
        };
        reader.readAsDataURL(file);
      }
    });
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      generateResume();
    });
  
    function generateResume() {
      const name = (document.getElementById("name") as HTMLInputElement).value;
      const email = (document.getElementById("email") as HTMLInputElement).value;
      const phone = (document.getElementById("phone") as HTMLInputElement).value;
      const experience = (document.getElementById("experience") as HTMLTextAreaElement).value;
      const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;
  
      resumeOutput.innerHTML = `
        <div class="resume">
          <h2 class="editable" data-type="text">${name}</h2>
          <p class="editable" data-type="text"><strong>Email:</strong> ${email}</p>
          <p class="editable" data-type="text"><strong>Phone:</strong> ${phone}</p>
          <img src="${profilePreview.src}" alt="Profile Picture" style="width: 150px; height: 150px; border-radius: 50%; margin-top: 10px;">
          <h3>Experience</h3>
          <p class="editable" data-type="textarea">${experience}</p>
          <h3>Skills</h3>
          <p class="editable" data-type="textarea">${skills}</p>
        </div>
      `;
  
      const editableElements = resumeOutput.querySelectorAll(".editable") as NodeListOf<HTMLElement>;
      editableElements.forEach((element) => {
        element.addEventListener("click", handleEdit);
      });
  
      saveChangesButton.style.display = "block";
      saveChangesButton.addEventListener("click", saveChanges);
    }
  
    function handleEdit(event: Event) {
      const target = event.target as HTMLElement;
      const originalContent = target.innerText;
      const dataType = target.getAttribute("data-type");
  
      const inputElement = dataType === "text" ? document.createElement("input") : document.createElement("textarea");
      inputElement.value = originalContent;
      inputElement.className = "editor";
  
      inputElement.addEventListener("blur", () => {
        target.innerText = inputElement.value;
        target.style.display = "";
      });
  
      target.replaceWith(inputElement);
      inputElement.focus();
    }
  
    function saveChanges() {
      const editableElements = resumeOutput.querySelectorAll(".editor") as NodeListOf<HTMLInputElement | HTMLTextAreaElement>;
  
      editableElements.forEach((editor) => {
        const newText = editor.value;
        const parent = editor.parentElement;
        const displayElement = document.createElement("p");
        displayElement.innerText = newText;
        displayElement.className = "editable";
        displayElement.addEventListener("click", handleEdit);
  
        editor.replaceWith(displayElement);
      });
  
      saveChangesButton.style.display = "none";
    }
  });
  