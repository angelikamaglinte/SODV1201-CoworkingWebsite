let properties = [];
let workspaces = [];


window.onload = function () {
  // Load properties and workspaces from local storage when the page loads
  if (localStorage.getItem('properties')) {
    properties = JSON.parse(localStorage.getItem('properties'));
  }
  if (localStorage.getItem('workspaces')) {
    workspaces = JSON.parse(localStorage.getItem('workspaces'));
  }
  displayProperties(); // Call displayProperties function after loading properties

  const storedSearchQuery = localStorage.getItem('searchQuery');
  if (storedSearchQuery) {
    document.getElementById('workspaceSearch').value = storedSearchQuery;
    searchWorkspaces(); // Apply the search filter
  }
};

// Function to set Square Feet in Property Form only 
function setSquareFeet(value) {
  document.getElementById('squareFeet').value = value;
  document.getElementById('selectedSquareFeet').innerText = `Square Feet: ${value} sq ft`;
}

// Validate and Add Property Function
// function validateAndAddProperty() {
//   const address = document.getElementById('address').value;
//   const neighborhood = document.getElementById('neighborhood').value;
//   const squareFeet = document.getElementById('squareFeet').value;
//   const parkingGarage = document.getElementById('parkingGarage').checked;
//   const publicTranspo = document.getElementById('publicTranspo').checked;

//   // Validate inputs
//   if (!address || !neighborhood || !squareFeet) {
//     const validationModal = document.getElementById('validationModal');
//     validationModal.style.display = 'block';
//     document.getElementById('closeValidationBtn').onclick = function () {
//       validationModal.style.display = 'none';
//     };
//     return;
//   }

//   else {
//     const successfulListing = document.getElementById('successfulListing');
//     successfulListing.style.display = 'block';
//     document.getElementById('closeSuccessAddedPropertyBtn').onclick = function () { // Changed to closeSuccessBtn
//       successfulListing.style.display = 'none';
//     };
//   }

//   const property = {
//     address,
//     neighborhood,
//     squareFeet,
//     parkingGarage,
//     publicTranspo
//   };

//   properties.push(property);
//   savePropertiesToLocalStorage();
//   displayProperties();
// }

// Validate and Add Property Function
function validateAndAddProperty() {
  const addressInput = document.getElementById('address');
  const neighborhoodInput = document.getElementById('neighborhood');
  const squareFeetInput = document.getElementById('squareFeet');
  const parkingGarageInput = document.getElementById('parkingGarage');
  const publicTranspoInput = document.getElementById('publicTranspo');

  // Get input values
  const address = addressInput.value;
  const neighborhood = neighborhoodInput.value;
  const squareFeet = squareFeetInput.value;
  const parkingGarage = parkingGarageInput.checked;
  const publicTranspo = publicTranspoInput.checked;

  // Validate inputs
  if (!address || !neighborhood || !squareFeet) {
    const validationModal = document.getElementById('validationModal');
    validationModal.style.display = 'block';
    document.getElementById('closeValidationBtn').onclick = function () {
      validationModal.style.display = 'none';
    };
    return;
  }

  // Add property
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

  // Clear input fields
  addressInput.value = '';
  neighborhoodInput.value = '';
  squareFeetInput.value = '';
  parkingGarageInput.checked = false;
  publicTranspoInput.checked = false;

  // Show success message
  const successfulListing = document.getElementById('successfulListing');
  successfulListing.style.display = 'block';
  document.getElementById('closeSuccessAddedPropertyBtn').onclick = function () {
    successfulListing.style.display = 'none';
  };
}


// Display Properties Function
function displayProperties() {
  const propertyList = document.getElementById('propertyList');
  propertyList.innerHTML = '';

  const propertyNameDropdown = document.getElementById('propertyName');
  propertyNameDropdown.innerHTML = ''; // Clear existing options

  properties.forEach((property, index) => {
    const propertyDiv = document.createElement('div');
    propertyDiv.classList.add('property');

    const propertyInfo = `
            <p><strong>Address:</strong> ${property.address}</p>
            <p><strong>Neighborhood:</strong> ${property.neighborhood}</p>
            <p><strong>Square Feet:</strong> ${property.squareFeet}</p>
            <p><strong>Parking Garage:</strong> ${property.parkingGarage ? 'Yes' : 'No'}</p>
            <p><strong>Near Public Transportation:</strong> ${property.publicTranspo ? 'Yes' : 'No'}</p>
          `;

    // Create option for dropdown list
    const option = document.createElement('option');
    option.text = property.address;
    option.value = index; // Store index as value for later reference
    propertyNameDropdown.add(option);

    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update Property';
    updateButton.onclick = () => openPropertyEditModal(index);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Property';
    deleteButton.onclick = () => deleteProperty(index);

    propertyDiv.innerHTML = propertyInfo;
    propertyDiv.appendChild(updateButton);
    propertyDiv.appendChild(deleteButton);
    propertyList.appendChild(propertyDiv);
  });

  displayWorkspaces(); // Call displayWorkspaces function after loading workspaces
}


