import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from 'axios';
import Swal from 'sweetalert2';

const SellingHistory = () => {
  const [userProperties, setUserProperties] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newProperty, setNewProperty] = useState({
    title: "",
    price: 0,
    location: "",
    listing_type: "sell",
    description: "",
    status: ""
  });
  const [editingProperty, setEditingProperty] = useState(null);

  const fetchUserProperties = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/property/fetchmylistings', {
        method: 'GET',
        headers: {
          'auth-token': token
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUserProperties(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserProperties();
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAddProperty = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        "/api/property/addnew",
        {
          title: newProperty.title,
          description: newProperty.description,
          location: newProperty.location,
          price: newProperty.price,
          listing_type: newProperty.listing_type,
          status: newProperty.status,
        },
        {
          headers: {
            'auth-token': token,
          },
        }
      );
      closeModal();
      fetchUserProperties();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAlert = (propertyId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteProperty(propertyId);
        Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
      }
    });
  };

  const handleDeleteProperty = async (propertyId) => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.delete(`/api/property/deleteproperty/${propertyId}`,
      {
        headers: {
          'auth-token': token,
        },
      }
      );

      fetchUserProperties();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (property) => {
    setEditingProperty(property._id);
    // Set initial values for the editing property
    setNewProperty({
      title: property.title,
      price: property.price,
      location: property.location,
      listing_type: property.listing_type,
      description: property.description,
      status: property.status,
    });
  };

  const handleUpdate = async (propertyId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `/api/property/updateproperty/${propertyId}`,
        {
          title: newProperty.title,
          description: newProperty.description,
          location: newProperty.location,
          price: newProperty.price,
          listing_type: newProperty.listing_type,
          status: newProperty.status,
        },
        {
          headers: {
            'auth-token': token,
          },
        }
      );
      setEditingProperty(null);
      fetchUserProperties();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    setEditingProperty(null);
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-semibold text-[#9041c1] mb-6">
        My Listed Properties
      </h1>
      <button
        className="bg-[#9041c1] text-white py-2 px-4 rounded-lg shadow-md mb-4"
        onClick={openModal}
      >
        Add Property
      </button>
      <table className="w-full bg-white border border-gray-300 shadow-md rounded-lg">
        <thead className="bg-[#9041c1] text-white">
          <tr>
            <th className="py-2 px-4 text-left">Property Name</th>
            <th className="py-2 px-4 text-left">Price</th>
            <th className="py-2 px-4 text-left">Location</th>
            <th className="py-2 px-4 text-left">Description</th>
            <th className="py-2 px-4 text-left">Date of Listing</th>
            <th className="py-2 px-4 text-left">Listing Type</th>
            <th className="py-2 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {userProperties.map((property, index) => (
            <tr key={index}>
              <td className="py-2 px-4">
                {editingProperty === property._id ? (
                  <input
                    type="text"
                    value={newProperty.title}
                    onChange={(e) =>
                      setNewProperty({ ...newProperty, title: e.target.value })
                    }
                  />
                ) : (
                  property.title
                )}
              </td>
              <td className="py-2 px-4">
                {editingProperty === property._id ? (
                  <input
                    type="text"
                    value={newProperty.price}
                    onChange={(e) =>
                      setNewProperty({ ...newProperty, price: e.target.value })
                    }
                  />
                ) : (
                  property.price
                )}
              </td>
              <td className="py-2 px-4">
                {editingProperty === property._id ? (
                  <input
                    type="text"
                    value={newProperty.location}
                    onChange={(e) =>
                      setNewProperty({ ...newProperty, location: e.target.value })
                    }
                  />
                ) : (
                  property.location
                )}
              </td>
              <td className="py-2 px-4">
                {editingProperty === property._id ? (
                  <input
                    type="text"
                    value={newProperty.description}
                    onChange={(e) =>
                      setNewProperty({ ...newProperty, description: e.target.value })
                    }
                  />
                ) : (
                  property.description
                )}
              </td>
              <td className="py-2 px-4">{property.dateOfListing}</td>
              <td className="py-2 px-4">
                {editingProperty === property._id ? (
                  <select
                    value={newProperty.listing_type}
                    onChange={(e) =>
                      setNewProperty({
                        ...newProperty,
                        listing_type: e.target.value,
                      })
                    }
                  >
                    <option value="sell">sell</option>
                    <option value="rent">rent</option>
                  </select>
                ) : (
                  property.listing_type
                )}
              </td>
              <td className="py-2 px-4">
                {editingProperty === property._id ? (
                  <>
                    <button
                      className="bg-green-500 text-white rounded-lg px-2"
                      onClick={() => handleUpdate(property._id)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-white rounded-lg px-2 ml-2"
                      onClick={() => handleCancelEdit()}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-blue-500 text-white rounded-lg px-2"
                      onClick={() => handleEdit(property)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white rounded-lg px-2 ml-2"
                      onClick={() => deleteAlert(property._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Property Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>Add Property</h2>
        <form className="mt-2">
          <input
            type="text"
            placeholder="Title"
            value={newProperty.title}
            onChange={(e) =>
              setNewProperty({ ...newProperty, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Price"
            value={newProperty.price}
            onChange={(e) => {
              // Ensure that the input contains only numeric characters
              const numericValue = e.target.value.replace(/\D/g, "");

              setNewProperty({ ...newProperty, price: numericValue });
            }}
          />

          <input
            type="text"
            placeholder="Location"
            value={newProperty.location}
            onChange={(e) =>
              setNewProperty({ ...newProperty, location: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description"
            value={newProperty.description}
            onChange={(e) =>
              setNewProperty({ ...newProperty, description: e.target.value })
            }
          />
          <div className="flex mt-2">
            <div className="mr-4">
              <label>
                Listing Type:
                <select
                  value={newProperty.listing_type}
                  onChange={(e) => 
                    setNewProperty({
                      ...newProperty,
                      listing_type: e.target.value,
                    })
                  }
                >
                  <option value="sell">sell</option>
                  <option value="rent">rent</option>
                </select>
              </label>
            </div>
            <div>
            <label>
              Status:
              <select
                value={newProperty.status}
                onChange={(e) =>
                  setNewProperty({
                    ...newProperty,
                    status: e.target.value,
                  })
                }
              >
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </label>
            </div>
          </div>
          <button className="bg-green-500 rounded-lg p-2 m-2" onClick={handleAddProperty}>Add Property</button>
          <button className="bg-red-500 rounded-lg p-2 m-2" onClick={closeModal}>Cancel</button>
        </form>
      </Modal>
    </div>
  );
};

export default SellingHistory;
