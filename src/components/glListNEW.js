import React, { useEffect, useState } from "react";
import Axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { CSVLink } from "react-csv";
import moment from "moment";
import EscapeStr from "./mysqlConvertChar";

const companyID = localStorage.getItem("companyID");
const todayDate = moment(new Date()).format("DD/MM/YYYY");

function GlList() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const headers = [
    { label: "G/L No.", key: "glNo" },
    { label: "G/L Sub", key: "glSub" },
    { label: "G/L Type", key: "glType" },
    { label: "Department", key: "department" },
    { label: "G/L Name", key: "glName" },
    { label: "G/L Description", key: "glDescription" },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await Axios.get("/api/glList", {
        params: { companyID },
      });

      const formatted = (res.data || []).map((item, index) => ({
        id: index + 1,
        ...item,
      }));

      setRows(formatted);
      setIsDisabled(formatted.length > 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (row) => {
    localStorage.setItem("glNo", row.glNo);
    localStorage.setItem("glSub", row.glSub);
    window.location = "/glEdit";
  };

  const handleDelete = async (row) => {
    if (!window.confirm("Delete this record?")) return;

    try {
      await Axios.post("/api/glDelete", {
        companyID,
        glNo: row.glNo,
        glSub: row.glSub,
      });

      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const onLoadGlInfo = async () => {
    if (rows.length > 0) {
      alert("Data already exists");
      return;
    }

    try {
      const res = await Axios.get("/api/loadGlInfo");

      const updated = (res.data || []).map((r) => ({
        ...r,
        companyID,
      }));

      await Axios.post("/api/glSave", updated);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    { field: "glNo", headerName: "G/L No", flex: 1 },
    { field: "glSub", headerName: "G/L Sub", flex: 1 },
    { field: "glType", headerName: "G/L Type", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "glName", headerName: "G/L Name", flex: 1 },
    { field: "glDescription", headerName: "Description", flex: 1 },

   {
  field: "actions",
  headerName: "Actions",
  flex: 1,
  sortable: false,
  renderCell: (params) => (
    <div style={{ display: "flex", gap: 8 }}>
      <button
        className="btn btn-sm btn-primary"
        onClick={() => handleEdit(params.row)}
      >
        Edit
      </button>

      <button
        className="btn btn-sm btn-danger"
        onClick={() => handleDelete(params.row)}
      >
        Delete
      </button>
    </div>
  ),
}
  ];

  const csvReport = {
    data: rows,
    headers,
    filename: `GL-Report-${todayDate}.csv`,
  };

  return (
    <div style={{ height: "80vh", width: "100%", padding: 20 }}>
      <h3>General Ledger Listing</h3>

      <div style={{ marginBottom: 10, display: "flex", gap: 10 }}>
        <Button variant="contained" onClick={() => (window.location = "/glNew")}>Add New G/L</Button>

        <Button
          variant="outlined"
          onClick={onLoadGlInfo}
          disabled={isDisabled}
        >
          Load Sample Accounts
        </Button>

        <CSVLink {...csvReport} style={{ marginLeft: "auto" }}>
          Export CSV
        </CSVLink>
      </div>

     <DataGrid
  rows={rows}
  columns={columns}
  loading={loading}
  pageSizeOptions={[5, 10, 20]}
  initialState={{
    pagination: { paginationModel: { pageSize: 10, page: 0 } },
  }}
  sx={{
    backgroundColor: "#f8f9fa",
    border: "1px solid #dee2e6",
    fontSize: 13,

    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "#17a2b8",
      color: "#fff",
      fontWeight: "bold",
    },

    "& .MuiDataGrid-row:hover": {
      backgroundColor: "#e9ecef",
    },

    "& .MuiDataGrid-cell": {
      borderBottom: "1px solid #dee2e6",
    },
  }}
/>
    </div>
  );
}

export default GlList;
