import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [addAmount, setAddAmount] = useState("");

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const profileResponse = await api.get("/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(profileResponse.data.user);

      const transactionResponse = await api.get("/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTransactions(transactionResponse.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddMoney = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.post(
        "/add-money",
        {
          amount: Number(addAmount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response.data);

      alert("Money Added Successfully");

      fetchData();

      setAddAmount("");
    } catch (error) {
      console.log(error);

      alert("Failed To Add Money");
    }
  };

  const handleSendMoney = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.post(
        "/send-money",
        {
          receiver_id: Number(receiverId),
          amount: Number(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response.data);

      alert("Money Sent Successfully");

      fetchData();

      setReceiverId("");
      setAmount("");
    } catch (error) {
      console.log(error);

      alert("Money Transfer Failed");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Fintech Wallet Dashboard</h2>

        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Profile Card */}
      <div className="card shadow p-3 mb-4">
        <h4>User Details</h4>

        <p>
          <strong>Name:</strong> {profile.name}
        </p>

        <p>
          <strong>Email:</strong> {profile.email}
        </p>

        <h5>Current Balance</h5>

        <h1 className="text-success fw-bold">₹{profile.balance}</h1>
      </div>

      <div className="row">
        {/* Add Money */}
        <div className="col-md-6 mb-4">
          <div className="card shadow p-3 h-100">
            <h4>Add Money</h4>

            <input
              type="number"
              className="form-control mb-3"
              placeholder="Enter Amount"
              value={addAmount}
              onChange={(e) => setAddAmount(e.target.value)}
            />

            <button className="btn btn-success" onClick={handleAddMoney}>
              Add Money
            </button>
          </div>
        </div>

        {/* Send Money */}
        <div className="col-md-6 mb-4">
          <div className="card shadow p-3 h-100">
            <h4>Send Money</h4>

            <input
              type="number"
              className="form-control mb-3"
              placeholder="Receiver ID"
              value={receiverId}
              onChange={(e) => setReceiverId(e.target.value)}
            />

            <input
              type="number"
              className="form-control mb-3"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <button className="btn btn-primary" onClick={handleSendMoney}>
              Send Money
            </button>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="card shadow p-3">
        <h4 className="mb-3">Transaction History</h4>

        {transactions.length === 0 ? (
          <p>No Transactions Found</p>
        ) : (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.sender_name}</td>
                  <td>{transaction.receiver_name}</td>
                  <td>₹{transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
