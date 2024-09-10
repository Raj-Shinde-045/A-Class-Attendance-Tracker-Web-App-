document.addEventListener('DOMContentLoaded', function() {
    const recordsList = document.getElementById('recordsList');
    const records = JSON.parse(localStorage.getItem('attendanceRecords')) || [];

    records.forEach((record, index) => {
        const recordItem = document.createElement('div');
        recordItem.classList.add('record-item');
        recordItem.innerHTML = `
            <h3>Record ${index + 1}</h3>
            <p>Class: ${record.class}</p>
            <p>Subject: ${record.subject}</p>
            <p>Teacher: ${record.teacher}</p>
            <p>Date: ${record.date}</p>
            <button onclick="downloadCSV(${index})">Download CSV</button>
        `;
        recordsList.appendChild(recordItem);
    });

    document.getElementById('backBtn').addEventListener('click', function() {
        window.location.href = '../land.html';
    });
});

function downloadCSV(index) {
    const records = JSON.parse(localStorage.getItem('attendanceRecords')) || [];
    const record = records[index];
    const encodedUri = encodeURI(record.data);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `attendance_${record.class}_${record.subject}_${record.date}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
