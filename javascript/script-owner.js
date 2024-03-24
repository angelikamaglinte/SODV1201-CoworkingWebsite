// OWNER PAGE JAVASCRIPT FILE


// ARRAY TO STORE PROPERTIES AND WORKSPACES OBJECTS 
let properties = [];
let workspaces = [];


// FUNCTION WHEN PAGES LOADS
window.onload = function () {
  if (localStorage.getItem('properties')) {
    properties = JSON.parse(localStorage.getItem('properties'));
  }
  if (localStorage.getItem('workspaces')) {
    workspaces = JSON.parse(localStorage.getItem('workspaces'));
  }
  displayProperties(); 
  displayWorkspaces();
  populatePropertyDropdown(); 
  const storedSearchQuery = localStorage.getItem('searchQuery');
  if (storedSearchQuery) {
    document.getElementById('workspaceSearch').value = storedSearchQuery;
    searchWorkspaces(); 
  }
};


// FUNCTION TO SET SQUARE FEET VALUE IN PROPERTY FORM
function setSquareFeet(value) {
  document.getElementById('squareFeet').value = value;
  document.getElementById('selectedSquareFeet').innerText = `Square Feet: ${value} sq ft`;
}


// FUNCTION TO VALIDATE AND ADD PROPERTY
function validateAndAddProperty() {
  const addressInput = document.getElementById('address');
  const neighborhoodInput = document.getElementById('neighborhood');
  const squareFeetInput = document.getElementById('squareFeet');
  const parkingGarageInput = document.getElementById('parkingGarage');
  const publicTranspoInput = document.getElementById('publicTranspo');

  const address = addressInput.value;
  const neighborhood = neighborhoodInput.value;
  const squareFeet = squareFeetInput.value;
  const parkingGarage = parkingGarageInput.checked;
  const publicTranspo = publicTranspoInput.checked;

  // CONDITION: IF ADDRESS, NEIGHBORHOOD, SQUARE FEET ARE EMPTY, SHOW VALIDATION MESSAGE
  if (!address || !neighborhood || !squareFeet) {
    const validationModal = document.getElementById('validationModal');
    validationModal.style.display = 'block';
    document.getElementById('closeValidationBtn').onclick = function () {
      validationModal.style.display = 'none';
    };
    return;
  }

  const property = {
    address,
    neighborhood,
    squareFeet,
    parkingGarage,
    publicTranspo
  };

  properties.push(property);
  savePropertiesToLocalStorage();
  displayProperties();

  // CONDITION: CLEAR INPUT FIELDS UPON ADDING A PROPERTY
  addressInput.value = '';
  neighborhoodInput.value = '';
  squareFeetInput.value = '';
  parkingGarageInput.checked = false;
  publicTranspoInput.checked = false;

  // CONDITION: DISPLAY SUCCESS MESSAGE WHEN PROPERTY IS SUCCESSFULLY ADDED
  const successfulListing = document.getElementById('successfulListing');
  successfulListing.style.display = 'block';
  document.getElementById('closeSuccessAddedPropertyBtn').onclick = function () {
    successfulListing.style.display = 'none';
  };
}


// SORTING PROPERTIES
// FUNCTION TO SORT PROPERTIES BY ADDRESS AND NEIGHBORHOOD
// document.getElementById('sortAddressAndNeighborhood').addEventListener('change', sortPropertiesByAddressAndNeighborhood)
// Call the sorting function based on the selected option
document.getElementById('sortAddressAndNeighborhood').addEventListener('change', function() {
  const sortBy = this.value;
  if (sortBy === 'addressAscending') {
      sortPropertiesByAddressAsc();
  } else if (sortBy === 'addressDescending') {
      sortPropertiesByAddressDesc();
  } else if (sortBy === 'neighborhoodAscending') {
      sortPropertiesByNeighborhoodAsc();
  } else if (sortBy === 'neighborhoodDescending') {
      sortPropertiesByNeighborhoodDesc();
  }
  
  // After sorting, display the properties
  displayProperties();
});

// Function to sort properties by address in ascending order
function sortPropertiesByAddressAsc() {
  properties.sort((a, b) => a.address.localeCompare(b.address));
}

// Function to sort properties by address in descending order
function sortPropertiesByAddressDesc() {
  properties.sort((a, b) => b.address.localeCompare(a.address));
}

// Function to sort properties by neighborhood in ascending order
function sortPropertiesByNeighborhoodAsc() {
  properties.sort((a, b) => a.neighborhood.localeCompare(b.neighborhood));
}

