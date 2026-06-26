import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './Profile.css';
import moment from 'moment';

const companyID = localStorage.getItem('companyID');
const userName = localStorage.getItem('userName');
const ITEMS_PER_PAGE = 5; // 每页显示5条数据

function SalesOrderListing() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('PENDING');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(ITEMS_PER_PAGE);
  const [orderDetail, setOrderDetail] = useState([]);
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
          id: item.id || index + 1,
          customerID: item.customerID || '',
          salesmanID: item.salesmanID || '',
          order_no: item.order_no || item.orderNo || '',
          orderDate: item.order_date ? moment(item.order_date).format('DD/MM/YYYY') : '',
          status: item.status || '',
          orderTotal: parseFloat(item.total_amount || 0).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }),
          remark: item.remarks || '',
        }));
        setData(formattedData);
        setCurrentPage(1); // 重置到第一页
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

  // 组件挂载时加载数据
  useEffect(() => {
    onLoadSalesOrder();
  }, []);

  const handleHome = async () => {
    window.location.href = '/home';
  };

  // 查看订单详情
  const onSearchDetail = async (id) => {
    if (!id) {
      alert('Sales Order No. is empty');
      return false;
    }
 let orderID = id
    // alert(orderNo);
    try {
      const response = await Axios.get(`/api/sales_orders/order-details/${orderID}`, {
        params: {
          companyID: companyID,
          orderID: orderID,
        }
      });
     
      if (response.data && response.data.length === 0) {
        alert('No Sales Order Detail on orderID : ' + id);
      } else {
        setOrderDetail(response.data);
        console.log('Sales Order Detail:', response.data);
        //alert(`Order ${id} has ${response.data.length} items`);
      }
    } catch (error) {
      console.error("Error loading Sales Order Detail:", error);
      alert("Failed to load Sales Order data");
    }
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
            className = "fa fa-download btn btn-primary"
            style={{ marginLeft: '10px', padding: '5px 15px', marginRight: '10px' }}
          >
            {loading ? 'Loading...' : 'Load Orders'}
          </button>
  {/* Home 按钮 */}
      
        <button 
          className="fa fa-home btn btn-secondary " 
          style={{ 
            padding: '5px 15px',
            cursor: 'pointer'
          }} 
          onClick={handleHome}
        >
          Home
        </button>
         
        </label>
        <p></p><p></p>
      </div>
<p></p><p></p>
      {/* 数据表格 */}
      <table className="table table-bordered" style={{ paddingTop: '1px', border: '1px solid black' }}>
        <thead className="thead-dark">
          <tr style={{ backgroundColor: '#343a40', color: 'white' }}>
            <th style={{ width: '80px', textAlign: 'center', backgroundColor: 'yellow' }}>#</th>
            <th style={{ width: '120px', textAlign: 'center', backgroundColor: 'green', color: 'white' }}>Customer No.</th>
            <th style={{ width: '80px', textAlign: 'center', backgroundColor: 'yellow' }}>Salesman ID</th>
            <th style={{ width: '120px', textAlign: 'center' , backgroundColor: 'green', color: 'white' }}>Order No</th>
            <th style={{ width: '50px', textAlign: 'center' , backgroundColor: 'yellow' }}>Order Date</th>
            <th style={{ width: '80px', textAlign: 'center', backgroundColor: 'green', color: 'white' }}>Status</th>
            <th style={{ width: '120px', textAlign: 'center', backgroundColor: 'yellow' }}>Order Total</th>
            <th style={{ width: '300px', textAlign: 'center', backgroundColor: 'green', color: 'white' }}>Remark</th>
            <th style={{ width: '80px', textAlign: 'center', backgroundColor: 'blue', color: 'white' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((item, idx) => (
              <tr key={item.id}>
                <td style={{ textAlign: 'center' }}>{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                <td style={{ textAlign: 'left', backgroundColor: '#cccccc' }}>{item.customerID}</td>
                <td style={{ textAlign: 'left' }}>{item.salesmanID}</td>
                <td style={{ textAlign: 'left', backgroundColor: '#cccccc'}}>{item.order_no}</td>
                <td style={{ textAlign: 'center' }}>{item.orderDate}</td>
                <td style={{ textAlign: 'center', }}>
                  <span className={`badge ${item.status === 'COMPLETED' ? 'bg-success' : item.status === 'CANCELLED' ? 'bg-danger' : 'bg-warning'}`}
                    style={{ padding: '5px 10px', borderRadius: '4px', color: 'black' }}>
                    {item.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>RM {item.orderTotal}</td>
                <td style={{ textAlign: 'left', backgroundColor: '#cccccc' }}>{item.remark}</td>
                <td style={{ textAlign: 'center' }}>
                  <button 
                    className="btn btn-sm btn-info"
                    onClick={() => onSearchDetail(item.id)}
                    style={{ padding: '5px 10px', cursor: 'pointer' }}
                  >
                    View
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
              {/* 首页按钮 */}
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`} style={{ margin: '0 2px' }}>
                <button
                  className="page-link"
                  onClick={goToFirstPage}
                  disabled={currentPage === 1}
                  style={{ padding: '5px 10px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                >
                  ««
                </button>
              </li>
              
              {/* 上一页按钮 */}
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`} style={{ margin: '0 2px' }}>
                <button
                  className="page-link"
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  style={{ padding: '5px 10px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                >
                  «
                </button>
              </li>
              
              {/* 省略号（左侧） */}
              {startPage > 1 && (
                <li className="page-item disabled" style={{ margin: '0 2px' }}>
                  <span className="page-link" style={{ padding: '5px 10px' }}>...</span>
                </li>
              )}
              
              {/* 页码按钮 */}
              {pageNumbers.map(number => (
                <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`} style={{ margin: '0 2px' }}>
                  <button
                    className="page-link"
                    onClick={() => paginate(number)}
                    style={{
                      padding: '5px 12px',
                      cursor: 'pointer',
                      backgroundColor: currentPage === number ? '#007bff' : '#fff',
                      color: currentPage === number ? '#fff' : '#007bff',
                      border: '1px solid #dee2e6',
                      borderRadius: '4px'
                    }}
                  >
                    {number}
                  </button>
                </li>
              ))}
              
              {/* 省略号（右侧） */}
              {endPage < totalPages && (
                <li className="page-item disabled" style={{ margin: '0 2px' }}>
                  <span className="page-link" style={{ padding: '5px 10px' }}>...</span>
                </li>
              )}
              
              {/* 下一页按钮 */}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`} style={{ margin: '0 2px' }}>
                <button
                  className="page-link"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  style={{ padding: '5px 10px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                >
                  »
                </button>
              </li>
              
              {/* 末页按钮 */}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`} style={{ margin: '0 2px' }}>
                <button
                  className="page-link"
                  onClick={goToLastPage}
                  disabled={currentPage === totalPages}
                  style={{ padding: '5px 10px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                >
                  »»
                </button>
              </li>
            </ul>
          </nav>
          
          {/* 显示信息 */}
          <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
            Show record from {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, data.length)} line，total {data.length} lines record
          </div>
        </div>
      )}

    




    </div>
  );
}

export default SalesOrderListing;