// Edit Property Pop Up Modal Function
// function openPropertyEditModal(index) {
//   const property = properties[index];
//   document.getElementById('editAddress').value = property.address;
//   document.getElementById('editNeighborhood').value = property.neighborhood;
//   document.getElementById('editSquareFeet').value = property.squareFeet; // Set selected square feet using the value property


//   // Set the selected square feet value in the pop-up modal
//   const selectedSquareFeet = property.squareFeet;
//   document.getElementById('editSquareFeet').innerText = selectedSquareFeet;

//   const modal = document.getElementById('propertyEditModal');
//   modal.style.display = 'block';

//   document.getElementById('savePropertyChangesBtn').onclick = function () {
//     savePropertyChanges(index);
//     modal.style.display = 'none';
//   };

//   const span = document.getElementsByClassName('close')[0];
//   span.onclick = function () {
//     modal.style.display = 'none';
//   };

//   window.onclick = function (event) {
//     if (event.target == modal) {
//       modal.style.display = 'none';
//     }
//   };
// }


function openPropertyEditModal(index) {
  const property = properties[index];
  document.getElementById('editAddress').value = property.address;
  document.getElementById('editNeighborhood').value = property.neighborhood;
  document.getElementById('editSquareFeet').value = property.squareFeet; // Set selected square feet using the value property

  // Set the selected square feet value in the pop-up modal
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

function validatePropertyChanges() {
  const address = document.getElementById('editAddress').value;
  const neighborhood = document.getElementById('editNeighborhood').value;

  if (!address || !neighborhood) {
    alert('Please fill out all required fields.');
    return false;
  }
  return true;
}



// Save Changes in Edit Property Modal Function
function savePropertyChanges(index) {
  const updatedAddress = document.getElementById('editAddress').value;
  const updatedNeighborhood = document.getElementById('editNeighborhood').value;
  const updatedSquareFeet = document.getElementById('editSquareFeet').value; // Get selected square feet using the value property

  const updatedParkingGarage = document.getElementById('editParkingGarage').checked;
  const updatedPublicTranspo = document.getElementById('editPublicTranspo').checked;

  properties[index] = {
    address: updatedAddress,
    neighborhood: updatedNeighborhood,
    squareFeet: updatedSquareFeet,
    parkingGarage: updatedParkingGarage,
    publicTranspo: updatedPublicTranspo
  };

  savePropertiesToLocalStorage(); // Save changes to local storage
  displayProperties(); // Update the displayed properties
}

// Delete Property Function
function deleteProperty(index) {
  properties.splice(index, 1);
  savePropertiesToLocalStorage();
  displayProperties();
}

function setEditSquareFeet(value) {
  document.getElementById('editSquareFeet').value = value;
}

// function setCapacity(value) {
//   document.getElementById('capacity').value = value;
//   document.getElementById('selectedCapacity').innerText = `Capacity: ${value} person/s`;
// }

function setCapacity(value) {
  document.getElementById('capacity').value = value;
  const editCapacityText = document.getElementById('capacityText');
  capacityText.innerText = `${value} person/s`;
}


// function editSetCapacity(value) {
//   document.getElementById('editCapacity').value = value;
//   document.getElementById('editSelectedCapacity').innerText = `Capacity: ${value} person/s`;
// }

function editSetCapacity(value) {
  document.getElementById('editCapacity').value = value;
  const editCapacityText = document.getElementById('editCapacityText');
  editCapacityText.innerText = `${value} person/s`;
}



// function setLeaseTerm(value) {
//   document.getElementById('leaseTerm').value = value;
//   document.getElementById('selectedLeaseTerm').innerText = `Lease Term: ${value}`;
// }

function setLeaseTerm(value) {
  document.getElementById('leaseTerm').value = value;
  const leaseTermText = document.getElementById('leaseTermText');
  leaseTermText.innerText = value;
}
// 

// Edit Lease Term in Workspace 
// function editSetLeaseTerm(value) {
//   document.getElementById('editLeaseTerm').value = value;
//   document.getElementById('editSelectedLeaseTerm').innerText = `Lease Term: ${value}`;
// }

function editSetLeaseTerm(value) {
  document.getElementById('editLeaseTerm').value = value;
  const leaseTermText = document.getElementById('editLeaseTermText');
  editLeaseTermText.innerText = value;
}


// function setEditCapacity(value) {
//   document.getElementById('editCapacity').value = value;
//   document.getElementById('editSelectedCapacity').innerText = `Capacity: ${value} person/s`;
// }

function validateAndAddWorkspace() {
  const propertyNameIndex = document.getElementById('propertyName').value;
  const property = properties[propertyNameIndex];

  // Validate inputs for workspace
  if (!property) {
    // alert('Please select a property.');
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
    return;
  }

  // If no alerts were triggered during lease term validation and all fields are filled out correctly
  if (!leaseTermAlertTriggered) {
    const successfulWorkspaceListing = document.getElementById('successfulWorkspaceListing');
    successfulWorkspaceListing.style.display = 'block';
    document.getElementById('closeSuccessWorkspaceAddedBtn').onclick = function () {
      successfulWorkspaceListing.style.display = 'none';
    };
  } else {
    // If an alert was triggered during lease term validation
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

  // Add availability dates based on lease term
  // switch (leaseTerm) {
  //   case 'day':
  //     workspace.availabilityDate = availabilityStartDate;
  //     break;
  //   case 'week':
  //   case 'month':
  //     workspace.availabilityStartDate = availabilityStartDate;
  //     workspace.availabilityEndDate = availabilityEndDate;
  //     break;
  //   default:
  //     break;
  // }

  workspaces.push(workspace); // Add workspace to the list
  saveWorkspacesToLocalStorage();
  displayWorkspaces();
}




function displayWorkspaces() {
  const workspaceList = document.getElementById('workspaceList');
  workspaceList.innerHTML = '';

  workspaces.forEach((workspace, index) => {
    const propertyIndex = properties.findIndex(property => property.address === workspace.propertyName);
    let neighborhood = 'Neighborhood information not available'; // Default value if neighborhood is not found

    if (propertyIndex !== -1) {
      neighborhood = properties[propertyIndex].neighborhood;
    }

    const workspaceDiv = document.createElement('div');
    workspaceDiv.classList.add('workspace');

    // let availabilityInfo = '';
    // if (workspace.leaseTerm === 'day') {
    //   availabilityInfo = `<p><strong>Availability Date:</strong> ${workspace.availabilityDate}</p>`;
    // } else if (workspace.leaseTerm === 'week' || workspace.leaseTerm === 'month') {
    //   availabilityInfo = `<p><strong>Availability Start Date:</strong> ${workspace.availabilityStartDate}</p>
    //                        <p><strong>Availability End Date:</strong> ${workspace.availabilityEndDate}</p>`;
    // }

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


// function openWorkspaceModal(index) {
//   const workspace = workspaces[index];
//   document.getElementById('editPropertyName').value = workspace.propertyName;
//   document.getElementById('editWorkspaceType').value = workspace.workspaceType;
//   document.getElementById('editCapacity').value = workspace.capacity;

//   const modal = document.getElementById('myModal');
//   modal.style.display = 'block';


//   document.getElementById('saveWorkspaceChangesBtn').onclick = function () {
//     saveWorkspaceChanges(index);
//     modal.style.display = 'none';
//   };

//   const span = document.getElementsByClassName('close')[0];
//   span.onclick = function () {
//     modal.style.display = 'none';
//   };

//   window.onclick = function (event) {
//     if (event.target == modal) {
//       modal.style.display = 'none';
//     }
//   };

// }


// 2ND VERSION
// function openWorkspaceModal(index) {
//   const workspace = workspaces[index];
//   document.getElementById('editPropertyName').value = workspace.propertyName;
//   document.getElementById('editWorkspaceType').value = workspace.workspaceType;
//   document.getElementById('editCapacity').value = workspace.capacity;

//   const modal = document.getElementById('myModal');
//   modal.style.display = 'block';

//   document.getElementById('saveWorkspaceChangesBtn').onclick = function () {
//     if (validateWorkspaceChanges()) {
//       saveWorkspaceChanges(index);
//       modal.style.display = 'none';
//     }
//   };

//   const span = document.getElementsByClassName('close')[0];
//   span.onclick = function () {
//     modal.style.display = 'none';
//   };

//   window.onclick = function (event) {
//     if (event.target == modal) {
//       modal.style.display = 'none';
//     }
//   };

// }

// function validateWorkspaceChanges() {
//   const workspaceType = document.getElementById('editWorkspaceType').value;
//   const leaseTerm = document.getElementById('editLeaseTerm').value;
//   const availabilityStartDate = document.getElementById('editAvailabilityStartDate').value;
//   const availabilityEndDate = document.getElementById('editAvailabilityEndDate').value;
//   const price = document.getElementById('editPrice').value;

//   if (!workspaceType || !leaseTerm || !availabilityStartDate || !availabilityEndDate || !price) {
//     alert('Please fill out all required fields.');
//     return false;
//   }
//   return true;
// }

function openWorkspaceModal(index) {
  const workspace = workspaces[index];
  document.getElementById('editPropertyName').value = workspace.propertyName;
  document.getElementById('editWorkspaceType').value = workspace.workspaceType;
  document.getElementById('editCapacity').value = workspace.capacity;
  document.getElementById('editLeaseTerm').value = workspace.leaseTerm; // Set the value of editLeaseTerm


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

  // If no alerts were triggered during lease term validation and all fields are filled out correctly
  // if (!leaseTermAlertTriggered) {
  //   const successfulWorkspaceListing = document.getElementById('successfulWorkspaceListing');
  //   successfulWorkspaceListing.style.display = 'block';
  //   document.getElementById('closeSuccessWorkspaceAddedBtn').onclick = function () {
  //     successfulWorkspaceListing.style.display = 'none';
  //   };
  // } else {
  //   // If an alert was triggered during lease term validation
  //   const validationModal = document.getElementById('validationModal');
  //   validationModal.style.display = 'block';
  //   document.getElementById('closeValidationBtn').onclick = function () {
  //     validationModal.style.display = 'none';
  //   };
  // }

  return true; // Return true if all validations pass
}





// function saveWorkspaceChanges(index) {
//   workspaces[index] = {
//     propertyName: document.getElementById('editPropertyName').value,
//     workspaceType: document.getElementById('editWorkspaceType').value,
//     capacity: document.getElementById('editCapacity').value,
//     smokingAllowed: document.getElementById('editSmokingAllowed').checked,
//     leaseTerm: document.getElementById('editLeaseTerm').value,
//     availabilityStartDate: document.getElementById('editAvailabilityStartDate').value,
//     availabilityEndDate: document.getElementById('editAvailabilityEndDate').value,
//     price: document.getElementById('editPrice').value
//   };

//   saveWorkspacesToLocalStorage(); // Save changes to local storage
//   displayWorkspaces(); // Update the displayed workspaces
// }

function saveWorkspaceChanges(index) {
  const propertyName = document.getElementById('editPropertyName').value;
  const workspaceType = document.getElementById('editWorkspaceType').value;
  const capacity = document.getElementById('editCapacity').value;
  const smokingAllowed = document.getElementById('editSmokingAllowed').checked;
  const leaseTerm = document.getElementById('editLeaseTerm').value;
  const availabilityStartDate = document.getElementById('editAvailabilityStartDate').value;
  const availabilityEndDate = document.getElementById('editAvailabilityEndDate').value;
  const price = document.getElementById('editPrice').value;

  // Validate availability dates
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

  // Save changes only if availability dates are valid
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

    saveWorkspacesToLocalStorage(); // Save changes to local storage
    displayWorkspaces(); // Update the displayed workspaces
  }
}






function deleteWorkspace(index) {
  workspaces.splice(index, 1);
  saveWorkspacesToLocalStorage();
  displayWorkspaces();
}

function savePropertiesToLocalStorage() {
  localStorage.setItem('properties', JSON.stringify(properties));
}

function saveWorkspacesToLocalStorage() {
  localStorage.setItem('workspaces', JSON.stringify(workspaces));
}









