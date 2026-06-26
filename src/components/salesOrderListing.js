import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './Profile.css';
import moment from 'moment';

const companyID = localStorage.getItem('companyID');
//const userName = localStorage.getItem('userName');
const ITEMS_PER_PAGE = 5; // 每页显示5条数据

function SalesOrderListing() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('PENDING');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(ITEMS_PER_PAGE);
  
  // 新增：订单明细相关 state
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedOrderNo, setSelectedOrderNo] = useState('');
  const [detailLoading, setDetailLoading] = useState(false);

  // 计算分页数据
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // 分页函数
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // 生成页码数组
  const getPageNumbers = () => {
    const maxButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);
    
    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }
    
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return { startPage, endPage, pageNumbers };
  };

  const { startPage, endPage, pageNumbers } = getPageNumbers();

  // 加载销售订单
  const onLoadSalesOrder = async () => {
    if (!companyID) {
      alert('Company ID not found');
      return;
    }
    
    if (!status) {
      alert('Please select an order status');
      return;
    }

    setLoading(true);
    try {
      const response = await Axios.get(`/api/sales_orders/loadSalesOrder`, {
        params: {
          companyID: companyID,
          status: status
        }
      });

      console.log("Sales Order Response:", response.data);
      
      if (response.data && response.data.length > 0) {
        const formattedData = response.data.map((item, index) => ({
          id: item.id,
          order_no: item.order_no,
          customerID: item.customerID || '',
          salesmanID: item.salesmanID || '',
          orderDate: item.order_date ? moment(item.order_date).format('DD/MM/YYYY') : '',
          status: item.status || '',
          orderTotal: parseFloat(item.total_amount || 0).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }),
          remark: item.remarks || '',
        }));
        setData(formattedData);
        setCurrentPage(1);
        // 清空详情显示
        setShowDetails(false);
        setOrderDetails(null);
        setOrderItems([]);
      } else {
        setData([]);
        alert(`No ${status} sales orders found`);
      }
      
    } catch (error) {
      console.error("API Error:", error);
      alert(`Error: ${error.response?.data?.error || 'Failed to load orders'}`);
    } finally {
      setLoading(false);
    }
  };

  // 查看订单详情
  const onSearchDetail = async (orderNo) => {
    if (!orderNo) {
      alert('Sales Order No. is empty');
      return false;
    }

    setDetailLoading(true);
    setSelectedOrderNo(orderNo);
    
    try {
      const response = await Axios.get(`/api/sales_orders/order-details/${orderNo}`, {
        params: {
          companyID: companyID,
          orderID : orderNo,
        }
      });
      
      console.log('Sales Order Detail Response:', response.data);
      
      if (response.data && response.data.success !== false) {
        setOrderDetails(response.data.order);
        setOrderItems(response.data.items || []);
        setShowDetails(true);
      } else {
        alert('No Sales Order Detail on No. ' + orderNo);
        setShowDetails(false);
        setOrderItems([]);
      }
    } catch (error) {
      console.error("Error loading Sales Order Detail:", error);
      alert("Failed to load Sales Order data");
      setShowDetails(false);
      setOrderItems([]);
    } finally {
      setDetailLoading(false);
    }
  };

  // 关闭详情
  const closeDetails = () => {
    setShowDetails(false);
    setOrderDetails(null);
    setOrderItems([]);
    setSelectedOrderNo('');
  };

  // 组件挂载时加载数据
  useEffect(() => {
    onLoadSalesOrder();
  }, []);

  const handleHome = async () => {
    window.location.href = '/home';
  };

  return (
    <div>
      <div className="row">
        <div className="col-sx-12 btn btn-success" style={{ marginTop: '1px', paddingLeft: '10px' }}>
          Sales Order Listing
        </div>
      </div>

      {/* 状态筛选 */}
      <div style={{ margin: '10px', padding: '10px', textAlign: 'center' }}>
        <label>Sales Order Status: 
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)} 
            style={{ marginLeft: '10px', padding: '5px' }}
          >
            <option value="PENDING">PENDING</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
          <button 
            onClick={onLoadSalesOrder} 
            disabled={loading}
            style={{ marginLeft: '10px', padding: '5px 15px' }}
          >
            {loading ? 'Loading...' : 'Load Orders'}
          </button>
        </label>
      </div>

      {/* 销售订单表格 */}
      <table className="table table-bordered" style={{ border: '1px solid black' }}>
        <thead className="thead-dark">
          <tr style={{ backgroundColor: '#343a40', color: 'white' }}>
            <th style={{ width: '50px', textAlign: 'center', backgroundColor: 'yellow' }}>#</th>
            <th style={{ width: '120px', textAlign: 'center',backgroundColor: '#a4a4a4' }}>Customer No.</th>
            <th style={{ width: '120px', textAlign: 'center', backgroundColor: 'yellow' }}>Salesman ID</th>
            <th style={{ width: '150px', textAlign: 'center', backgroundColor: '#a4a4a4' }}>Order No</th>
            <th style={{ width: '120px', textAlign: 'center', backgroundColor: 'yellow' }}>Order Date</th>
            <th style={{ width: '100px', textAlign: 'center', backgroundColor: '#a4a4a4' }}>Status</th>
            <th style={{ width: '120px', textAlign: 'center', backgroundColor: 'yellow' }}>Order Total</th>
            <th style={{ width: '200px', textAlign: 'center', width: '300px', backgroundColor: '#a4a4a4' }}>Remark</th>
            <th style={{ width: '80px', textAlign: 'center', backgroundColor: 'blue', color: 'white' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((item, idx) => (
              <tr key={item.id}>
                <td style={{ textAlign: 'center', backgroundColor: '#d3d3d3' }}>{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                <td style={{ textAlign: 'left' }}>{item.customerID}</td>
                <td style={{ textAlign: 'left', backgroundColor: '#d3d3d3' }}>{item.salesmanID}</td>
                <td style={{ textAlign: 'left' }}>{item.order_no}</td>
                <td style={{ textAlign: 'center', backgroundColor: '#d3d3d3' }}>{item.orderDate}</td>
                <td style={{ textAlign: 'center' }}>
                  <span className={`badge ${item.status === 'COMPLETED' ? 'bg-success' : item.status === 'CANCELLED' ? 'bg-danger' : 'bg-warning'}`}
                    style={{ padding: '5px 10px', borderRadius: '4px', color: 'white' }}>
                    {item.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right', backgroundColor: '#d3d3d3' }}>RM {item.orderTotal}</td>
                <td style={{ textAlign: 'left' }}>{item.remark}</td>
                <td style={{ textAlign: 'center' }}>
                  <button 
                    className="btn btn-sm btn-info"
                    onClick={() => onSearchDetail(item.id)}
                    disabled={detailLoading && selectedOrderNo === item.order_no}
                  ><i className="fa fa-eye"></i> 
                    {detailLoading && selectedOrderNo === item.order_no ? 'Loading...' : 'View'}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" style={{ textAlign: 'center', padding: '20px' }}>
                No sales orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 专业分页控件 */}
      {data.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <nav>
            <ul className="pagination" style={{ display: 'inline-flex', listStyle: 'none', padding: 0, gap: '5px' }}>
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`} style={{ margin: '0 2px' }}>
                <button className="page-link" onClick={goToFirstPage} disabled={currentPage === 1} style={{ padding: '5px 10px', cursor: 'pointer' }}>««</button>
              </li>
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`} style={{ margin: '0 2px' }}>
                <button className="page-link" onClick={goToPrevPage} disabled={currentPage === 1} style={{ padding: '5px 10px', cursor: 'pointer' }}>«</button>
              </li>
              {startPage > 1 && (
                <li className="page-item disabled" style={{ margin: '0 2px' }}>
                  <span className="page-link" style={{ padding: '5px 10px' }}>...</span>
                </li>
              )}
              {pageNumbers.map(number => (
                <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`} style={{ margin: '0 2px' }}>
                  <button className="page-link" onClick={() => paginate(number)} style={{ padding: '5px 12px', cursor: 'pointer' }}>{number}</button>
                </li>
              ))}
              {endPage < totalPages && (
                <li className="page-item disabled" style={{ margin: '0 2px' }}>
                  <span className="page-link" style={{ padding: '5px 10px' }}>...</span>
                </li>
              )}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`} style={{ margin: '0 2px' }}>
                <button className="page-link" onClick={goToNextPage} disabled={currentPage === totalPages} style={{ padding: '5px 10px', cursor: 'pointer' }}>»</button>
              </li>
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`} style={{ margin: '0 2px' }}>
                <button className="page-link" onClick={goToLastPage} disabled={currentPage === totalPages} style={{ padding: '5px 10px', cursor: 'pointer' }}>»»</button>
              </li>
            </ul>
          </nav>
          <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
            show {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, data.length)} records，total {data.length} records
          </div>
        </div>
      )}

      {/* 订单明细表格（点击 View 后显示） */}
      {showDetails && orderItems.length > 0 && (
        <div style={{ marginTop: '30px'}}>
          <div className="row">
            <div className="col-sx-12 btn btn-info" style={{ marginTop: '1px', paddingLeft: '10px' }}>
              Order Detail - Order No: {selectedOrderNo}
              <button 
                onClick={closeDetails}
                style={{ float: 'right', marginRight: '10px', padding: '2px 10px' }}
                className="btn btn-sm btn-danger"
              >
                Close
              </button>
            </div>
          </div>
          
          {/* 订单汇总信息 */}
          {orderDetails && (
            <div style={{ margin: '10px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
              <table style={{ width: '100%'}}>
                <tbody>
                  <tr>
                    <td style={{ width: '120px', fontWeight: 'bold' }}>Customer ID:</td>
                    <td>{orderDetails.customerID}</td>
                    <td style={{ width: '120px', fontWeight: 'bold' }}>Salesman ID:</td>
                    <td>{orderDetails.salesmanID}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 'bold' }}>Order Date:</td>
                    <td>{moment(orderDetails.order_date).format('DD/MM/YYYY')}</td>
                    <td style={{ fontWeight: 'bold' }}>Status:</td>
                    <td>{orderDetails.status}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 'bold' }}>Subtotal:</td>
                    <td>RM {parseFloat(orderDetails.subtotal || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td style={{ fontWeight: 'bold' }}>Tax Amount:</td>
                    <td>RM {parseFloat(orderDetails.tax_amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 'bold' }}>Total Amount:</td>
                    <td colSpan="3">RM {parseFloat(orderDetails.total_amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                  </tr>
                  {orderDetails.remarks && (
                    <tr>
                      <td style={{ fontWeight: 'bold' }}>Remarks:</td>
                      <td colSpan="3">{orderDetails.remarks}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          
          {/* 订单明细表格 */}
          <table className="table table-bordered" style={{ marginTop: '10px', border: '1px solid black' }}>
            <thead className="thead-dark">
              <tr style={{ backgroundColor: '#17a2b8', color: 'white' }}>
                <th style={{ width: '50px', textAlign: 'center' }}>#</th>
                <th style={{ width: '150px', textAlign: 'center', backgroundColor: '#88E788' }}>Product ID</th>
                <th style={{ textAlign: 'center' }}>Product Name</th>
                <th style={{ width: '100px', textAlign: 'center', backgroundColor: '#88E788' }}>Quantity</th>
                <th style={{ width: '120px', textAlign: 'center', backgroundColor: '#E2CDFF' }}>Price (RM)</th>
                <th style={{ width: '200px', textAlign: 'center', backgroundColor: '#9FC3E9' }}>Total (RM)</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item, idx) => (
                <tr key={item.id}>
                  <td style={{ textAlign: 'center' }}>{idx + 1}</td>
                  <td style={{ textAlign: 'left', backgroundColor: '#88E788' }}>{item.productID}</td>
                  <td style={{ textAlign: 'left' }}>{item.productName}</td>
                  <td style={{ textAlign: 'center', backgroundColor: '#88E788' }}>{item.quantity}</td>
                  <td style={{ textAlign: 'right', backgroundColor: '#E3CDFF' }}>{parseFloat(item.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                  <td style={{ textAlign: 'right', backgroundColor: '#9FC3E9' }}>{parseFloat(item.total).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                </tr>
              ))}
              <tr style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
                <td colSpan="5" style={{ textAlign: 'right' }}>Total:</td>
                <td style={{ textAlign: 'right' , backgroundColor: '#FFC0CB'}}>
                  RM {orderItems.reduce((sum, item) => sum + parseFloat(item.total), 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Home 按钮 */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button 
          className="fa fa-home btn btn-secondary" 
          style={{ width: '100px', padding: '10px' }} 
          onClick={handleHome}
        >
          Home
        </button>
      </div>
    </div>
  );
}

export default SalesOrderListing;