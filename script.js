document.addEventListener('DOMContentLoaded', function () {
    var table = document.getElementById('questionsTable');

    // Add three default rows when the page loads
    for (var i = 0; i < 3; i++) {
        addRow(table);
    }

    initialRowsAdded = true;
});

document.getElementById('addObjective').addEventListener('click', function () {
    var table = document.getElementById('questionsTable');

    // If initial three rows are not added, add them
    if (!initialRowsAdded) {
        for (var i = 0; i < 1; i++) {
            addRow(table);
        }
        initialRowsAdded = true;
    } else {
        // If initial rows are already added, add only one row
        addRow(table);
    }
});

function addRow(table) {
    var row = table.insertRow(-1);

    var input = document.createElement('input');
    input.type = 'text';
    input.placeholder = '';

    var cell = row.insertCell(0);
    cell.appendChild(input);
    cell.classList.add('objectiveColumn');

    var cell2 = row.insertCell(1);
    var input2 = document.createElement('input');
    input2.type = 'number';
    input2.placeholder = '';
    cell2.appendChild(input2);
    cell2.classList.add('smallColumn');

    var cell3 = row.insertCell(2);
    var output = document.createElement('output');
    output.type = 'text';
    output.placeholder = '';
    cell3.appendChild(output);
    cell3.classList.add('smallColumn', 'percentage-cell'); // Add the class 'percentage-cell'

    // Set value to an empty string after appending to the document

    var removeCell = row.insertCell(3);
    removeCell.innerHTML = '<button type="button">Supprimer</button>';
    removeCell.querySelector('button').addEventListener('click', function () {
        table.deleteRow(row.rowIndex);
    });
}

document.getElementById('testForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Validate Test Name
    var testNameInput = document.getElementById('testName');
    var testName = testNameInput.value.trim();
    if (testName === '') {
        alert('Veuillez saisir un nom de test.');
        return;
    }

    // Validate Total Students
    var totalStudentsInput = document.getElementById('totalStudents');
    var totalStudents = parseInt(totalStudentsInput.value);
    if (isNaN(totalStudents) || totalStudents <= 0) {
        alert("Veuillez saisir un entier positif valide pour le nombre total d'élèves.");
        totalStudentsInput.value = ''; // Clear the input
        return;
    }

    var table = document.getElementById('questionsTable');
    var rows = table.rows;
    var highestPercentages = [];
    var lowestPercentages = [];
    var highestPercentage = -1;
    var lowestPercentage = 101; // Start with a value higher than any possible percentage
    // Reset the previous percentage calculations
    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].cells;
        var percentageOutput = cells[2].querySelector('output');
        percentageOutput.textContent = ''; // Reset the content
    }

    // Validate and calculate Students that Acquired the Objective
    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].cells;
        var objectiveInput = cells[0].querySelector('input');
        var studentInput = cells[1].querySelector('input');
        var percentageOutput = cells[2].querySelector('output');

        // Validate missing objective
        if (objectiveInput.value.trim() === '') {
            alert('Veuillez saisir un objectif pour la ligne ' + i + '.');
            return;
        }

        // Validate Students that Acquired the Objective
        var studentValue = parseInt(studentInput.value);
        if (isNaN(studentValue) || studentValue <= 0 || studentValue>totalStudents) {
            alert("Veuillez saisir un entier positif valide pour le nombre d'élèves ayant atteint l'objectif dans la ligne" + i + '.');
            studentInput.value = ''; // Clear the input
            return;
        }

        // Calculate and display the percentage for each row
        var percentage = (studentValue / totalStudents) * 100;
        percentageOutput.textContent = percentage.toFixed(2) + '%';
        if (percentage > highestPercentage) {
            highestPercentage = percentage;
            highestPercentages = [objectiveInput.value]; // Start a new list
        } else if (percentage === highestPercentage) {
            highestPercentages.push(objectiveInput.value); // Add to the list
        }

        if (percentage < lowestPercentage) {
            lowestPercentage = percentage;
            lowestPercentages = [objectiveInput.value]; // Start a new list
        } else if (percentage === lowestPercentage) {
            lowestPercentages.push(objectiveInput.value); // Add to the list
        }
    }

    // Update the content of the corresponding divs in the HTML
    document.getElementById('highestPercentageValue').textContent = highestPercentages.join(', ');
    document.getElementById('lowestPercentageValue').textContent = lowestPercentages.join(', ');
    
});

document.addEventListener('DOMContentLoaded', function () {
    var today = new Date().toISOString().split('T')[0];
    document.querySelector('.date-setting-input').value = today;
});

document.addEventListener('DOMContentLoaded', function () {
    const generatePdfButton = document.getElementById('generatePdfButton');

    generatePdfButton.addEventListener('click', function () {
        // Apply any additional styles or modifications if needed
        // ...

        // Trigger the print dialog
        window.print();
    });
});
