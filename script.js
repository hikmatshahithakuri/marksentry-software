document.addEventListener('DOMContentLoaded', function() {
    // Google Sheets API integration
    // Replace with your actual Google Sheets ID and API key
    const SPREADSHEET_ID = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSMiZcq-VkbxUcH_XCXJaOmPJ5nTuFD8PyRhpOZp6Z4qvwxJlysEIxFiz1BYF5PqeIRYzPbx9UXA5MZ/pubhtml';
    const API_KEY = 'AIzaSyDCH2XznHpvNw5NFTviCZMGnZ3Lw8grpZc';
    const SHEET_NAME = 'Class6Marks';
    
    // Mock data for demonstration
    const mockData = [
        { rollNo: 1, name: "Ram Sharma", math: 85, science: 78, english: 92, nepali: 88, social: 76, computer: 95 },
        { rollNo: 2, name: "Sita Gurung", math: 92, science: 85, english: 88, nepali: 94, social: 82, computer: 90 },
        { rollNo: 3, name: "Hari Thapa", math: 78, science: 82, english: 85, nepali: 76, social: 88, computer: 80 },
        { rollNo: 4, name: "Gita Rai", math: 88, science: 90, english: 92, nepali: 85, social: 78, computer: 92 },
        { rollNo: 5, name: "Niraj Tamang", math: 75, science: 80, english: 78, nepali: 72, social: 85, computer: 78 }
    ];
    
    // Load data from Google Sheets (mock for now)
    function loadDataFromSheet() {
        // In a real implementation, you would use the Google Sheets API
        // For now, we'll use mock data
        console.log("Loading data from Google Sheet...");
        
        // Calculate totals and percentages
        const dataWithTotals = mockData.map(student => {
            const total = student.math + student.science + student.english + 
                          student.nepali + student.social + student.computer;
            const percentage = (total / 600 * 100).toFixed(2);
            return { ...student, total, percentage };
        });
        
        updateTable(dataWithTotals);
        updateStats();
    }
    
    // Update the marks table with data
    function updateTable(data) {
        const tableBody = document.querySelector('#marksData tbody');
        tableBody.innerHTML = '';
        
        data.forEach(student => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${student.rollNo}</td>
                <td>${student.name}</td>
                <td>${student.math}</td>
                <td>${student.science}</td>
                <td>${student.english}</td>
                <td>${student.nepali}</td>
                <td>${student.social}</td>
                <td>${student.computer}</td>
                <td>${student.total}</td>
                <td>${student.percentage}%</td>
            `;
            
            tableBody.appendChild(row);
        });
    }
    
    // Update statistics cards
    function updateStats() {
        document.getElementById('totalStudents').textContent = mockData.length;
        document.getElementById('marksSubmitted').textContent = "4/6"; // Mock value
    }
    
    // Handle file upload
    document.getElementById('uploadBtn').addEventListener('click', function() {
        const teacherName = document.getElementById('teacherName').value;
        const subject = document.getElementById('teacherSubject').value;
        const examMonth = document.getElementById('examMonth').value;
        const fileInput = document.getElementById('marksFile');
        
        if (!teacherName || !subject || !examMonth || !fileInput.files[0]) {
            alert("Please fill all fields and select a file.");
            return;
        }
        
        // In a real implementation, you would process the file and send to Google Sheets
        console.log("Uploading marks...");
        console.log("Teacher:", teacherName);
        console.log("Subject:", subject);
        console.log("Exam:", examMonth);
        console.log("File:", fileInput.files[0].name);
        
        // Simulate upload success
        setTimeout(() => {
            showSuccessModal();
        }, 1500);
    });
    
    // Show success modal
    function showSuccessModal() {
        const modal = document.getElementById('successModal');
        modal.style.display = 'flex';
    }
    
    // Close modal when clicking X
    document.querySelector('.close-modal').addEventListener('click', function() {
        document.getElementById('successModal').style.display = 'none';
    });
    
    // Close modal when clicking OK button
    document.getElementById('modalOkBtn').addEventListener('click', function() {
        document.getElementById('successModal').style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('successModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Refresh data button
    document.getElementById('refreshBtn').addEventListener('click', loadDataFromSheet);
    
    // Initialize the page
    loadDataFromSheet();
    
    // Drag and drop functionality for file upload
    const fileLabel = document.querySelector('.file-label');
    const fileInput = document.getElementById('marksFile');
    
    fileLabel.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileLabel.style.borderColor = var(--primary-color);
        fileLabel.style.backgroundColor = 'rgba(78, 115, 223, 0.1)';
    });
    
    fileLabel.addEventListener('dragleave', () => {
        fileLabel.style.borderColor = '#d1d3e2';
        fileLabel.style.backgroundColor = 'transparent';
    });
    
    fileLabel.addEventListener('drop', (e) => {
        e.preventDefault();
        fileLabel.style.borderColor = '#d1d3e2';
        fileLabel.style.backgroundColor = 'transparent';
        
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            fileLabel.querySelector('span').textContent = fileInput.files[0].name;
        }
    });
    
    // Update file name when selected
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length) {
            fileLabel.querySelector('span').textContent = fileInput.files[0].name;
        }
    });
});