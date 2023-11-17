import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../context/authContext'; // Update the path
import Swal from 'sweetalert2';

const DetailedView = () => {
    const { propertyId } = useParams();
    const [propertyDetails, setPropertyDetails] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [ownerName, setOwnerName] = useState();

    const fetchPropertyDetails = async () => {
        try {
            const response = await axios.get(`/api/property/fetchproperty/${propertyId}`,
            {
                headers: {
                  'auth-token': token,
                },
              }
            );
            setPropertyDetails(response.data);
            await fetchOwnerName(response.data.owner)
        } catch (error) {
            console.error(error);
        }
    };

    const fetchOwnerName = async (id) => {

        const sellerResponse = await axios.get(`/api/auth/getuser/${id}`, {
            headers: {
              'auth-token': token,
            },
        });

        setOwnerName(sellerResponse.data.name);
    }

    useEffect(() => {
        if (propertyId) {
            fetchPropertyDetails();
        }
    }, [propertyId]);

    const handleBookProperty = async () => {
        const userId = user.id;

        // Prepare the contract data
        const contractData = {
            buyer: userId,
            type: 'buy',
            terms: 'Your contract terms here',
        };

        try {
            // Make a POST request to book the property
            const response = await axios.post(`/api/property/bookproperty/${propertyId}`, contractData);

            // Handle the response, show success or error message to the user
            if(response.data.message === 'You have already booked this property'){
                alert("You already booked this property");
            }
            else{
                Swal.fire('Successfully Requested!', "Book contract/request created successfully", 'success');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleReportSeller = async () => {
        try {
            const userId = user.id;

            // Make a POST request to report the seller
            const response = await axios.post(`/api/property/reportproperty/${propertyId}`, {
                userId: userId,
            });

            // Handle the response, show success or error message to the user
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className='my-2'>
            <div className='flex justify-center'>
                <h1 className='font-bold text-3xl text-[#9041c1] my-2'>Detailed View:</h1>
            </div>
            <div className="flex p-4 border border-black shadow-xl">
                <div className="w-1/2 pr-4">
                    <img src="/Images/bg.jpg" alt="Fail to Load" className="max-w-full h-auto rounded-lg" />
                </div>
                <div className='border-l border-black'></div>
                <div className="w-1/2 flex items-center justify-center">
                    <div className=''>
                    <h1 className='font-bold text-2xl text-[#9041c1] mx-2'>{propertyDetails.title}</h1>
                        <div className='flex'>
                            <h1 className='font-bold text-2xl text-[#9041c1] mx-2'>Seller:</h1>
                            <h1 className='text-2xl'>{ownerName}</h1>
                        </div>
                        <div className='flex'>
                            <h1 className='font-bold text-2xl text-[#9041c1] mx-2'>Location:</h1>
                            <h1 className='text-2xl'>{propertyDetails.location}</h1>
                        </div>
                        <div className='flex'>
                            <h1 className='font-bold text-2xl text-[#9041c1] mx-2'>Description:</h1>
                            <h1 className='text-2xl'>{propertyDetails.description}</h1>
                        </div>
                        <div className='flex'>
                            <h1 className='font-bold text-2xl text-[#9041c1] mx-2'>For:</h1>
                            <h1 className='text-2xl'>{propertyDetails.listing_type}</h1>
                        </div>
                        <div className='flex'>
                            <h1 className='font-bold text-2xl text-[#9041c1] mx-2'>Availability:</h1>
                            <h1 className='text-2xl'>{propertyDetails.status}</h1>
                        </div>
                        <div className='flex'>
                            <h1 className='font-bold text-2xl text-[#9041c1] mx-2'>Date of Listing:</h1>
                            <h1 className='text-2xl'>{propertyDetails.dateOfListing}</h1>
                        </div>
                        <div className='flex'>
                            <h1 className='font-bold text-2xl text-[#9041c1] mx-2'>Price:</h1>
                            <h1 className='text-2xl'>$ {propertyDetails.price}</h1>
                        </div>
                        <div className='flex mt-8'>
                            <button className='rounded-lg bg-[#9041c1] py-2 px-4 text-white mr-3' onClick={handleBookProperty}>
                                Book
                            </button>
                            <button className='rounded-lg bg-[#9041c1] py-2 px-4 text-white' onClick={handleReportSeller}>
                                Report Seller
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailedView;