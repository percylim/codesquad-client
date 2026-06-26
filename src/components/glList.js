import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-tooltip/dist/react-tooltip.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './glList.css';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Axios from 'axios';
import { CSVLink } from 'react-csv';
import moment from 'moment';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import EscapeStr from './mysqlConvertChar';

const companyID = localStorage.getItem('companyID');

const todayDate = moment(new Date()).format('DD/MM/YYYY');

const headers = [
  { label: 'G/L No.', key: 'glNo' },
  { label: 'G/L Sub', key: 'glSub' },
  { label: 'G/L Type', key: 'glType' },
  { label: 'Department', key: 'department' },
  { label: 'G/L Name', key: 'glName' },
  { label: 'G/L Description', key: 'glDescription' },
];

function GlList() {
  const [data, setData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  // FORM STATES
  const [glNo, setGlNo] = useState('');
  const [glSub, setGlSub] = useState('');
  const [glName, setGlName] = useState('');
  const [glDescription, setGlDescription] = useState('');
  const [department, setDepartment] = useState('');
  const [glType, setGlType] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const [glRes, deptRes, typeRes] = await Promise.all([
        Axios.get('/api/glList', {
          params: { companyID },
        }),

        Axios.get('/api/departmentInfo', {
          params: { companyID },
        }),

        Axios.get('/api/glTypeInfo', {
          params: { companyID },
        }),
      ]);

      setData(glRes.data || []);
      setDepartmentData(deptRes.data || []);
      setTypeData(typeRes.data || []);

      if (deptRes.data?.length > 0) {
        setDepartment(deptRes.data[0].department);
      }

      if (typeRes.data?.length > 0) {
        setGlType(typeRes.data[0].glType);
      }

      setIsDisabled(glRes.data?.length > 0);
    } catch (error) {
      console.error('Load Error:', error);
      alert('Error loading data');
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    if (!glNo) {
      alert('General Ledger No. must not blank');
      return false;
    }

    if (glNo.includes(';')) {
      alert('G/L No cannot contain ;');
      return false;
    }

    if (glSub.includes(';')) {
      alert('G/L Sub cannot contain ;');
      return false;
    }

    if (glNo.length < 4) {
      alert('General Ledger No. length must at least 4');
      return false;
    }

    if (!glSub) {
      alert('General Ledger Sub No. must not blank');
      return false;
    }

    if (glSub.length < 3) {
      alert('General Ledger Sub No. length must at least 3');
      return false;
    }

    if (!glName) {
      alert('General Ledger Name must not blank');
      return false;
    }

    if (!department) {
      alert('Department not selected');
      return false;
    }

    if (!glDescription) {
      alert('General Ledger Description must not blank');
      return false;
    }

    if (!glType) {
      alert('General Ledger Type not selected');
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    try {
      if (!validate()) {
        return;
      }

      const payload = {
        companyID: EscapeStr(companyID),
        glNo: EscapeStr(glNo),
        glSub: EscapeStr(glSub),
        department,
        glType,
        glName: EscapeStr(glName),
        glDescription: EscapeStr(glDescription),
      };

      const res = await Axios.post('/api/glNew', payload);

      if (res.data) {
        alert('G/L Account Successfully Saved');

        clearForm();
        loadData();
      }
    } catch (error) {
      console.error(error);
      alert('Error saving data');
    }
  };

  const handleDelete = async (gNo, gSub) => {
    try {
      const voucherCheck = await Axios.get('/api/GlVoucherSearch', {
        params: {
          companyID,
          glNo: gNo,
          glSub: gSub,
        },
      });

      if (voucherCheck.data.length > 0) {
        alert('This G/L Account already has transactions and cannot be deleted');
        return;
      }

      if (!window.confirm('Are you sure to delete this G/L Account?')) {
        return;
      }

      await Axios.post('/api/glDelete', {
        companyID,
        glNo: gNo,
        glSub: gSub,
      });

      alert('Record deleted successfully');

      loadData();
    } catch (error) {
      console.error(error);
      alert('Delete failed');
    }
  };

  const handleEdit = (gNo, gSub) => {
    localStorage.setItem('glNo', gNo);
    localStorage.setItem('glSub', gSub);

    window.location = '/glEdit';
  };

  const onLoadGlInfo = async () => {
    try {
      if (data.length > 0) {
        alert('G/L Account already has data');
        return;
      }

      const res = await Axios.get('/api/loadGlInfo');

      if (!res.data || res.data.length === 0) {
        alert('No sample data found');
        return;
      }

      const updated = res.data.map((row) => ({
        ...row,
        companyID,
      }));

      await Axios.post('/api/glSave', updated);

      alert('Sample G/L Accounts Loaded Successfully');

      loadData();
    } catch (error) {
      console.error(error);
      alert('Error loading sample data');
    }
  };

  const clearForm = () => {
    setGlNo('');
    setGlSub('');
    setGlName('');
    setGlDescription('');
  };

  const columns = [
    {
      dataField: 'glNo',
      text: 'G/L No.',
      sort: true,
      headerStyle: { backgroundColor: 'cyan' },
      style: { backgroundColor: 'lightgrey' },
    },

    {
      dataField: 'glSub',
      text: 'G/L Sub',
      sort: true,
      headerStyle: { backgroundColor: 'yellow' },
    },

    {
      dataField: 'glType',
      text: 'G/L Type',
      sort: true,
      headerStyle: { backgroundColor: 'cyan' },
      style: { backgroundColor: 'lightgrey' },
    },

    {
      dataField: 'department',
      text: 'Department',
      sort: true,
      headerStyle: { backgroundColor: 'yellow' },
    },

    {
      dataField: 'glName',
      text: 'G/L Name',
      sort: true,
      headerStyle: { backgroundColor: 'cyan' },
      style: { backgroundColor: 'lightgrey' },
    },

    {
      dataField: 'glDescription',
      text: 'G/L Description',
      sort: true,
      headerStyle: { backgroundColor: 'yellow' },
    },

    {
      dataField: 'edit',
      text: 'Edit',
       headerStyle: { width: '120px', textAlign: 'center' },
      style: { width: '120px', textAlign: 'center' }, 
      formatter: (cell, row) => {
        return (
          <button
            className="btn btn-primary fa fa-edit"
            data-tooltip-id={`tooltip-${row.id}`}
          data-tooltip-content="Click to edit this G/L Account"
            onClick={() => handleEdit(row.glNo, row.glSub)}
          
          >
            <Tooltip id={`tooltip-${row.id}`} place="left" />
          </button>
        );
      },
    },

    {
      dataField: 'delete',
      text: 'Delete',
      headerStyle: { width: '120px', textAlign: 'center' },
      style: { width: '120px', textAlign: 'center' },
      formatter: (cell, row) => {
        return (
          <button
            className="btn btn-danger fa fa-trash"
            data-tooltip-id={`tooltip-${row.id}`}
          data-tooltip-content="Click to Delete this G/L Account"  
            onClick={() => handleDelete(row.glNo, row.glSub)}
          ></button>
        );
      },
    },
  ];

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 10,
    showTotal: true,
    alwaysShowAllBtns: true,
    firstPageText: '<<',
    prePageText: '<',
    nextPageText: '>',
    lastPageText: '>>',
  });

  const csvReport = {
    data,
    headers,
    filename: `General-Ledger-Report-${todayDate}.csv`,
  };

  return (
    <div className="container-fluid mt-3">
      <div className="row mb-3">
        <div className="col-12">
          <div className="btn btn-success w-100">
            General Ledger Listing
          </div>
        </div>
      </div>

      <div className="mb-3 d-flex gap-2">
        <button
          className="btn btn-primary"
          onClick={() => (window.location = '/glNew')}
          data-tooltip-id="addTooltip"
          data-tooltip-content="Add New G/L Account"
        >
          <i className="fa fa-plus-square me-2"            
          style={{ paddingLeft: 10}}></i>
          Add New G/L
        </button>
        <Tooltip id="addTooltip" place="top" />
        <button
          className="btn btn-warning"
          onClick={onLoadGlInfo}
          disabled={isDisabled}
        >
          <i className="fa fa-download me-2"></i>
          Load G/L Sample Accounts
        </button>

        <CSVLink {...csvReport} className="btn btn-success ms-auto">
          Export CSV
        </CSVLink>
      </div>

      {loading ? (
        <div className="alert alert-info">Loading...</div>
      ) : (
       <BootstrapTable
  bootstrap4
  keyField="glNo"
  data={data}
  columns={columns}
  pagination={paginationFactory({ sizePerPage: 10 })}
  bordered
  hover
  striped
  wrapperClasses="table-responsive gl-table-wrapper"
/>
      )}
    </div>
  );
}

export default GlList;