// Function to sort properties by neighborhood in descending order
function sortPropertiesByNeighborhoodDesc() {
  properties.sort((a, b) => b.neighborhood.localeCompare(a.neighborhood));
}




// FUNCTION TO SORT PROPERTIES BY ADDRESS AND NEIGHBORHOOD IN ASCENDING OR DESCENDING ORDER
function sortPropertiesBy(key, order) {
  properties.sort((a, b) => {
      if (order === 'asc') {
          return a[key].localeCompare(b[key]);
      } else {
          return b[key].localeCompare(a[key]);
      }
  });

  console.log('Properties after sorting:', properties);
  // CALL DISPLAY PROPERTIES AFTER SORTING
  displayProperties();
}


// FUNCTION TO SORT PROPERTIES BY PARKING GARAGE STATUS
function filterPropertiesByParkingGarage(included) {
  // Filter properties based on the parking garage status
  const filteredProperties = properties.filter(property => property.parkingGarage === included);

  // CALL DISPLAY PROPERTIES AFTER SORTING
  displayProperties(filteredProperties);
}

document.addEventListener('DOMContentLoaded', function () {
  const includedBtn = document.getElementById('filterParkingGarageIncludedBtn');
  const notIncludedBtn = document.getElementById('filterParkingGarageNotIncludedBtn');

  if (includedBtn && notIncludedBtn) {
    includedBtn.addEventListener('click', () => filterPropertiesByParkingGarage(true));
    notIncludedBtn.addEventListener('click', () => filterPropertiesByParkingGarage(false));
  } else {
    console.error("Button IDs not found.");
  }
});


// FUNCTION TO SORT PROPERTIES BY SQUARE FEET 
document.getElementById('sortSquareFeet').addEventListener('change', sortPropertiesBySquareFeet);

function sortPropertiesBySquareFeet() {
  const sortBy = document.getElementById('sortSquareFeet').value;

  switch (sortBy) {
    case 'asc':
      sortPropertiesBy('squareFeet', 'asc');
      break;
    case 'desc':
      sortPropertiesBy('squareFeet', 'desc');
      break;
    default:
      // DO NOTHING IF NO VALID OPTION IS SELECTED
      break;
  }
}


// FUNCTION TO SORT PROPERTIES BY SQUARE FEET IN ASCENDING OR DESCENDING ORDER
function sortPropertiesBy(key, order) {
  properties.sort((a, b) => {
    const aValue = parseInt(a[key]);
    const bValue = parseInt(b[key]);
    if (order === 'asc') {
      return aValue - bValue;
    } else {
      return bValue - aValue;
    }
  });

  // CALL DISPLAY PROPERTIES AFTER SORTING
  displayProperties();
}


// FUNCTION TO SORT PROPERTIES BY NEARBY PUBLIC TRANSPORTATION STATUS
function filterPropertiesByPublicTranspo(included) {
  const filteredProperties = properties.filter(property => property.publicTranspo === included);

  // CALL DISPLAY PROPERTIES AFTER SORTING
  displayProperties(filteredProperties);
}

document.addEventListener('DOMContentLoaded', function () {
  const includedBtn = document.getElementById('filterPublicTranspoIncludedBtn');
  const notIncludedBtn = document.getElementById('filterPublicTranspoNotIncludedBtn');

  if (includedBtn && notIncludedBtn) {
    includedBtn.addEventListener('click', () => filterPropertiesByPublicTranspo(true));
    notIncludedBtn.addEventListener('click', () => filterPropertiesByPublicTranspo(false));
  } else {
    console.error("Button IDs not found.");
  }
});


// FUNCTION TO CLEAR SORT PROPERTIES
document.getElementById('clearPropertySortingBtn').addEventListener('click', function() {
  
  // CALL DISPLAY PROPERTIES AFTER SORTING
  displayProperties(properties);
});


