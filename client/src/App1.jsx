import React, { useState, useCallback, useMemo } from 'react'; // Added useCallback and useMemo
import './style.css';
import axios from 'axios';
import debounce from 'lodash.debounce'; // Added lodash.debounce

function SubscriptionTracker() {
    const [phone, setPhone] = useState(''); // Changed to lower case 'phone' for consistency
    const [finalData, setFinalData] = useState({}); // Changed from an empty array to an empty object

    // Function to calculate the subscription valid till date
    const calculateSubscriptionValidTill = useCallback((startDate) => { // Used useCallback to memoize the function
        if (!startDate) return '';
        const start = new Date(startDate);
        const validTill = new Date(start);
        validTill.setDate(start.getDate() + 29);
        return validTill.toDateString();
    }, []);

    // Debounced API call function
    const debouncedGetSubscription = useMemo(() => debounce(async (phone) => { // Used useMemo to memoize the debounced function
        if (phone.length === 10) {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/get/${phone}`);
                setFinalData(response.data);
            } catch (error) {
                alert(error.response.data);
            }
        }
    }, 300), []); // debounce with 300ms delay

    // Handle phone number change
    const handlePhoneChange = (e) => {
        const value = e.target.value;
        setPhone(value);
    };

    // Handle form submission
    const handleSubmit = (e) => { // Changed to handle form submission with form's onSubmit
        e.preventDefault();
        if (phone.length !== 10) {
            alert("Please enter a valid phone number");
        } else {
            debouncedGetSubscription(phone); // Called debounced function directly
        }
    };

    return (
        <div className="container">
            <div className="header-box-headings">
                <h1>CARDHO</h1>
                <span className="h1-span">SUBSCRIPTION TRACKER</span>
            </div>
            <form className="form" onSubmit={handleSubmit}> {/* Changed to form element and added onSubmit */}
                <label htmlFor="mobile-number">Registered Mobile Number</label>
                <input
                    type="number"
                    id="mobile-number"
                    placeholder="Enter registered mobile number"
                    value={phone} // Updated state variable name
                    onChange={handlePhoneChange}
                    required
                />
                <button type="submit">Submit</button> {/* Changed button type to submit */}
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    placeholder="---"
                    name="name"
                    disabled
                    value={finalData.Name || ''} // Updated state variable name
                    required
                />
                <label htmlFor="start-date">Subscription Start Date</label>
                <input
                    type="text"
                    id="start-date"
                    placeholder="---"
                    name="start-date"
                    disabled
                    value={finalData.StartDate ? finalData.StartDate.split("T")[0] : ""} // Updated state variable name and default value logic
                    required
                />
            </form>
            <div id="subscription-details">
                {finalData.StartDate && ( // Updated state variable name
                    <>
                        <h2>Subscription Details</h2>
                        <p>Car: {finalData.Car}</p>
                        <p>Exterior Cleaning: Daily</p>
                        <div> {/* Changed to a div */}
                            <p>Interior Cleaning Dates:</p>
                            <ol>
                                <li>{finalData.interriorfirst ? finalData.interriorfirst.split("T")[0] : "N/A"}</li>
                                <li>{finalData.interriorsecond ? finalData.interriorsecond.split("T")[0] : "N/A"}</li>
                                <li>{finalData.interriorthird ? finalData.interriorthird.split("T")[0] : "N/A"}</li>
                                <li>{finalData.interriorfourth ? finalData.interriorfourth.split("T")[0] : "N/A"}</li>
                            </ol>
                        </div>
                        <p>{`Pressure Wash: ${finalData.PressureWash ? finalData.PressureWash.split("T")[0] : "N/A"}`}</p>
                        <p>{`Valid Till: ${finalData.StartDate ? calculateSubscriptionValidTill(finalData.StartDate.split("T")[0]) : "N/A"}`}</p>
                    </>
                )}
            </div>
        </div>
    );
}

export default SubscriptionTracker;
