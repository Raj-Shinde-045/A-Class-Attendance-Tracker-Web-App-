document.addEventListener('DOMContentLoaded', function() {
    const classOptions = document.querySelectorAll('.class-option');
    let selectedClass = null;

    classOptions.forEach(option => {
        option.addEventListener('click', function() {
            classOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedClass = this.dataset.value;
        });
    });

    document.getElementById('classForm').addEventListener('submit', function(e) {
        e.preventDefault();
        if (!selectedClass) {
            alert('Please select a class');
            return;
        }
        const subjectValue = document.getElementById('subjectSelect').value;
        const dateValue = document.getElementById('datePicker').value;

        // Store the selected values in localStorage
        localStorage.setItem('selectedClass', selectedClass);
        localStorage.setItem('selectedSubject', subjectValue);
        localStorage.setItem('selectedDate', dateValue);

        // Redirect to the main attendance page
        window.location.href = 'main/main.html';
    });
});