// FUNCTION TO DISPLAY PROPERTIES
// Display Properties Function
function displayProperties(propertiesArray = properties) {
  const propertyList = document.getElementById('propertyList');
  propertyList.innerHTML = '';

  // Render properties based on the provided or default properties array
  propertiesArray.forEach((property, index) => {
      // Create HTML elements to display property information
      const propertyDiv = document.createElement('div');
      propertyDiv.classList.add('property');

      const propertyInfo = `
          <p><strong>Address:</strong> ${property.address}</p>
          <p><strong>Neighborhood:</strong> ${property.neighborhood}</p>
          <p><strong>Square Feet:</strong> ${property.squareFeet}</p>
          <p><strong>Parking Garage:</strong> ${property.parkingGarage ? 'Yes' : 'No'}</p>
          <p><strong>Near Public Transportation:</strong> ${property.publicTranspo ? 'Yes' : 'No'}</p>
      `;

      // Create update and delete buttons
      const updateButton = document.createElement('button');
      updateButton.textContent = 'Update Property';
      updateButton.onclick = () => openPropertyEditModal(index);

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete Property';
      deleteButton.onclick = () => deleteProperty(index);

      // Append property information and buttons to the property div
      propertyDiv.innerHTML = propertyInfo;
      propertyDiv.appendChild(updateButton);
      propertyDiv.appendChild(deleteButton);

      propertyList.appendChild(propertyDiv);
  });
}



