import React from 'react';
import EscapeStr from './mysqlConvertChar';
import Axios from "axios";
import './UserProfile.css';

const fetch = require('node-fetch');
var taxData = [];
var lastSix = '';
var taxtype = '';
var taxrate = 0;
const companyID = localStorage.getItem('companyID');
var taxID = localStorage.getItem('taxID');

class GstEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: {},
            errors: {},
            data: [],
            number: 0,
            state: {},
            name: [],
            taxType: 'standard',
            // Add these to track form data
            taxID: '',
            taxCode: '',
            taxDescription: '',
            remark: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleTextInputChange = this.handleTextInputChange.bind(this);
        this.formatInput = this.formatInput.bind(this);
        this.allowOnlyNumericsOrDigits = this.allowOnlyNumericsOrDigits.bind(this);
        this.taxIDEl = React.createRef();
        this.taxTypeEl = React.createRef();
        this.taxCodeEl = React.createRef();
        this.taxDescriptionEl = React.createRef();
        this.taxRateEl = React.createRef();
        this.remarkEl = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
        this.handleTaxTypeChange = this.handleTaxTypeChange.bind(this);
    }

    componentDidMount() {
        taxID = localStorage.getItem('taxID');
        const body = {
            companyID: companyID,
            taxID: taxID,
        };

        Axios({
            method: 'post',
            url: '/api/taxData',
            data: body
        })
        .then(res => {
            console.log('backend response: ', res.data);
            taxData = res.data;
            
            if (taxData && taxData.length > 0) {
                const data = taxData[0];
                
                // Update state with all form data
                this.setState({
                    taxID: data.taxID || '',
                    taxCode: data.taxCode || '',
                    taxDescription: data.taxDescription || '',
                    remark: data.remark || '',
                    number: parseFloat(data.taxRate || 0).toFixed(2)
                });

                // Set refs for any non-React controlled fields
                this.taxIDEl.current.value = data.taxID || '';

                // Handle tax type mapping
                taxtype = data.taxType || '';
                this.setState({ taxtype: taxtype });

                // Map backend taxType to radio button values
                const taxTypeMap = {
                    'INPUT': 'standard',
                    'STANDARD': 'standard',
                    'EXEMPT': 'exempt',
                    'ZERO': 'zero',
                    'ZERO_RATED': 'zero',
                    'FOT': 'standard'
                };
                
                const mappedType = taxTypeMap[taxtype] || 'standard';
                this.setState({ taxType: mappedType });
            }
        })
        .catch(function(error) {
            console.error('Error fetching tax data:', error);
            alert('Error loading tax data: ' + (error.message || 'Unknown error'));
        });
    }

    // New handler for text inputs
    handleTextInputChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleTaxTypeChange(event) {
        const value = event.target.value;
        this.setState({ taxType: value });
        
        // Map radio value back to backend value if needed
        const reverseMap = {
            'standard': 'STANDARD',
            'exempt': 'EXEMPT',
            'zero': 'ZERO'
        };
        this.setState({ taxtype: reverseMap[value] || value });
    }

    handleChangeType(event) {
        this.setState({ taxtype: event.target.value });
        taxtype = event.target.value;
        if (taxtype === 'FOT') {
            this.setState({ number: '0.00' });
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.validate()) {
            console.log('Submitting data:', this.state);

            const data = {
                companyID: EscapeStr(companyID),
                taxID: EscapeStr(this.state.taxID || this.taxIDEl.current.value),
                taxType: EscapeStr(this.state.taxtype || 'STANDARD'),
                taxCode: EscapeStr(this.state.taxCode || this.taxCodeEl.current.value),
                taxDescription: EscapeStr(this.state.taxDescription || this.taxDescriptionEl.current.value),
                taxRate: EscapeStr(this.state.number),
                remark: EscapeStr(this.state.remark || this.remarkEl.current.value),
            };

            fetch('/api/taxUpdate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(function(response) {
                return response.text();
            })
            .then(function(text) {
                let lastSix = text.substr(text.length - 7);
                if (lastSix === 'Success') {
                    localStorage.setItem('taxID', '');
                    window.location.href = 'gstProfile';
                } else {
                    alert('Update failed. Please try again.');
                }
            })
            .catch(function(error) {
                alert('Error updating: ' + error.message);
            });
        }
    }

    validate() {
        let str = this.state.taxID || this.taxIDEl.current.value;
        let desc = this.state.taxDescription || this.taxDescriptionEl.current.value;
        let gRate = parseFloat(this.state.number);

        if (!str || str.length < 3) {
            alert("Tax ID must at least 3 digits of length");
            return false;
        }

        if (!desc || desc.length === 0) {
            alert("Tax Description must not be empty");
            return false;
        }

        if (isNaN(gRate) || gRate > 999) {
            alert("Tax Rate must not be more than 999.00");
            return false;
        }

        if (gRate < 0) {
            alert("Tax Rate must not be Negative");
            return false;
        }

        return true;
    }

    allowOnlyNumericsOrDigits(e) {
        e = (e) ? e : window.event;
        const charCode = e.which ? e.which : e.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            this.setState({ error: 'OOPs! Only numeric values or digits allowed' });
        }
    }

    handleInputChange(event) {
        console.log('Number input changed:', event.target.value);
        this.setState({
            number: event.target.value
        });
    }

    formatInput() {
        const num = this.state.number;
        if (num && !isNaN(num)) {
            this.setState({
                number: parseFloat(num).toFixed(2)
            });
        }
    }

    render() {
        const mystyle = {
            color: "BLACK",
            backgroundColor: "#ffffff",
            paddingLeft: "300px",
            alignItems: "left",
            fontFamily: "Arial",
            marginLeft: '150px',
        };

        const subStyle = {
            color: "white",
            backgroundColor: "blue",
            padding: "10px 15px 10px 10px",
            fontFamily: "Arial",
            border: '2px solid black',
            borderRadius: '14px',
            marginLeft: '450px',
            cursor: 'pointer'
        };

        const radioContainerStyle = {
            display: 'flex',
            alignItems: 'center',
            gap: '25px',
            padding: '12px 20px',
            paddingLeft: '100px',
            marginBottom: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e9ecef'
        };

        const radioOptionStyle = (color, isChecked) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            padding: '6px 12px',
            borderRadius: '6px',
            backgroundColor: isChecked ? `${color}20` : 'transparent',
            transition: 'all 0.2s ease',
            fontWeight: isChecked ? '600' : '400',
            color: isChecked ? color : '#333'
        });

        const radioInputStyle = (color) => ({
            width: '20px',
            height: '20px',
            accentColor: color,
            cursor: 'pointer',
            margin: '0',
            flexShrink: '0'
        });

        const headerStyle = {
            fontWeight: 'bold',
            fontSize: '25px',
            marginRight: '10px',
            color: '#333',
            marginBottom: '0',
        };

        const colors = {
            standard: '#1976d2',
            exempt: '#2e7d32',
            zero: '#ed6c02'
        };

        return (
            <form style={mystyle} onSubmit={this.handleSubmit}>
                <fieldset>
                    <label style={{ paddingLeft: '300px' }}>
                        <h1 style={{ width: '2000px' }}>Edit Goods And Services Tax (GST) Profile</h1>
                    </label>

                    <label style={{ paddingLeft: '100px', paddingRight: '50px' }}>
                        GST ID :
                        <input 
                            className="text-uppercase" 
                            minLength={3} 
                            maxLength={10} 
                            ref={this.taxIDEl} 
                            name="taxID"
                            value={this.state.taxID}
                            onChange={this.handleTextInputChange}
                            required={true} 
                            readOnly={true}
                        />
                    </label>

                    <label style={{ paddingLeft: '100px', paddingRight: '30px' }}>
                        GST Description :
                        <input 
                            type="text" 
                            maxLength={100} 
                            ref={this.taxDescriptionEl}
                            name="taxDescription"
                            value={this.state.taxDescription}
                            onChange={this.handleTextInputChange}
                            required={true} 
                        />
                    </label>

                    <p></p>

                    <div style={radioContainerStyle}>
                        <label style={headerStyle}>Tax Type:</label>

                        <label 
                            style={radioOptionStyle(
                                colors.standard,
                                this.state.taxType === 'standard'
                            )}
                        >
                            <input
                                type="radio"
                                name="taxType"
                                value="standard"
                                checked={this.state.taxType === 'standard'}
                                onChange={this.handleTaxTypeChange}
                                style={radioInputStyle(colors.standard)}
                            />
                            <span>Standard</span>
                        </label>

                        <label 
                            style={radioOptionStyle(
                                colors.exempt,
                                this.state.taxType === 'exempt'
                            )}
                        >
                            <input
                                type="radio"
                                name="taxType"
                                value="exempt"
                                checked={this.state.taxType === 'exempt'}
                                onChange={this.handleTaxTypeChange}
                                style={radioInputStyle(colors.exempt)}
                            />
                            <span>Exempt</span>
                        </label>

                        <label 
                            style={radioOptionStyle(
                                colors.zero,
                                this.state.taxType === 'zero'
                            )}
                        >
                            <input
                                type="radio"
                                name="taxType"
                                value="zero"
                                checked={this.state.taxType === 'zero'}
                                onChange={this.handleTaxTypeChange}
                                style={radioInputStyle(colors.zero)}
                            />
                            <span>Zero Rated</span>
                        </label>
                    </div>

                    <label style={{ paddingLeft: '100px', paddingRight: '10px' }}>
                        Tax Code :
                        <input 
                            className="text-uppercase" 
                            style={{ width: '250px' }} 
                            type="text" 
                            minLength={2} 
                            maxLength={20} 
                            ref={this.taxCodeEl}
                            name="taxCode"
                            value={this.state.taxCode}
                            onChange={this.handleTextInputChange}
                            required={true} 
                        />
                    </label>

                    <label style={{ paddingLeft: '100px', paddingRight: '165px' }}>
                        Tax Rate (%) :
                        <input 
                            type="number" 
                            value={this.state.number}
                            onChange={this.handleInputChange}
                            onBlur={this.formatInput} 
                            maxLength={5} 
                            ref={this.taxRateEl} 
                            name="taxrate" 
                            required={false} 
                            step="0.01"
                        />
                    </label>

                    <label style={{ paddingLeft: '100px', paddingRight: '10px' }}>
                        Remark :
                        <input 
                            type="text" 
                            maxLength={100} 
                            ref={this.remarkEl}
                            name="remark"
                            value={this.state.remark}
                            onChange={this.handleTextInputChange}
                            required={false} 
                        />
                    </label>
                </fieldset>

                <p>
                    <button 
                        type="submit" 
                        className="btn-submit"
                        style={{ 
                            backgroundColor: 'red',
                            color: 'white',
                            padding: '12px 15px',
                            border: '2px solid #070b11ff',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        <i className="fa fa-save" style={{ marginRight: '8px', color: 'white' }}></i>
                        Update
                    </button>
                    <button 
                        style={subStyle} 
                        onClick={() => window.location.href = 'gstProfile'}
                    >
                        <i className="fa fa-backward" style={{ color: 'white' }}></i>
                        Back
                    </button>
                </p>
            </form>
        );
    }
}

export default GstEdit;