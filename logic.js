document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("resumeForm");
    var resumeOutput = document.getElementById("resumeOutput");
    var saveChangesButton = document.getElementById("saveChanges");
    var profilePreview = document.getElementById("profilePreview");
    var profilePictureInput = document.getElementById("profilePicture");
    profilePictureInput.addEventListener("change", function () {
        var _a;
        var file = (_a = profilePictureInput.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (event) {
                if (event.target) {
                    profilePreview.src = event.target.result;
                    profilePreview.style.display = "block";
                }
            };
            reader.readAsDataURL(file);
        }
    });
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        generateResume();
    });
    function generateResume() {
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var experience = document.getElementById("experience").value;
        var skills = document.getElementById("skills").value;
        resumeOutput.innerHTML = "\n        <div class=\"resume\">\n          <h2 class=\"editable\" data-type=\"text\">".concat(name, "</h2>\n          <p class=\"editable\" data-type=\"text\"><strong>Email:</strong> ").concat(email, "</p>\n          <p class=\"editable\" data-type=\"text\"><strong>Phone:</strong> ").concat(phone, "</p>\n          <img src=\"").concat(profilePreview.src, "\" alt=\"Profile Picture\" style=\"width: 150px; height: 150px; border-radius: 50%; margin-top: 10px;\">\n          <h3>Experience</h3>\n          <p class=\"editable\" data-type=\"textarea\">").concat(experience, "</p>\n          <h3>Skills</h3>\n          <p class=\"editable\" data-type=\"textarea\">").concat(skills, "</p>\n        </div>\n      ");
        var editableElements = resumeOutput.querySelectorAll(".editable");
        editableElements.forEach(function (element) {
            element.addEventListener("click", handleEdit);
        });
        saveChangesButton.style.display = "block";
        saveChangesButton.addEventListener("click", saveChanges);
    }
    function handleEdit(event) {
        var target = event.target;
        var originalContent = target.innerText;
        var dataType = target.getAttribute("data-type");
        var inputElement = dataType === "text" ? document.createElement("input") : document.createElement("textarea");
        inputElement.value = originalContent;
        inputElement.className = "editor";
        inputElement.addEventListener("blur", function () {
            target.innerText = inputElement.value;
            target.style.display = "";
        });
        target.replaceWith(inputElement);
        inputElement.focus();
    }
    function saveChanges() {
        var editableElements = resumeOutput.querySelectorAll(".editor");
        editableElements.forEach(function (editor) {
            var newText = editor.value;
            var parent = editor.parentElement;
            var displayElement = document.createElement("p");
            displayElement.innerText = newText;
            displayElement.className = "editable";
            displayElement.addEventListener("click", handleEdit);
            editor.replaceWith(displayElement);
        });
        saveChangesButton.style.display = "none";
    }
});
