import React, { useState } from 'react';
import EscapeStr from './mysqlConvertChar';
import './UserProfile.css';

const companyID = localStorage.getItem('companyID');

class GstNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: {},
            errors: {},
            data: [],
            number: 0,
            state: {},
            name: [],
            taxtype: 'INPUT',
            taxType: 'standard'
        };

        this.handleInputChange = this.handleInputChange.bind(this);
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
        this.onCancel = this.onCancel.bind(this);
    }

    handleTaxTypeChange(event) {
        this.setState({ taxType: event.target.value });
    }

    handleChangeType(event) {
        this.setState({ taxtype: event.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.validate()) {
            console.log(this.state);

            const data = {
                companyID: EscapeStr(companyID),
                taxID: EscapeStr(this.taxIDEl.current.value.toUpperCase()),
                taxType: EscapeStr(this.state.taxType || 'standard'),
                taxCode: EscapeStr(this.taxCodeEl.current.value.toUpperCase()),
                taxDescription: EscapeStr(this.taxDescriptionEl.current.value),
                taxRate: EscapeStr(this.taxRateEl.current.value),
                remark: EscapeStr(this.remarkEl.current.value),
            };

            fetch('/api/taxNew', {
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
                    window.location.reload(false);
                }
            });

            this.taxIDEl.current.value = "";
            this.taxCodeEl.current.value = '';
            this.taxDescriptionEl.current.value = "";
            this.taxRateEl.current.value = 0.00;
            this.remarkEl.current.value = "";
        }
    }

    validate() {
        let str = this.taxIDEl.current.value;
        let desc = this.taxDescriptionEl.current.value;
        let gRate = this.taxRateEl.current.value;

        if (str.length < 3) {
            alert("Tax ID must at least 3 digits of length");
            return false;
        }

        if (desc.length === 0) {
            alert("Tax Description must not empty");
            return false;
        }

        if (gRate > 999) {
            alert("Tax Rate must not more than 999.00");
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
            this.setState({ error: 'Oops! Only numeric values or digits allowed' });
        }
    }

    handleInputChange(event) {
        console.log(event.target.value);
        this.setState({
            number: event.target.value
        });
    }

    formatInput() {
        const num = this.state.number;
        this.setState({
            number: parseFloat(num).toFixed(2)
        });
    }

    onCancel() {
        this.taxIDEl.current.value = "";
        this.taxCodeEl.current.value = '';
        this.taxDescriptionEl.current.value = "";
        this.taxRateEl.current.value = 0.00;
        this.remarkEl.current.value = "";
        this.setState({ taxType: 'standard' });
    }

    render() {
        const mystyle = {
            color: "BLACK",
            backgroundColor: "#ffffff",
            paddingLeft: "100px",
            alignItems: "left",
            fontFamily: "Arial",
            marginLeft: '200px',
        };

        const buttonStyle = {
            color: "black",
            backgroundColor: "yellow",
            padding: "10px 15px 10px 10px",
            fontFamily: "Arial",
            position: 'absolute',
            right: 1050,
            border: '2px solid black',
            borderRadius: '14px',
            cursor: 'pointer'
        };

        const subStyle = {
            color: "white",
            backgroundColor: "blue",
            padding: "10px 15px 10px 10px",
            fontFamily: "Arial",
            border: '2px solid black',
            borderRadius: '14px',
            cursor: 'pointer'
        };

        // ============ SIMPLE RADIO BUTTONS - NO BORDERS ============
        const radioContainerStyle = {
            display: 'flex',
            alignItems: 'center',
            gap: '25px',
            padding: '12px 20px',
            paddingLeft: '300px',
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
            marginBottom: '0'
        };

        const colors = {
            standard: '#1976d2',   // Blue
            exempt: '#2e7d32',     // Green
            zero: '#ed6c02'        // Orange
        };

        return (
            <form style={mystyle} onSubmit={this.handleSubmit}>
                <fieldset>
                    <label style={{ paddingLeft: '100px', width: '3000px' }}>
                        <h1 style={{ width: '2000px', paddingLeft: '100px' }}>
                            Goods And Services Tax Profile Maintenance
                        </h1>
                    </label>

                    <label style={{ paddingLeft: '300px', paddingRight: '50px' }}>
                        GST ID :
                        <input 
                            className="text-uppercase" 
                            minLength={3} 
                            maxLength={10} 
                            ref={this.taxIDEl} 
                            name="taxID" 
                            required={true} 
                        />
                    </label>

                    <label style={{ paddingLeft: '300px', paddingRight: '200px' }}>
                        GST Description :
                        <input 
                            type="text" 
                            maxLength={100} 
                            ref={this.taxDescriptionEl} 
                            name="description" 
                            required={true} 
                        />
                    </label>

                    <p></p>

                    {/* ============ SIMPLE RADIO BUTTONS - NO BORDERS ============ */}
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

                    <p></p>

                    <label style={{ paddingRight: '10px', paddingLeft: '300px' }}>
                        Tax Code :
                        <input 
                            className="text-uppercase" 
                            style={{ width: '250px' }} 
                            type="text" 
                            minLength={2} 
                            maxLength={20} 
                            ref={this.taxCodeEl} 
                            name="taxcode" 
                            required={true} 
                        />
                    </label>

                    <label style={{ paddingRight: '165px', paddingLeft: '300px' }}>
                        Tax Rate (%) :
                        <input 
                            type="number" 
                            value={this.state.number} 
                            defaultValue='0.00' 
                            onChange={this.handleInputChange}
                            onBlur={this.formatInput} 
                            maxLength={5} 
                            placeholder="0.00" 
                            ref={this.taxRateEl} 
                            name="taxrate" 
                            required={false} 
                        />
                    </label>

                    <label style={{ paddingRight: '10px', paddingLeft: '300px' }}>
                        Remark :
                        <input 
                            type="text" 
                            maxLength={100} 
                            ref={this.remarkEl} 
                            name="remark" 
                            required={false} 
                        />
                    </label>
                </fieldset>
                 <p></p><p></p><p></p>
                <p>
                    <button 
                        type="submit" 
                        className="btn-submit"
                        style={{ 
                            marginRight: '8em',
                            backgroundColor: 'red',
                            color: 'white',
                            padding: '12px 15px',
                            border: '2px solid #070b11ff',
                            borderRadius: '14px',
                            cursor: 'pointer'
                        }}
                    >
                        <i className="fa fa-save" style={{ marginRight: '8px', color: 'white' }}></i>
                        Update
                    </button>
                    <button style={buttonStyle} onClick={this.onCancel}>
                        <i className="fa fa-plus" style={{ color: 'red' }}></i>
                        Clear
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

export default GstNew;