// FUNCTION TO OPEN POP UP MODAL TO EDIT PROPERTY
function openPropertyEditModal(index) {
  const property = properties[index];
  document.getElementById('editAddress').value = property.address;
  document.getElementById('editNeighborhood').value = property.neighborhood;
  document.getElementById('editSquareFeet').value = property.squareFeet; 

  const selectedSquareFeet = property.squareFeet;
  document.getElementById('editSquareFeet').innerText = selectedSquareFeet;

  const modal = document.getElementById('propertyEditModal');
  modal.style.display = 'block';

  document.getElementById('savePropertyChangesBtn').onclick = function () {
    if (validatePropertyChanges()) {
      savePropertyChanges(index);
      modal.style.display = 'none';
    }
  };

  const span = document.getElementsByClassName('close')[0];
  span.onclick = function () {
    modal.style.display = 'none';
    console.log('edit property close icon triggered')
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
}


// FUNCTION TO VALIDATE PROPERTY CHANGES
function validatePropertyChanges() {
  const address = document.getElementById('editAddress').value;
  const neighborhood = document.getElementById('editNeighborhood').value;

  if (!address || !neighborhood) {
    alert('Please fill out all required fields.');
    return false;
  }
  return true;
}


// FUNCTION TO SAVE CHANGES IN PROPERTY
function savePropertyChanges(index) {
  const updatedAddress = document.getElementById('editAddress').value;
  const updatedNeighborhood = document.getElementById('editNeighborhood').value;
  const updatedSquareFeet = document.getElementById('editSquareFeet').value; 

  const updatedParkingGarage = document.getElementById('editParkingGarage').checked;
  const updatedPublicTranspo = document.getElementById('editPublicTranspo').checked;

  properties[index] = {
    address: updatedAddress,
    neighborhood: updatedNeighborhood,
    squareFeet: updatedSquareFeet,
    parkingGarage: updatedParkingGarage,
    publicTranspo: updatedPublicTranspo
  };

  savePropertiesToLocalStorage(); 
  displayProperties(); 
}


// FUNCTION TO DELETE A PROPERTY
function deleteProperty(index) {
  properties.splice(index, 1);
  savePropertiesToLocalStorage();
  displayProperties();
}


// FUNCTION TO SET SQUARE FEET VALUE IN POP UP MODAL
function setEditSquareFeet(value) {
  document.getElementById('editSquareFeet').value = value;
}


// FUNCTION TO SET CAPACITY VALUE IN WORKSPACE FORM
function setCapacity(value) {
  document.getElementById('capacity').value = value;
  const editCapacityText = document.getElementById('capacityText');
  capacityText.innerText = `${value} person/s`;
}


// FUNCTION TO SET CAPACITY VALUE IN WORKSPACE POP UP MODAL
function editSetCapacity(value) {
  document.getElementById('editCapacity').value = value;
  const editCapacityText = document.getElementById('editCapacityText');
  editCapacityText.innerText = `${value} person/s`;
}


// FUNCTION TO SET LEASE TERM VALUE IN WORKSPACE FORM
function setLeaseTerm(value) {
  document.getElementById('leaseTerm').value = value;
  const leaseTermText = document.getElementById('leaseTermText');
  leaseTermText.innerText = value;
}


// FUNCTION TO SET LEASE TERM VALUE IN WORKSPACE POP UP MODAL
function editSetLeaseTerm(value) {
  document.getElementById('editLeaseTerm').value = value;
  const leaseTermText = document.getElementById('editLeaseTermText');
  editLeaseTermText.innerText = value;
}


// FUNCTION TO POPULATE PROPERTY DROPDOWN BUTTON IN WORKSPACE FORM
function populatePropertyDropdown() {
  const propertyDropdown = document.getElementById('propertyName');
  propertyDropdown.innerHTML = ''; 

  properties.forEach((property, index) => {
    const option = document.createElement('option');
    option.value = index; 
    option.textContent = property.address; 
    propertyDropdown.appendChild(option); 
  });
}


// FUNCTION TO VALIDATE AND ADD WORKSPACE
function validateAndAddWorkspace() {
  const propertyNameIndex = document.getElementById('propertyName').value;
  const property = properties[propertyNameIndex];

  // CONDITION: VALIDATE IF THERE'S A PROPERTY SELECTED
  if (!property) {
    const selectPropertyMessage = document.getElementById('selectPropertyMessage');
    selectPropertyMessage.style.display = 'block';
    document.getElementById('selectPropertyCloseBtn').onclick = function () {
      selectPropertyMessage.style.display = 'none';
    };
    return;
  }

  const workspaceType = document.getElementById('workspaceType').value;
  const capacity = document.getElementById('capacity').value;
  const smokingAllowed = document.getElementById('smokingAllowed').checked;
  const leaseTerm = document.getElementById('leaseTerm').value;
  const price = document.getElementById('price').value;
  const availabilityStartDate = document.getElementById('availabilityStartDate').value;
  const availabilityEndDate = document.getElementById('availabilityEndDate').value;

  // CONDITION: VALIDATE LEASE TERM
  let leaseTermAlertTriggered = false;

  switch (leaseTerm) {
    case 'day':
      if (availabilityStartDate !== availabilityEndDate) {
        alert('For a daily lease term, the start date must be the same as the end date.');
        leaseTermAlertTriggered = true;
      }
      break;
    case 'week':
      if (!availabilityStartDate || !availabilityEndDate) {
        alert('Please provide both start and end dates for weekly lease terms.');
        leaseTermAlertTriggered = true;
      }
      const diffInDays = (new Date(availabilityEndDate) - new Date(availabilityStartDate)) / (1000 * 60 * 60 * 24);
      if (diffInDays !== 6) {
        alert('For a weekly lease term, the span between start and end dates must be exactly 7 days.');
        leaseTermAlertTriggered = true;
      }
      break;
    case 'month':
      if (!availabilityStartDate || !availabilityEndDate) {
        alert('Please provide both start and end dates for monthly lease terms.');
        leaseTermAlertTriggered = true;
      }
      const diffInMonths = (new Date(availabilityEndDate).getMonth() + 1) - (new Date(availabilityStartDate).getMonth() + 1);
      if (diffInMonths !== 1) {
        alert('For a monthly lease term, the span between start and end dates must be exactly 1 month.');
        leaseTermAlertTriggered = true;
      }
      break;
    default:
      break;
  }

  // CONDITION: VALIDATE ALL FIELDS ARE FILLED OUT
  if (!workspaceType || !capacity || !leaseTerm || !price || !availabilityStartDate || !availabilityEndDate) {
    const validationModal = document.getElementById('validationModal');
    validationModal.style.display = 'block';
    document.getElementById('closeValidationBtn').onclick = function () {
      validationModal.style.display = 'none';
    };
    return;
  }

  // CONDITION: IF NO ALERTS WERE TRIGGERED DURING LEASE TERM VALIDATION AND ALL FIELDS ARE FILLED OUT CORRECTLY
  if (!leaseTermAlertTriggered) {
    const successfulWorkspaceListing = document.getElementById('successfulWorkspaceListing');
    successfulWorkspaceListing.style.display = 'block';
    document.getElementById('closeSuccessWorkspaceAddedBtn').onclick = function () {
      successfulWorkspaceListing.style.display = 'none';
    };
  } else {
    // CONDITION: IF AN ALERT WAS TRIGGERED DURING LEASE TERM VALIDATION
    const validationModal = document.getElementById('validationModal');
    validationModal.style.display = 'block';
    document.getElementById('closeValidationBtn').onclick = function () {
      validationModal.style.display = 'none';
    };
  }

  // Construct workspace object
  const workspace = {
    propertyName: property.address,
    squareFeet: property.squareFeet,
    workspaceType,
    capacity,
    smokingAllowed,
    leaseTerm,
    availabilityStartDate,
    availabilityEndDate,
    price
  };

  workspaces.push(workspace); // Add workspace to the list
  saveWorkspacesToLocalStorage();
  displayWorkspaces();
}


// SORTING WORKSPACES

// Add event listener to the select dropdown for filtering
document.getElementById('workspaceTypeFilter').addEventListener('change', function() {
  const filterType = this.value; // Get the selected filter type
  console.log("Filter Type: ", filterType); // Check the selected filter type
  displayWorkspaces(workspaces, filterType); // Call displayWorkspaces with the selected filter type
});


// FUNCTION TO DISPLAY WORKSPACES
function displayWorkspaces(workspacesArray = workspaces, filterType = '') {
  const workspaceList = document.getElementById('workspaceList');
  workspaceList.innerHTML = '';

  // Filter workspacesArray based on filterType
  const filteredWorkspaces = filterType ? workspacesArray.filter(workspace => workspace.workspaceType === filterType) : workspacesArray;

  console.log("Filtered Workspaces: ", filteredWorkspaces); // Log filtered workspaces

  filteredWorkspaces.forEach((workspace, index) => {
    const propertyIndex = properties.findIndex(property => property.address === workspace.propertyName);
    let neighborhood = 'Neighborhood information not available'; // Default value if neighborhood is not found

    if (propertyIndex !== -1) {
      neighborhood = properties[propertyIndex].neighborhood;
    }

    const workspaceDiv = document.createElement('div');
    workspaceDiv.classList.add('workspace');

    const workspaceInfo = `
        <p><strong>Property Name:</strong> ${workspace.propertyName}</p>
        <p><strong>Neighborhood:</strong> ${neighborhood}</p>
        <p><strong>Workspace Type:</strong> ${workspace.workspaceType}</p>
        <p><strong>Capacity:</strong> ${workspace.capacity} person/s</p>
        <p><strong>Smoking Allowed:</strong> ${workspace.smokingAllowed ? 'Yes' : 'No'}</p>
        <p><strong>Lease Term:</strong> ${workspace.leaseTerm}</p>
        <p><strong>Availability Start Date:</strong> ${workspace.availabilityStartDate}</p>
        <p><strong>Availability End Date:</strong> ${workspace.availabilityEndDate}</p>        
        <p><strong>Price:</strong> ${workspace.price}</p>
        <button onclick="openWorkspaceModal(${index})">Edit Workspace</button>
        <button onclick="deleteWorkspace(${index})">Delete Workspace</button>
      `;

    workspaceDiv.innerHTML = workspaceInfo;
    workspaceList.appendChild(workspaceDiv);
  });
}







// FUNCTION TO OPEN POP UP MODAL TO EDIT WORKSPACES
function openWorkspaceModal(index) {
  const workspace = workspaces[index];
  document.getElementById('editPropertyName').value = workspace.propertyName;
  document.getElementById('editWorkspaceType').value = workspace.workspaceType;
  document.getElementById('editCapacity').value = workspace.capacity;
  document.getElementById('editLeaseTerm').value = workspace.leaseTerm; 

  const modal = document.getElementById('workspaceEditModal');
  modal.style.display = 'block';

  document.getElementById('saveWorkspaceChangesBtn').onclick = function () {
    if (validateWorkspaceChanges()) {
      saveWorkspaceChanges(index);
      modal.style.display = 'none';
    }
  };

  const span = document.getElementsByClassName('close')[1];
  span.onclick = function () {
    modal.style.display = 'none';
    console.log('edit workspace close icon triggered')
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
}


// FUNCTION TO VALIDATE WORKSPACE CHANGES
function validateWorkspaceChanges() {
  const workspaceType = document.getElementById('editWorkspaceType').value;
  const capacity = document.getElementById('editCapacity').value;
  const leaseTerm = document.getElementById('editLeaseTerm').value; // Get the value of editLeaseTerm
  const price = document.getElementById('editPrice').value;
  const availabilityStartDate = document.getElementById('editAvailabilityStartDate').value;
  const availabilityEndDate = document.getElementById('editAvailabilityEndDate').value;

  // Validate lease term and availability dates
  let leaseTermAlertTriggered = false;

  switch (leaseTerm) {
    case 'day':
      if (availabilityStartDate !== availabilityEndDate) {
        alert('For a daily lease term, the start date must be the same as the end date.');
        leaseTermAlertTriggered = true;
      }
      break;
    case 'week':
      if (!availabilityStartDate || !availabilityEndDate) {
        alert('Please provide both start and end dates for weekly lease terms.');
        leaseTermAlertTriggered = true;
      }
      const diffInDays = (new Date(availabilityEndDate) - new Date(availabilityStartDate)) / (1000 * 60 * 60 * 24);
      if (diffInDays !== 6) {
        alert('For a weekly lease term, the span between start and end dates must be exactly 7 days.');
        leaseTermAlertTriggered = true;
      }
      break;
    case 'month':
      if (!availabilityStartDate || !availabilityEndDate) {
        alert('Please provide both start and end dates for monthly lease terms.');
        leaseTermAlertTriggered = true;
      }
      const diffInMonths = (new Date(availabilityEndDate).getMonth() + 1) - (new Date(availabilityStartDate).getMonth() + 1);
      if (diffInMonths !== 1) {
        alert('For a monthly lease term, the span between start and end dates must be exactly 1 month.');
        leaseTermAlertTriggered = true;
      }
      break;
    default:
      break;
  }

  // Validate all fields are filled out
  if (!workspaceType || !capacity || !leaseTerm || !price || !availabilityStartDate || !availabilityEndDate) {
    const validationModal = document.getElementById('validationModal');
    validationModal.style.display = 'block';
    document.getElementById('closeValidationBtn').onclick = function () {
      validationModal.style.display = 'none';
    };
    return false; // Return false if any required field is empty
  }

  return true; // Return true if all validations pass
}


// FUNCTION TO SAVE CHANGES IN WORKSPACES
function saveWorkspaceChanges(index) {
  const propertyName = document.getElementById('editPropertyName').value;
  const workspaceType = document.getElementById('editWorkspaceType').value;
  const capacity = document.getElementById('editCapacity').value;
  const smokingAllowed = document.getElementById('editSmokingAllowed').checked;
  const leaseTerm = document.getElementById('editLeaseTerm').value;
  const availabilityStartDate = document.getElementById('editAvailabilityStartDate').value;
  const availabilityEndDate = document.getElementById('editAvailabilityEndDate').value;
  const price = document.getElementById('editPrice').value;

  // CONDITION: VALIDATE AVAILABILITY DATES
  let availabilityDatesValid = true;

  switch (leaseTerm) {
    case 'day':
      if (availabilityStartDate !== availabilityEndDate) {
        alert('For a daily lease term, the start date must be the same as the end date.');
        availabilityDatesValid = false;
      }
      break;
    case 'week':
      if (!availabilityStartDate || !availabilityEndDate) {
        alert('Please provide both start and end dates for weekly lease terms.');
        availabilityDatesValid = false;
      }
      const diffInDays = (new Date(availabilityEndDate) - new Date(availabilityStartDate)) / (1000 * 60 * 60 * 24);
      if (diffInDays !== 6) {
        alert('For a weekly lease term, the span between start and end dates must be exactly 7 days.');
        availabilityDatesValid = false;
      }
      break;
    case 'month':
      if (!availabilityStartDate || !availabilityEndDate) {
        alert('Please provide both start and end dates for monthly lease terms.');
        availabilityDatesValid = false;
      }
      const diffInMonths = (new Date(availabilityEndDate).getMonth() + 1) - (new Date(availabilityStartDate).getMonth() + 1);
      if (diffInMonths !== 1) {
        alert('For a monthly lease term, the span between start and end dates must be exactly 1 month.');
        availabilityDatesValid = false;
      }
      break;
    default:
      break;
  }

  // CONDITION: SAVE CHANGES ONLY IF AVAILABILITY DATES ARE VALID
  if (availabilityDatesValid) {
    workspaces[index] = {
      propertyName,
      workspaceType,
      capacity,
      smokingAllowed,
      leaseTerm,
      availabilityStartDate,
      availabilityEndDate,
      price
    };

    saveWorkspacesToLocalStorage(); 
    displayWorkspaces(); 
  }
}


// FUNCTION TO DELETE WORKSPACE
function deleteWorkspace(index) {
  workspaces.splice(index, 1);
  saveWorkspacesToLocalStorage();
  displayWorkspaces();
}


// FUNCTION TO SAVE PROPERTIES IN LOCAL STORAGE
function savePropertiesToLocalStorage() {
  localStorage.setItem('properties', JSON.stringify(properties));
}


// FUNCTION TO SAVE WORKSPACES IN LOCAL STORAGE
function saveWorkspacesToLocalStorage() {
  localStorage.setItem('workspaces', JSON.stringify(workspaces));
}