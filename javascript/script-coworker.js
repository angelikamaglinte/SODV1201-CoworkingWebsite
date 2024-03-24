document.addEventListener("DOMContentLoaded", function () {
    const workspaceList = document.getElementById('workspace-list');
    const sortSelect = document.getElementById('sort');
    const parkingCheckbox = document.getElementById('parking');
    const smokingCheckbox = document.getElementById('smoking');
    const squareFeetSelect = document.getElementById('squareFeet');
    const capacitySelect = document.getElementById('capacity');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const publicTransportationCheckbox = document.getElementById('publicTransportation');
    const searchInput = document.getElementById('search');

    // Sample data representing workspace listings
    const sampleData = {
        "cards": [
            {
                "name": "Workspace 1",
                "address": "1234-12 23 Ave SW",
                "neighbourhood": "Downtown East",
                "workspace_type": "Meeting Room",
                "capacity": 10,
                "smoking_allowed": "No",
                "parking": "Yes",
                "lease_term": "Month",
                "availability_start_date": "2024-04-01",
                "availability_end_date": "2024-06-30",
                "square_feet": 200,
                "price": 1500,
                "public_transportation": "Yes"
            },
            {
                "name": "Workspace 2",
                "address": "5678-34 56 St NW",
                "neighbourhood": "Uptown West",
                "workspace_type": "Office Area",
                "capacity": 5,
                "smoking_allowed": "Yes",
                "parking": "Yes",
                "lease_term": "Week",
                "availability_start_date": "2024-05-15",
                "availability_end_date": "2024-09-15",
                "square_feet": 150,
                "price": 1200,
                "public_transportation": "No"
            },
            {
                "name": "Workspace 3",
                "address": "9101-56 78 Ave NE",
                "neighbourhood": "Midtown",
                "workspace_type": "Desk Area",
                "capacity": 1,
                "smoking_allowed": "Yes",
                "parking": "No",
                "lease_term": "Day",
                "availability_start_date": "2024-04-10",
                "availability_end_date": "2024-04-20",
                "square_feet": 100,
                "price": 300,
                "public_transportation": "Yes"
            },
            {
                "name": "Workspace 4",
                "address": "1213-90 10 Ave SE",
                "neighbourhood": "Downtown West",
                "workspace_type": "Open Area",
                "capacity": 15,
                "smoking_allowed": "No",
                "parking": "Yes",
                "lease_term": "Month",
                "availability_start_date": "2024-05-01",
                "availability_end_date": "2024-08-31",
                "square_feet": 250,
                "price": 2000,
                "public_transportation": "Yes"
            },
            {
                "name": "Workspace 5",
                "address": "1415-21 34 St SE",
                "neighbourhood": "Uptown East",
                "workspace_type": "Meeting Room",
                "capacity": 5,
                "smoking_allowed": "No",
                "parking": "No",
                "lease_term": "Month",
                "availability_start_date": "2024-04-15",
                "availability_end_date": "2024-07-15",
                "square_feet": 150,
                "price": 1300,
                "public_transportation": "No"
            },
            {
                "name": "Workspace 6",
                "address": "1617-43 56 Ave NW",
                "neighbourhood": "Downtown East",
                "workspace_type": "Meeting Room",
                "capacity": 12,
                "smoking_allowed": "No",
                "parking": "Yes",
                "lease_term": "Month",
                "availability_start_date": "2024-04-01",
                "availability_end_date": "2024-06-30",
                "square_feet": 220,
                "price": 1600,
                "public_transportation": "Yes"
            },
            {
                "name": "Workspace 7",
                "address": "1819-67 89 St SW",
                "neighbourhood": "Uptown West",
                "workspace_type": "Office Area",
                "capacity": 7,
                "smoking_allowed": "No",
                "parking": "Yes",
                "lease_term": "Week",
                "availability_start_date": "2024-05-15",
                "availability_end_date": "2024-09-15",
                "square_feet": 180,
                "price": 1400,
                "public_transportation": "No"
            },
            {
                "name": "Workspace 8",
                "address": "2021-90 10 Ave SE",
                "neighbourhood": "Midtown",
                "workspace_type": "Desk Area",
                "capacity": 2,
                "smoking_allowed": "Yes",
                "parking": "No",
                "lease_term": "Day",
                "availability_start_date": "2024-04-10",
                "availability_end_date": "2024-04-20",
                "square_feet": 110,
                "price": 350,
                "public_transportation": "Yes"
            },
            {
                "name": "Workspace 9",
                "address": "2223-45 67 St NW",
                "neighbourhood": "Downtown West",
                "workspace_type": "Open Area",
                "capacity": 20,
                "smoking_allowed": "No",
                "parking": "Yes",
                "lease_term": "Month",
                "availability_start_date": "2024-05-01",
                "availability_end_date": "2024-08-31",
                "square_feet": 300,
                "price": 2500,
                "public_transportation": "Yes"
            },
            {
                "name": "Workspace 10",
                "address": "2425-67 89 Ave NE",
                "neighbourhood": "Uptown East",
                "workspace_type": "Meeting Room",
                "capacity": 8,
                "smoking_allowed": "No",
                "parking": "Yes",
                "lease_term": "Month",
                "availability_start_date": "2024-04-15",
                "availability_end_date": "2024-07-15",
                "square_feet": 200,
                "price": 1700,
                "public_transportation": "No"
            }
        ]
    };    

    displayWorkspaces(sampleData.cards);

    // Event listeners for filtering
    sortSelect.addEventListener('change', filterWorkspaces);
    parkingCheckbox.addEventListener('change', filterWorkspaces);
    smokingCheckbox.addEventListener('change', filterWorkspaces);
    squareFeetSelect.addEventListener('change', filterWorkspaces);
    capacitySelect.addEventListener('change', filterWorkspaces);
    startDateInput.addEventListener('change', filterWorkspaces);
    endDateInput.addEventListener('change', filterWorkspaces);
    publicTransportationCheckbox.addEventListener('change', filterWorkspaces);
    searchInput.addEventListener('input', filterWorkspacesByAddress);

    // Function to display workspace cards
    function displayWorkspaces(workspaces) {
        workspaceList.innerHTML = '';
        workspaces.forEach(workspace => {
            const card = document.createElement('div');
            card.innerHTML = `
                <h3><u>${workspace.name}</u></h3>
                <p><b>Address:</b> ${workspace.address}<p>
                <p><b>Neighbourhood:</b> ${workspace.neighbourhood}</p>
                <p><b>Workspace Type:</b> ${workspace.workspace_type}</p>
                <p><b>Capacity:</b> ${workspace.capacity}</p>
                <p><b>Smoking Allowed:</b> ${workspace.smoking_allowed}</p>
                <p><b>Parking:</b> ${workspace.parking}</p>
                <p><b>Public Transportation:</b> ${workspace.public_transportation}</p>
                <p><b>Lease Term:</b> ${workspace.lease_term}</p>
                <p><b>Availability Start Date:</b> ${workspace.availability_start_date}</p>
                <p><b>Availability End Date: </b>${workspace.availability_end_date}</p>
                <p><b>Square Feet:</b> ${workspace.square_feet}</p>
                <p><b>Price: </b>${workspace.price}</p>
            `;
            workspaceList.appendChild(card);
        });
    }

    // Function to filter workspace data
    function filterWorkspaces() {
        let filteredData = sampleData.cards.slice();

        const sortBy = sortSelect.value;
        if (sortBy !== 'name') {
            filteredData.sort((a, b) => {
                if (sortBy === 'price') {
                    return a[sortBy] - b[sortBy];
                } else {
                    return a[sortBy].localeCompare(b[sortBy]);
                }
            });
        }

        const parkingChecked = parkingCheckbox.checked;
        if (parkingChecked) {
            filteredData = filteredData.filter(workspace => workspace.parking === 'Yes');
        }

        const smokingChecked = smokingCheckbox.checked;
        if (smokingChecked) {
            filteredData = filteredData.filter(workspace => workspace.smoking_allowed === 'Yes');
        }

        const squareFeetValue = squareFeetSelect.value;
        if (squareFeetValue) {
            filteredData = filteredData.filter(workspace => workspace.square_feet === parseInt(squareFeetValue));
        }

        const capacityValue = capacitySelect.value;
        if (capacityValue) {
            filteredData = filteredData.filter(workspace => workspace.capacity === parseInt(capacityValue));
        }

        const startDateValue = startDateInput.value;
        if (startDateValue) {
            filteredData = filteredData.filter(workspace => workspace.availability_start_date >= startDateValue);
        }

        const endDateValue = endDateInput.value;
        if (endDateValue) {
            filteredData = filteredData.filter(workspace => workspace.availability_end_date <= endDateValue);
        }

        const publicTransportationChecked = publicTransportationCheckbox.checked; 
        if (publicTransportationChecked) { 
            filteredData = filteredData.filter(workspace => workspace.public_transportation === 'Yes');
        } 

        displayWorkspaces(filteredData);
    }


    //Search bar
      // Function to filter workspaces by name
      function filterWorkspacesByAddress() {
        const searchValue = searchInput.value.toLowerCase();
        const filteredData = sampleData.cards.filter(workspace => workspace.address.toLowerCase().includes(searchValue));
        displayWorkspaces(filteredData);
    }
});
