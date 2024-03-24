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
                "public_transportation": "Yes",
                "owner": "(123)-456-7890",
                "description": "Spacious meeting room available for rent. Ideal for team meetings, workshops, and presentations. Features modern amenities and comfortable seating for up to 10 people."
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
                "public_transportation": "No",
                "owner": "(123)-456-7890",
                "description": "Modern office space available for short-term rental. Perfect for startups and small businesses. Comes with essential amenities and flexible lease terms."
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
                "public_transportation": "Yes",
                "owner": "(123)-456-7890",
                "description": "Cozy desk area available for daily use. Suitable for freelancers and remote workers. Enjoy a quiet workspace with access to public transportation nearby."
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
                "public_transportation": "Yes",
                "owner": "(123)-456-7890",
                "description": "Spacious open area available for monthly lease. Suitable for events, workshops, and collaborative projects. Features ample parking space."
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
                "public_transportation": "No",
                "owner": "(123)-456-7890",
                "description": "Comfortable meeting room available for monthly bookings. Suitable for small gatherings and discussions. Convenient location in Uptown East."
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
                "public_transportation": "Yes",
                "owner": "(123)-456-7890",
                "description": "Spacious meeting room available for rent. Ideal for team meetings, workshops, and presentations. Features modern amenities and comfortable seating for up to 12 people."
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
                "public_transportation": "No",
                "owner": "(123)-456-7890",
                "description": "Contemporary office space available for weekly rentals. Equipped with high-speed internet and comfortable workstations. Convenient location in Uptown West."
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
                "public_transportation": "Yes",
                "owner": "(123)-456-7890",
                "description": "Compact desk area available for daily use. Suitable for individuals seeking a focused work environment. Close proximity to public transportation."
            },{
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
                "public_transportation": "Yes",
                "owner": "(123)-456-7890",
                "description": "Expansive open area available for monthly rental. Suitable for large events, exhibitions, and creative projects. Includes ample parking space and easy access to public transportation."
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
                "public_transportation": "No",
                "owner": "(123)-456-7890",
                "description": "Convenient meeting room available for monthly bookings. Suitable for workshops, seminars, and client presentations. Features modern facilities and comfortable seating for up to 8 participants."
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
        card.classList.add('workspace'); // Add 'workspace' class to the dynamically generated card
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
            <div class="contact-btn-container">
            <button class="show-contact-btn">Contact Info</button>
        <p class="contact" style="display: none;"><b>Contact:</b> ${workspace.owner}</p>
        </div>
        <div class="description-btn-container">
        <button class="show-description-btn">Show Description</button>
        <p class="description" style="display: none;"><b>Description:</b> ${workspace.description}</p>
        </div>
        `;
        workspaceList.appendChild(card);
    });

    // Add event listeners for contact buttons
    // const contactButtons = document.querySelectorAll('.contact-btn');
    // contactButtons.forEach(button => {
    //     button.addEventListener('click', displayContactInfo);
    // });

    const contactButtons = document.querySelectorAll('.show-contact-btn');
    contactButtons.forEach(button => {
        button.addEventListener('click', () => {
            const contact = button.nextElementSibling;
            contact.style.display = contact.style.display === 'none' ? 'block' : 'none';
        });
    });




    const descriptionButtons = document.querySelectorAll('.show-description-btn');
    descriptionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const description = button.nextElementSibling;
            description.style.display = description.style.display === 'none' ? 'block' : 'none';
        });
    });
}

// Function to display contact information of the owner
function displayContactInfo(event) {
    const owner = event.target.dataset.owner;
    const card = event.target.closest('.workspace');
    const contactInfo = document.createElement('p');
    contactInfo.innerHTML = `<b>Contact Information:</b> ${owner}`;
    card.appendChild(contactInfo);
}
    // Function to filter workspace data
    function filterWorkspaces() {
        let filteredData = sampleData.cards.slice();

        // const sortBy = sortSelect.value;
        // if (sortBy !== 'name') {
        //     filteredData.sort((a, b) => {
        //         if (sortBy === 'price') {
        //             return a[sortBy] - b[sortBy];
        //         } else {
        //             return a[sortBy].localeCompare(b[sortBy]);
        //         }
        //     });
        // }

        const sortBy = sortSelect.value;
        if (sortBy !== 'name') {
            filteredData.sort((a, b) => {
                if (sortBy === 'price') {
                    return a[sortBy] - b[sortBy];
                } else if (sortBy === 'capacity') {
                    return parseInt(a[sortBy]) - parseInt(b[sortBy]); // Parse capacity values as integers
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
