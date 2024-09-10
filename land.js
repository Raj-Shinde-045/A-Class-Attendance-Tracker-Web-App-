document.getElementById('classForm').addEventListener('submit', function(e) {
    // ... existing code ...

    // Redirect to the attendance page
    window.location.href = 'attendance.html';
});

// Add this new event listener
document.getElementById('viewRecordsBtn').addEventListener('click', function() {
    window.location.href = 'records/rec.html';
});